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

const { width, height } = Dimensions.get('window');

const DocumentSuccess = props => {
  const { document, continueProcess } = props;

  return (
    <ImageBackground source={mainBackground} style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <View style={styles.successMessage}>
        <Image
          resizeMode="contain"
          style={styles.successIcon}
          source={successIcon}
        />
        <Text style={styles.successTitle}>Tebrikler!</Text>
        <Text style={styles.successDescription}>{document.successTitle}</Text>
        <Text style={styles.successDescription}>
          {document.successDescription}
        </Text>
      </View>

      <View style={styles.bottomBar}>
        <OrangeButton
          onPress={continueProcess}
          text="DEVAM"
          style={{ flex: 1 }}
        />
      </View>
    </ImageBackground>
  );
};

export default DocumentSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  successMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    marginVertical: 20,
  },
  successTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: height * 0.04,
  },
  successDescription: {
    color: 'white',
    marginVertical: 10,
    marginHorizontal: 30,
    fontSize: height * 0.02,
    textAlign: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: height * 0,
    height: height * 0.07,
    width: width * 0.85,
    flexDirection: 'row',
    marginBottom: 20,
  },
  bottomButtons: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
