import React from 'react';
import {
  View,
  Image,
  Text,
  StatusBar,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import OrangeButton from './OrangeButton';
import mainBackground from '../../assets/main-bg.png';
import successIcon from '../../assets/success-icon.png';
import failedIcon from '../../assets/failed-icon.png';
import warningIcon from '../../assets/warning-icon.png';

const { width, height } = Dimensions.get('window');

const MessageScreen = props => {
  const {
    header,
    title,
    message,
    nextStepMessage,
    type,
    onClick,
    buttonText,
  } = props;
  const messageIcon = () => {
    if (type === 'error') {
      return failedIcon;
    } else if (type === 'warning') {
      return warningIcon;
    }
    return successIcon;
  };

  return (
    <ImageBackground source={mainBackground} style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <View style={styles.messageContainer}>
        <Image
          resizeMode="contain"
          style={styles.successIcon}
          source={messageIcon()}
        />
        {header && <Text style={styles.header}>{header}</Text>}
        {title && <Text style={styles.message}>{title}</Text>}
        {message && <Text style={styles.message}>{message}</Text>}
        {nextStepMessage && (
          <Text style={[styles.message, styles.nextStep]}>
            {nextStepMessage}
          </Text>
        )}
      </View>

      <View style={styles.bottomBar}>
        <OrangeButton
          onPress={onClick}
          text={buttonText}
          style={[styles.buttonStyle, { flex: 1 }]}
        />
      </View>
    </ImageBackground>
  );
};

export default MessageScreen;

MessageScreen.defaultProps = {
  title: null,
  type: 'success',
  buttonText: 'DEVAM',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    marginVertical: 20,
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: height * 0.04,
  },
  message: {
    color: 'white',
    marginVertical: 10,
    marginHorizontal: 30,
    fontSize: height * 0.02,
    textAlign: 'center',
    opacity: 0.8,
  },
  nextStep: {
    borderTopColor: '#13283D',
    borderTopWidth: 1,
    marginTop: 20,
    paddingTop: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: height * 0,
    height: height * 0.07,
    width: width * 0.85,
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonStyle: {
    flex: 1,
  },
});
