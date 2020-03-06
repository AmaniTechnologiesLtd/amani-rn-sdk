import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
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
import { SelfieMask } from './SelfieMask';
import { ImageCropper } from './ImageCropper';
import { PoweredBy } from './PoweredBy';
import { Loading } from './Loading';
import { VersionSelection } from './VersionSelection';
import { DocumentConfirmation } from 'amani-rn-sdk/src/components/DocumentConfirmation';
import TextBaloon from './TextBaloon';
import { backdropColor } from '../constants';

const { width, height } = Dimensions.get('window');

const CaptureDocument = props => {
  const {
    document,
    onCapture,
    onManualCropCorners,
    onStepsFinished,
    onClearDocument,
    setSelectedDocumentVersion,
    customer,
    onDecline,
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

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessStarted, setIsProcessStarted] = useState(false);
  const [imageCrop, setImageCrop] = useState(null);
  const [corners, setCorners] = useState(null);
  const [versionGroup, setVersionGroup] = useState('');
  const [groupIndex, setGroupIndex] = useState(0);
  const [showVersionSelectionScreen, setShowVersionSelectionScreen] = useState(
    true,
  );
  const [showHelperBaloon, setShowHelperBaloon] = useState(
    document.id === 'UB' ? true : false,
  );
  const [showDocumentConfirmation, setShowDocumentConfirmation] = useState(
    false,
  );
  const [capturedImageUrl, setCapturedImageUrl] = useState(null);

  const camera = useRef(null);

  const goBack = async () => {
    onClearDocument();
  };

  if (showHelperBaloon) {
    setTimeout(() => setShowHelperBaloon(false), 3500);
  }

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
        quality: 0.7,
        orientation: 'portrait',
        base64: true,
        width: 1200,
        fixOrientation: true,
      })
      .then(async data => {
        if (document.versions[versionGroup][groupIndex].crop) {
          setImageCrop(data);
        } else {
          image = `data:image/jpeg;base64,${data.base64}`;
          if (document.versions[versionGroup][groupIndex].autoCrop) {
            image = await handleAutoCrop(data);
          }
          onCapture(image);
          setCapturedImageUrl(image);
          setShowDocumentConfirmation(true);
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
      .then(file => {
        RNFS.readFile(file.uri, 'base64').then(source => {
          onCapture(`data:application/pdf;base64,${source}`);
          calculateNextStep();
          setIsProcessStarted(false);
        });
      })
      .catch(error => setIsProcessStarted(false));
  };

  const calculateNextStep = () => {
    setShowDocumentConfirmation(false);
    if (currentStep < document.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setImageCrop(null);
      return;
    }
    setSelectedDocumentVersion(document.versions[versionGroup][groupIndex]);
    onStepsFinished(true);
  };

  const handleDocumentRetake = () => {
    onDecline();
    setShowDocumentConfirmation(false);
  };

  const handleAutoCrop = async data => {
    const ratio = width / data.width;
    const cropData = {
      offset: {
        x: previewArea.previewAreaX * ratio,
        y: previewArea.previewAreaY,
      },
      size: {
        height: 1200,
        width: 1200,
      },
    };

    const src = await ImageEditor.cropImage(data.uri, cropData).then(
      async path => await RNFS.readFile(path, 'base64'),
    );
    return `data:image/jpeg;base64,${src}`;
  };

  const handleManualCrop = async data => {
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

  const checkPreScreenConditionForVersioning = () => {
    if (Object.keys(document.versions).length > 1) {
      return true;
    }
    // If groups are more than one
    else if (document.versions[Object.keys(document.versions)[0]].length > 1) {
      return true;
    } // If there is only one group but it has more than one versions
    return false;
  };

  const showTextBaloon = message => {
    return (
      <View style={{ position: 'absolute', right: 0, top: height * 0.06 }}>
        <TextBaloon
          borderColor="black"
          backgroundColor="white"
          triangleDirection="top"
          triangleOffset="87%"
          width={width * 0.5}
          borderWidth={1}
          borderRadius={10}
          triangleSize={10}
          disabled
        >
          <Text>{message}</Text>
        </TextBaloon>
      </View>
    );
  };

  if (isProcessStarted) {
    return <Loading />;
  }

  if (showDocumentConfirmation) {
    return (
      <DocumentConfirmation
        customer={customer}
        document={document}
        corners={corners}
        imageUrl={capturedImageUrl}
        step={currentStep}
        continueProcess={calculateNextStep}
        onTryAgain={handleDocumentRetake}
      />
    );
  }

  if (checkPreScreenConditionForVersioning() && showVersionSelectionScreen) {
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
        closeVersionSelected={() => setShowVersionSelectionScreen(false)}
      />
    );
  }

  if (imageCrop) {
    return (
      <ImageCropper
        image={imageCrop}
        onCancel={() => {
          setImageCrop(false);
          return true; // Added for react navigation not to intervene
        }}
        onCropped={data => handleManualCrop(data)}
      />
    );
  }

  return (
    <View style={styles.cameraContainer}>
      <StatusBar translucent backgroundColor="transparent" />
      <RNCamera
        ref={camera}
        style={styles.preview}
        type={cameraType}
        captureAudio={false}
        ratio="16:9"
      >
        {buttonDisabled ? (
          <Loading />
        ) : (
          <>
            <View
              style={{
                backgroundColor:
                  document.id !== 'UB' ? backdropColor : 'transparent',
              }}
            >
              <SafeAreaView style={styles.topBar}>
                {showHelperBaloon &&
                  showTextBaloon('Buradan PDF dosyası yükleyebilirsiniz.')}
                <TouchableOpacity
                  style={styles.topBarLeft}
                  onPress={goBack}
                  hitSlop={{ top: 25, left: 25, bottom: 25, right: 25 }}
                >
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    resizeMode="contain"
                    source={require('../../assets/back-arrow.png')}
                  />
                </TouchableOpacity>

                <Text style={styles.topBarTitle}>
                  {document.versions[versionGroup][groupIndex].title}
                </Text>

                {document.options.includes('fileUpload') && (
                  <TouchableOpacity
                    style={styles.topBarRight}
                    onPress={() => pickAndTransformPdf()}
                    hitSlop={{ top: 25, left: 25, bottom: 25, right: 25 }}
                  >
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      resizeMode="cover"
                      source={require('../../assets/pdf-icon.png')}
                    />
                  </TouchableOpacity>
                )}
              </SafeAreaView>
            </View>

            <View
              style={[
                styles.topArea,
                {
                  backgroundColor:
                    document.id !== 'UB' ? backdropColor : 'transparent',
                },
              ]}
            >
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
                  onLayout={event => {
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
                <View style={styles.backDrop} />
                <View style={styles.selfieContainer}>
                  <SelfieMask />
                </View>
                <View style={styles.backDrop} />
              </View>
            )}
            <View
              style={{
                backgroundColor:
                  document.id !== 'UB' ? backdropColor : 'transparent',
              }}
            >
              <Text style={styles.bottomText}>
                {document.steps[currentStep].description}
              </Text>
            </View>
            <View
              style={[
                styles.bottomArea,
                {
                  backgroundColor:
                    document.id !== 'UB' ? backdropColor : 'transparent',
                },
              ]}
            >
              <TouchableOpacity
                style={styles.takePhotoButtonCircle}
                disabled={buttonDisabled}
                onPress={takePicture}
              >
                <View
                  style={[
                    styles.takePhotoButton,
                    {
                      backgroundColor: buttonDisabled ? '#9e9e9e' : 'white',
                    },
                  ]}
                />
              </TouchableOpacity>
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
  cameraContainer: {
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
  topBar: {
    flexDirection: 'row',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    justifyContent: 'center',
    paddingTop: 30,
  },
  topBarLeft: {
    position: 'absolute',
    left: 10,
    top: 30,
    width: width * 0.055,
    height: height * 0.03,
  },
  topBarRight: {
    position: 'absolute',
    right: 10,
    top: 15,
    width: width * 0.055,
    height: height * 0.03,
  },
  topBarTitle: {
    color: 'white',
    fontSize: width * 0.045,
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
  fileUploadIcon: {
    width: width * 0.07,
    height: height * 0.1,
    marginTop: -(height * 0.015),
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
