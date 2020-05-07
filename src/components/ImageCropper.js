import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, BackHandler } from 'react-native';

const { width, height } = Dimensions.get('window');

// Local files
import CustomCrop from './CustomCrop';
import TopBar from './TopBar';
import Button from './Button';
import PoweredBy from './PoweredBy';
import backArrow from '../../assets/back-arrow.png';

const ImageCropper = (props) => {
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
        ref={(ref) => (customCrop = ref)}
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
        <Button onPress={getCropData} text="FOTOĞRAFI KIRP" />
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
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: '#263B5B',
  },
});
