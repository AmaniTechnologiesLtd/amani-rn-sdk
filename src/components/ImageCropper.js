import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Local files
import CustomCrop from './CustomCrop';
import TopBar from './TopBar';
import PoweredBy from './PoweredBy';
import backArrow from '../../assets/back-arrow.png';
import orangeBackground from '../../assets/btn-orange.png';

const ImageCropper = props => {
  const { image, title, onCancel } = props;
  const ratioX = image.width / width;
  const ratioY = image.height / height;
  let customCrop = useRef(null);

  const rectangleCoordinates = {
    topLeft: { x: width * 0.15 * ratioX, y: height * 0.2 * ratioY },
    topRight: { x: width * 0.85 * ratioX, y: height * 0.2 * ratioY },
    bottomRight: { x: width * 0.85 * ratioX, y: height * 0.85 * ratioY },
    bottomLeft: { x: width * 0.15 * ratioX, y: height * 0.85 * ratioY },
  };

  const getCropData = () => {
    const { onCropped } = props;
    onCropped(customCrop.getCropData());
  };

  // Android back button handler
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onCancel);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onCancel);
    };
  }, [onCancel]);

  return (
    <View style={styles.container}>
      <TopBar
        onLeftButtonPressed={onCancel}
        leftButtonIcon={backArrow}
        title={title}
        style={styles.topBar}
      />

      <CustomCrop
        ref={ref => (customCrop = ref)}
        style={styles.customCrop}
        rectangleCoordinates={rectangleCoordinates}
        initialImage={image.uri}
        height={image.height}
        width={image.width}
        overlayColor="#ffffff"
        overlayStrokeColor="#ffffff"
        overlayStrokeWidth={2}
        handlerColor="#00FFD1"
      />
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={getCropData} style={styles.cropButton}>
          <ImageBackground
            source={orangeBackground}
            style={styles.cropButtonBackground}
          >
            <Text style={styles.cropButtonText}>FOTOĞRAFI KIRP</Text>
          </ImageBackground>
        </TouchableOpacity>
        <PoweredBy />
      </View>
    </View>
  );
};

export default ImageCropper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
  },
  customCrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#263B5B',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: '#263B5B',
  },
  cropButton: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cropButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: width * 0.04,
    color: 'white',
  },
  cropButtonBackground: {
    resizeMode: 'cover',
    padding: 15,
  },
});
