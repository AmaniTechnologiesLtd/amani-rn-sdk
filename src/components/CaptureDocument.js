import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
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
import backArrow from '../../assets/back-arrow.png';
import darkBlueBackground from '../../assets/btn-dark-blue.png';
import { backdropColor } from '../constants';

const { width, height } = Dimensions.get('window');

const CaptureDocument = (props) => {
  const {
    document,
    onCapture,
    onManualCropCorners,
    onStepsFinished,
    onClearDocument,
    onSkipDocument,
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
  const [showDocumentConfirmation, setShowDocumentConfirmation] = useState(
    false,
  );
  const [capturedImageUrl, setCapturedImageUrl] = useState(null);

  const camera = useRef(null);

  const goBack = () => {
    if (checkForVersions() && !showVersionSelection) {
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

          if (trialCount < 3) {
            setShowDocumentConfirmation(true);
          } else {
            onCapture(image);
            calculateNextStep();
          }
          setIsProcessStarted(false);
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
          setIsProcessStarted(false);
        });
      })
      .catch((error) => setIsProcessStarted(false));
  };

  const calculateNextStep = () => {
    setShowDocumentConfirmation(false);
    setTrialCount(1);
    if (currentStep < document.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setImageCrop(null);
      return;
    }
    setSelectedDocumentVersion(document.versions[versionGroup][groupIndex]);
    onStepsFinished(true);
  };

  const handleDocumentRetake = (forced) => {
    if (forced) {
      setTrialCount(trialCount + 1);
    }
    setShowDocumentConfirmation(false);
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
    setIsProcessStarted(false);
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

  if (isProcessStarted) {
    return <Loading />;
  }

  if (showEDevlet) {
    return <EDevlet onGoBack={() => setShowEDevlet(false)} />;
  }

  if (showDocumentConfirmation) {
    return (
      <DocumentConfirmation
        customer={customer}
        document={document}
        corners={corners}
        imageUrl={capturedImageUrl}
        step={currentStep}
        continueProcess={(image) => {
          onCapture(image);
          calculateNextStep();
        }}
        onTryAgain={handleDocumentRetake}
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
      />
    );
  }

  if (imageCrop) {
    return (
      <ImageCropper
        image={imageCrop}
        title={document.versions[versionGroup][groupIndex].title}
        onCancel={() => {
          setImageCrop(false);
          return true; // Added for react navigation not to intervene
        }}
        onCropped={(data) => handleManualCrop(data)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <RNCamera
        ref={camera}
        style={styles.preview}
        type={cameraType}
        captureAudio={false}
        ratio="16:9">
        {buttonDisabled ? (
          <Loading />
        ) : (
          <>
            <SafeAreaView
              style={{
                paddingTop: 30,
                backgroundColor:
                  document.versions[versionGroup][groupIndex].aspectRatio ||
                  document.id === 'SE'
                    ? backdropColor
                    : '#263B5B',
              }}>
              <TopBar
                style={{ paddingHorizontal: 20 }}
                onLeftButtonPressed={goBack}
                leftButtonIcon={backArrow}
                title={document.versions[versionGroup][groupIndex].title}
              />
            </SafeAreaView>

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

            {document.versions[versionGroup][groupIndex].aspectRatio && (
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.backDrop} />
                <View
                  onLayout={(event) => {
                    setPreviewArea({
                      previewAreaWidth: width * 0.85,
                      previewAreaHeight:
                        width *
                        0.85 *
                        document.versions[versionGroup][groupIndex].aspectRatio,
                      previewAreaX: event.nativeEvent.layout.x,
                      previewAreaY: event.nativeEvent.layout.y + width * 0.85,
                    });
                  }}
                  style={[
                    styles.previewMiddle,
                    {
                      width: width * 0.85,
                      height:
                        width *
                        0.85 *
                        document.versions[versionGroup][groupIndex].aspectRatio,
                    },
                  ]}
                />
                <View style={styles.backDrop} />
              </View>
            )}

            {document.id === 'SE' && (
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.selfieContainer}>
                  <SelfieMask />
                </View>
              </View>
            )}

            <View
              style={{
                backgroundColor:
                  document.versions[versionGroup][groupIndex].aspectRatio ||
                  document.id === 'SE'
                    ? backdropColor
                    : 'transparent',
              }}>
              <Text style={styles.bottomText}>
                {document.steps[currentStep].description}
              </Text>
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
              {document.versions[versionGroup][groupIndex].edevlet && (
                <Button
                  text="E-Devletten al"
                  onPress={() => setShowEDevlet(true)}
                  style={styles.eDevlet}
                  backgroundStyle={{
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                  }}
                  backgroundImage={darkBlueBackground}
                />
              )}

              <TouchableOpacity
                style={styles.takePhotoButtonCircle}
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

              {document.options.includes('fileUpload') && (
                <Button
                  text="PDF Yükle"
                  onPress={pickAndTransformPdf}
                  style={styles.fileUpload}
                  backgroundStyle={{
                    paddingVertical: 5,
                    paddingHorizontal: 25,
                  }}
                  backgroundImage={darkBlueBackground}
                />
              )}
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  topText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  bottomArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    position: 'relative',
  },
  bottomText: {
    color: 'white',
    fontSize: height * 0.02,
    paddingHorizontal: '10%',
    textAlign: 'center',
    marginVertical: 10,
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
    paddingHorizontal: width * 0.06,
    paddingVertical: width * 0.06,
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
    position: 'absolute',
    bottom: width * 0.13,
    right: 10,
    borderRadius: 20,
  },
  eDevlet: {
    position: 'absolute',
    bottom: width * 0.13,
    borderRadius: 20,
    left: 10,
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
