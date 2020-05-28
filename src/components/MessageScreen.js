import React from 'react';
import {
  View,
  Image,
  Text,
  StatusBar,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import { errorMessages } from '../constants';
import Button from './Button';
import mainBackground from '../../assets/main-bg.png';
import successIcon from '../../assets/success-icon.png';
import failedIcon from '../../assets/failed-icon.png';
import warningIcon from '../../assets/warning-icon.png';
import closeIcon from '../../assets/close-icon.png';

const { width, height } = Dimensions.get('window');

const MessageScreen = (props) => {
  const { header, title, message, type, onClick, buttonText } = props;

  const messageIcon = () => {
    if (type === 'error') {
      return failedIcon;
    } else if (type === 'warning') {
      return warningIcon;
    }
    return successIcon;
  };

  const messageDescription = () => {
    if (message) {
      if (Array.isArray(message)) {
        // Added to show only first error message
        const firstMessage = [message[0]];

        return firstMessage.map((error, index) => (
          <Text style={styles.message} key={index}>
            {errorMessages[error.error_code] || error.error_message}
          </Text>
        ));
      } else {
        return <Text style={styles.message}>{message}</Text>;
      }
    }
  };

  return (
    <ImageBackground source={mainBackground} style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View style={styles.messagePopup}>
        <TouchableOpacity style={styles.closeButton} onPress={onClick}>
          <Image style={styles.closeIcon} source={closeIcon} />
        </TouchableOpacity>
        <View style={styles.messageContainer}>
          <Image
            resizeMode="contain"
            style={styles.successIcon}
            source={messageIcon()}
          />
          {header && <Text style={styles.header}>{header}</Text>}
          {title && <Text style={styles.message}>{title}</Text>}
          {messageDescription()}
        </View>

        <View style={styles.bottomBar}>
          <Button
            onPress={onClick}
            text={buttonText}
            style={[styles.buttonStyle, { flex: 1 }]}
          />
        </View>
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
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  messagePopup: {
    marginTop: 40,
    height: height * 0.8,
    width: width * 0.9,
    alignItems: 'center',
    backgroundColor: 'rgba(38, 59, 91, 0.7)',
    borderRadius: 10,
    borderColor: 'rgba(0, 232, 255, 0.4)',
    borderWidth: 2,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeIcon: {
    resizeMode: 'contain',
    width: width * 0.08,
    height: width * 0.08,
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    marginVertical: 20,
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
    marginHorizontal: 10,
  },
});
