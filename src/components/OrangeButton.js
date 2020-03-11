import React from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import orangeBackground from '../../assets/btn-orange.png';

const { width, height } = Dimensions.get('window');

const OrangeButton = props => {
  const {
    onPress,
    disabled,
    style,
    backgroundStyle,
    backgroundImage,
    text,
    textStyle,
  } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, style, { opacity: disabled ? 0.7 : 1 }]}
    >
      <ImageBackground
        source={backgroundImage}
        style={[styles.buttonBackground, backgroundStyle]}
      >
        <Text style={[styles.buttonText, textStyle]}>{text}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default OrangeButton;

OrangeButton.defaultProps = {
  onPress: null,
  disabled: false,
  buttonStyle: {},
  backgroundStyle: {},
  backgroundImage: orangeBackground,
  text: 'Button',
  textStyle: {},
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  buttonBackground: {
    resizeMode: 'cover',
    padding: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: width * 0.04,
    color: 'white',
  },
});
