import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native';

// Local files

import TopBar from './TopBar';
import Button from './Button';
import blueBackground from '../../assets/btn-blue.png';
import backArrow from '../../assets/back-arrow.png';

const { width, height } = Dimensions.get('window');

const DocumentConfirmation = (props) => {
  const {
    imgSrc,
    originalImage,
    document,
    onTryAgain,
    continueProcess,
    step,
    versionGroup,
    groupIndex,
    errorMessage,
    onActivity,
  } = props;

  // Ask user for confirmation or show error messages
  return (
    <View style={styles.container}>
      <TopBar
        onLeftButtonPressed={() => onTryAgain(false)}
        leftButtonIcon={backArrow}
        title={document.versions[versionGroup][groupIndex].confirmationTopBar}
      />
      <ScrollView
        contentContainerStyle={styles.childContainer}
        onTouchStart={() => onActivity('TouchEvent')}>
        <Text style={styles.confirmationTitle}>
          {document.steps.length > 0 && document.steps[step].confirmationTitle}
        </Text>
        <Image
          resizeMode="contain"
          style={[
            styles.confirmationImagePreview,
            { transform: [{ scaleX: document.id !== 'SE' ? 1 : -1 }] },
          ]}
          source={{ uri: imgSrc }}
        />

        <View style={{ flex: 1 }}>
          <ImageBackground
            source={blueBackground}
            style={styles.bottomTextBackground}>
            <Text style={styles.errorMessageText}>
              {errorMessage
                ? errorMessage
                : document.steps[step].confirmationDescription}
            </Text>
          </ImageBackground>
        </View>

        <View style={styles.bottomBar}>
          <Button
            text="Tekrar Dene"
            noBackground={!errorMessage}
            onPress={() => onTryAgain(!!errorMessage)}
            style={styles.bottomButtons}
          />
          {!errorMessage && (
            <Button
              onPress={
                () =>
                  continueProcess(document.id === 'SE' ? originalImage : imgSrc) // Send full image for selfie for other documents send cropped
              }
              text="ONAYLA"
              style={{ marginLeft: width * 0.05, flex: 1 }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DocumentConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263B5B',
  },
  childContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  confirmationTitle: {
    color: 'white',
    fontSize: width * 0.06,
    textAlign: 'center',
    paddingVertical: 20,
  },
  confirmationImagePreview: {
    width: width * 0.9,
    height: height < 600 ? height * 0.4 : height * 0.5,
  },
  bottomTextBackground: {
    resizeMode: 'cover',
    padding: 10,
    width: width * 0.9,
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  errorMessageText: {
    color: 'white',
    fontSize: width * 0.04,
    textAlign: 'center',
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
  bottomBar: {
    height: height * 0.07,
    width: width * 0.85,
    flexDirection: 'row',
    marginBottom: 20,
  },
  bottomButtons: {
    flex: 1,
  },
});
