import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFS from 'react-native-fs';
import ImageEditor from '@react-native-community/image-editor';
import DocumentPicker from 'react-native-document-picker';

// Local files
import SelfieMask from './SelfieMask';
import ImageCropper from './ImageCropper';
import TopBar from './TopBar';
import EDevlet from './EDevlet';
import PoweredBy from './PoweredBy';
import Loading from './Loading';
import Button from './Button';
import VersionSelection from './VersionSelection';
import DocumentConfirmation from './DocumentConfirmation';
import api from '../services/api';
import backArrow from '../../assets/back-arrow.png';
import blueBackground from '../../assets/btn-blue.png';
import darkBlueBackground from '../../assets/btn-dark-blue.png';
import { backdropColor } from '../constants';
import { errorMessages } from '../constants';

const { width, height } = Dimensions.get('window');

const CaptureDocument = (props) => {
  const {
    document,
    onCapture,
    onManualCropCorners,
    onStepsFinished,
    onClearDocument,
    onSkipDocument,
    onActivity,
    setSelectedDocumentVersion,
    customer,
  } = props;

  const [cameraType] = useState(
    document.cameraFacing === 'environment'
      ? RNCamera.Constants.Type.back
      : RNCamera.Constants.Type.front,
  );

  const [previewArea, setPreviewArea] = useState({
    previewAreaX: null,
    previewAreaY: null,
    previewAreaWidth: null,
    previewAreaHeight: null,
  });

  const [trialCount, setTrialCount] = useState(1);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessStarted, setIsProcessStarted] = useState(false);
  const [showEDevlet, setShowEDevlet] = useState(false);
  const [imageCrop, setImageCrop] = useState(null);
  const [corners, setCorners] = useState(null);
  const [versionGroup, setVersionGroup] = useState('');
  const [groupIndex, setGroupIndex] = useState(0);
  const [showVersionSelection, setShowVersionSelection] = useState(true);
  const [capturedImageUrl, setCapturedImageUrl] = useState(null);
  const [autoCapturedImage, setAutoCapturedImage] = useState(null);
  const [autoCaptureError, setAutoCaptureError] = useState(null);

  const camera = useRef(null);

  const goBack = () => {
    if (checkForVersions() && !showVersionSelection) {
      setTrialCount(1);
      setCurrentStep(0);
      setAutoCapturedImage(null);
      setShowVersionSelection(true);
    } else {
      onClearDocument();
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      goBack();
      return true;
    });
    return () => BackHandler.removeEventListener('hardwareBackPress');
  }, []);

  const takePicture = async () => {
    setButtonDisabled(true);
    let image = await camera.current
      .takePictureAsync({
        quality: 0.8,
        orientation: 'portrait',
        base64: true,
        width: 1200,
        fixOrientation: true,
      })
      .then(async (data) => {
        if (document.versions[versionGroup][groupIndex].crop) {
          setImageCrop(data);
        } else {
          image = `data:image/jpeg;base64,${data.base64}`;
          if (document.versions[versionGroup][groupIndex].autoCrop) {
            image = await handleAutoCrop(data);
          }

          setCapturedImageUrl(image);
          await handleAutoCapture(image);

          // setIsProcessStarted(false);
        }
        setButtonDisabled(false);
      });
  };

  const pickAndTransformPdf = () => {
    setIsProcessStarted(true);
    DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
    })
      .then((file) => {
        RNFS.readFile(file.uri, 'base64').then((source) => {
          onCapture(`data:application/pdf;base64,${source}`);
          calculateNextStep();
          // setIsProcessStarted(false);
        });
      })
      .catch((error) => setIsProcessStarted(false));
  };

  const calculateNextStep = () => {
    setAutoCapturedImage(null);
    setTrialCount(1);
    if (currentStep < document.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setImageCrop(null);
      return;
    }
    setSelectedDocumentVersion(document.versions[versionGroup][groupIndex]);
    if (!document.options.includes('async')) {
      setIsProcessStarted(true);
    }

    onStepsFinished(true);
  };

  const handleDocumentRetake = (forced) => {
    if (forced) {
      setTrialCount(trialCount + 1);
    }
    setAutoCaptureError(null);
    setAutoCapturedImage(null);
  };

  const handleAutoCrop = async (data) => {
    const ratio = width / data.width;
    const cropData = {
      offset: {
        x: previewArea.previewAreaX * ratio,
        y: previewArea.previewAreaY,
      },
      size: {
        height:
          document.versions[versionGroup][groupIndex].aspectRatio < 1
            ? 1200
            : 1200 * document.versions[versionGroup][groupIndex].aspectRatio,
        width: 1200,
      },
    };

    const src = await ImageEditor.cropImage(data.uri, cropData).then(
      async (path) => await RNFS.readFile(path, 'base64'),
    );
    return `data:image/jpeg;base64,${src}`;
  };

  const handleAutoCapture = async (image) => {
    // If document is not for autoCapture
    if (!document.versions[versionGroup][groupIndex].autoCapture) {
      setAutoCapturedImage(image);
      return;
    }

    const requestData = new FormData();
    if (corners) {
      corners.forEach((corner) =>
        requestData.append('corners[]', JSON.stringify(corner)),
      );
    }
    requestData.append('customer_id', customer.id);
    requestData.append('type', document.id);
    requestData.append('files[]', image);

    await api
      .autoCapture(requestData)
      .then((res) => {
        if (res.data.errors.length) {
          setAutoCaptureError({
            code: res.data.errors[0].error_code,
            message: errorMessages[res.data.errors[0].error_code],
          });
        }

        if (trialCount < 2) {
          setAutoCapturedImage(res.data.image);
        } else {
          onCapture(res.data.image);
          calculateNextStep();
        }
      })
      .catch(() => {
        setAutoCaptureError({
          code: 1000,
          message: 'Teknik bir hata oldu. Lütfen tekrar dene.',
        });

        setAutoCapturedImage(image);
      });
  };

  const handleManualCrop = async (data) => {
    setIsProcessStarted(true);
    setCapturedImageUrl(data.image);
    onCapture(
      `data:image/jpeg;base64,${await RNFS.readFile(data.image, 'base64')}`,
    );
    const captureCorners = [
      [parseInt(data.topLeft.x, 10), parseInt(data.topLeft.y, 10)],
      [parseInt(data.topRight.x, 10), parseInt(data.topRight.y, 10)],
      [parseInt(data.bottomLeft.x, 10), parseInt(data.bottomLeft.y, 10)],
      [parseInt(data.bottomRight.x, 10), parseInt(data.bottomRight.y, 10)],
    ];
    setCorners(captureCorners);
    onManualCropCorners(captureCorners);
    calculateNextStep();
  };

  const checkForVersions = () => {
    // If groups are more than one
    // If there is only one group but it has more than one versions
    if (
      Object.keys(document.versions).length > 1 ||
      document.versions[Object.keys(document.versions)[0]].length > 1
    ) {
      return true;
    }
    return false;
  };

  const showPreviewArea = () => {
    if (!document.versions[versionGroup][groupIndex].aspectRatio) {
      return;
    }

    let previewRatio = 0.85;

    if (
      document.versions[versionGroup][groupIndex].aspectRatio > 1 &&
      height < 600
    ) {
      previewRatio = 0.7;
    }

    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.backDrop} />
        <View
          onLayout={(event) => {
            setPreviewArea({
              previewAreaWidth: width * previewRatio,
              previewAreaHeight:
                width *
                previewRatio *
                document.versions[versionGroup][groupIndex].aspectRatio,
              previewAreaX: event.nativeEvent.layout.x,
              previewAreaY: event.nativeEvent.layout.y + width * previewRatio,
            });
          }}
          style={[
            styles.previewMiddle,
            {
              width: width * previewRatio,
              height:
                width *
                previewRatio *
                document.versions[versionGroup][groupIndex].aspectRatio,
            },
          ]}
        />
        <View style={styles.backDrop} />
      </View>
    );
  };

  if (isProcessStarted) {
    return <Loading type={document.id} />;
  }

  if (showEDevlet) {
    return (
      <EDevlet onGoBack={() => setShowEDevlet(false)} onActivity={onActivity} />
    );
  }

  if (autoCapturedImage) {
    return (
      <DocumentConfirmation
        document={document}
        originalImage={capturedImageUrl}
        imgSrc={autoCapturedImage}
        step={currentStep}
        versionGroup={versionGroup}
        groupIndex={groupIndex}
        continueProcess={(image) => {
          onCapture(image);
          calculateNextStep();
        }}
        onTryAgain={
          autoCaptureError && autoCaptureError.code === 1008
            ? goBack
            : handleDocumentRetake
        }
        onActivity={onActivity}
        errorMessage={autoCaptureError && autoCaptureError.message}
      />
    );
  }

  if (checkForVersions() && showVersionSelection) {
    return (
      <VersionSelection
        goBack={goBack}
        menuMode={
          document.versions[Object.keys(document.versions)[0]].length > 1
            ? 'vertical'
            : 'horizontal'
        }
        document={document}
        versionGroup={setVersionGroup}
        groupIndex={setGroupIndex}
        closeVersionSelected={() => setShowVersionSelection(false)}
        onSkipDocument={onSkipDocument}
        onActivity={onActivity}
      />
    );
  }

  if (imageCrop) {
    return (
      <ImageCropper
        image={imageCrop}
        title={document.versions[versionGroup][groupIndex].captureTopBar}
        onCancel={() => {
          setImageCrop(false);
          return true; // Added for react navigation not to intervene
        }}
        onCropped={(data) => handleManualCrop(data)}
        onActivity={onActivity}
      />
    );
  }

  return (
    <View
      style={styles.container}
      onTouchStart={() => onActivity('TouchEvent')}>
      <RNCamera
        ref={camera}
        style={styles.preview}
        type={cameraType}
        captureAudio={false}
        ratio="16:9">
        {buttonDisabled ? (
          <Loading type={document.id} />
        ) : (
          <>
            <View
              style={{
                backgroundColor:
                  document.versions[versionGroup][groupIndex].aspectRatio ||
                  document.id === 'SE'
                    ? backdropColor
                    : 'transparent',
              }}>
              <TopBar
                onLeftButtonPressed={goBack}
                leftButtonIcon={backArrow}
                title={
                  document.versions[versionGroup][groupIndex].captureTopBar
                }
              />
            </View>

            <View
              style={[
                styles.topArea,
                {
                  backgroundColor:
                    document.versions[versionGroup][groupIndex].aspectRatio ||
                    document.id === 'SE'
                      ? backdropColor
                      : 'transparent',
                  maxHeight: document.id === 'SE' ? height * 0.005 : 'auto',
                },
              ]}>
              {document.steps.length > 1 && (
                <Text style={styles.topText}>
                  {document.steps[currentStep].title}
                </Text>
              )}
            </View>

            {showPreviewArea()}

            {document.id === 'SE' && (
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.selfieContainer}>
                  <SelfieMask />
                </View>
              </View>
            )}

            <View
              style={[
                styles.descriptionArea,
                {
                  backgroundColor:
                    document.versions[versionGroup][groupIndex].aspectRatio ||
                    document.id === 'SE'
                      ? backdropColor
                      : 'transparent',
                  flex: document.versions[versionGroup][groupIndex].crop
                    ? 1
                    : 0,
                },
              ]}>
              {document.steps[currentStep].description !== '' && (
                <ImageBackground
                  source={blueBackground}
                  style={styles.bottomTextBackground}>
                  <Text style={styles.bottomText}>
                    {document.steps[currentStep].description}
                  </Text>
                </ImageBackground>
              )}
            </View>

            <View
              style={[
                styles.bottomArea,
                {
                  backgroundColor:
                    document.versions[versionGroup][groupIndex].aspectRatio ||
                    document.id === 'SE'
                      ? backdropColor
                      : '#263B5B',
                  flex:
                    document.versions[versionGroup][groupIndex].aspectRatio ||
                    document.id === 'SE'
                      ? 1
                      : 0,
                },
              ]}>
              <View style={{ flex: 1 }}>
                {document.versions[versionGroup][groupIndex].edevlet && (
                  <Button
                    text="E-Devletten al"
                    onPress={() => setShowEDevlet(true)}
                    style={styles.fileUpload}
                    backgroundStyle={styles.buttonBackground}
                    backgroundImage={darkBlueBackground}
                  />
                )}
              </View>

              <TouchableOpacity
                style={[
                  styles.takePhotoButtonCircle,
                  {
                    borderColor: buttonDisabled ? '#9e9e9e' : 'white',
                  },
                ]}
                disabled={buttonDisabled}
                onPress={takePicture}>
                <View
                  style={[
                    styles.takePhotoButton,
                    {
                      backgroundColor: buttonDisabled ? '#9e9e9e' : 'white',
                    },
                  ]}
                />
              </TouchableOpacity>

              <View style={{ flex: 1 }}>
                {document.options.includes('fileUpload') && (
                  <Button
                    text="PDF Yükle"
                    onPress={pickAndTransformPdf}
                    style={styles.fileUpload}
                    backgroundStyle={styles.buttonBackground}
                    backgroundImage={darkBlueBackground}
                  />
                )}
              </View>
            </View>
            <PoweredBy />
          </>
        )}
      </RNCamera>
    </View>
  );
};

export default CaptureDocument;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selfieContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  signatureContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  manualCropContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  manualCropFooter: {
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  manualCropFooterButton: {
    width: '50%',
    padding: 20,
  },
  manualCropButtonText: {
    textAlign: 'center',
    color: 'white',
  },
  preview: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 2,
  },
  topArea: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topText: {
    color: 'white',
    fontSize: height * 0.028,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  bottomTextBackground: {
    alignSelf: 'center',
    resizeMode: 'cover',
    paddingHorizontal: '10%',
    width: width * 0.9,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bottomText: {
    color: 'white',
    fontSize: height * 0.02,
    textAlign: 'center',
  },
  descriptionArea: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bottomArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: height * 0.03,
    position: 'relative',
  },
  takePhotoButtonCircle: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 50,
    padding: 5,
    borderWidth: 3,
    borderColor: 'white',
    marginBottom: height * 0.05,
  },
  takePhotoButton: {
    borderRadius: 50,
    paddingHorizontal: height * 0.03,
    paddingVertical: height * 0.03,
  },
  buttonLoader: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginBottom: height * 0.025,
  },
  backArrowIcon: {
    width: width * 0.035,
    height: height * 0.1,
    marginTop: -(height * 0.015),
  },
  fileUpload: {
    height: 30,
    marginBottom: height * 0.05,
    marginHorizontal: width * 0.03,
  },
  buttonBackground: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  previewMiddle: {
    borderColor: 'white',
    borderWidth: 2,
  },
  backDrop: {
    backgroundColor: backdropColor,
    flex: 1,
  },
});
