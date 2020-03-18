import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import TopBar from './TopBar';
import mainBackground from '../../assets/main-bg.png';
import closeIcon from '../../assets/close-icon.png';

const { width } = Dimensions.get('window');

const Popup = props => {
  const { onClose, children } = props;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPressPopup', () => {
      onClose();
      return true;
    });
    return () => BackHandler.removeEventListener('hardwareBackPressPopup');
  }, []);

  return (
    <ImageBackground source={mainBackground} style={styles.container}>
      <TopBar />
      <View style={styles.popup}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image style={styles.closeIcon} source={closeIcon} />
        </TouchableOpacity>
        {children}
      </View>
    </ImageBackground>
  );
};

export default Popup;

Popup.defaultProps = {
  onClose: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignContent: 'center',
  },
  popup: {
    minHeight: 200,
    justifyContent: 'space-around',
    backgroundColor: 'rgba(38, 59, 91, 0.8)',
    borderWidth: 2,
    borderColor: 'rgba(0, 232, 255, 0.2)',
    borderRadius: 10,
    padding: 10,
    shadowColor: 'rgba(0, 232, 255, 0.2)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  closeButton: {
    alignItems: 'flex-end',
  },
  closeIcon: {
    resizeMode: 'contain',
    width: width * 0.08,
    height: width * 0.08,
  },
});
