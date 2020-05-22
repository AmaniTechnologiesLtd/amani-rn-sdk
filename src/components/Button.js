import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import orangeBackground from '../../assets/btn-orange.png';

const { width } = Dimensions.get('window');

const Button = (props) => {
  const {
    onPress,
    disabled,
    noBackground,
    style,
    backgroundStyle,
    backgroundImage,
    text,
    textStyle,
    children,
  } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, style, { opacity: disabled ? 0.7 : 1 }]}>
      {noBackground ? (
        <View style={[styles.noBackground, backgroundStyle]}>
          {children ? (
            children
          ) : (
            <Text style={[styles.buttonText, textStyle]}>{text}</Text>
          )}
        </View>
      ) : (
        <ImageBackground
          source={backgroundImage}
          style={[styles.buttonBackground, backgroundStyle]}>
          {children ? (
            children
          ) : (
            <Text style={[styles.buttonText, textStyle]}>{text}</Text>
          )}
        </ImageBackground>
      )}
    </TouchableOpacity>
  );
};

export default Button;

Button.defaultProps = {
  onPress: null,
  disabled: false,
  noBackground: false,
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
    height: 50,
  },
  buttonBackground: {
    resizeMode: 'cover',
    padding: 20,
    alignItems: 'center',
  },
  noBackground: {
    borderWidth: 2,
    borderColor: '#D5D5D5',
    borderRadius: 10,
    opacity: 0.7,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: width * 0.04,
    color: 'white',
    minHeight: 15,
  },
});
