import React, { useState, useEffect } from 'react';
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
import api from '../services/api';
import Loading from './Loading';
import TopBar from './TopBar';
import Button from 'amani-rn-sdk/src/components/Button';
import mainBackground from '../../assets/main-bg.png';
import backArrow from '../../assets/back-arrow.png';

const { width, height } = Dimensions.get('window');

const DocumentConfirmation = (props) => {
  const {
    customer,
    imageUrl,
    document,
    onTryAgain,
    continueProcess,
    corners,
    trialCount,
    step,
  } = props;
  const [errorMessage, setErrorMessage] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (!imgSrc && document.id !== 'UB') {
      // If it is selfie do not send to autocropper
      if (document.id === 'SE') {
        setImgSrc(imageUrl);
        return;
      }

      const requestData = new FormData();
      if (corners) {
        corners.forEach((corner) =>
          requestData.append('corners[]', JSON.stringify(corner)),
        );
      }
      requestData.append('customer_id', customer.id);
      requestData.append('type', document.id);
      requestData.append('files[]', imageUrl);

      api
        .cropImage(requestData)
        .then((res) => {
          setImgSrc(res.data.image);
          if (res.data.glare) {
            setErrorMessage(
              'Fotoğrafta parlama tespit edildi.\n\nLütfen belgenizin üstüne doğrudan ışık gelmemesine dikkat edin.',
            );
            return;
          }
          if (res.data.blur) {
            setErrorMessage(
              'Fotoğrafta bulanıklık tespit edildi.\n\nLütfen daha iyi aydınlatılmış bir ortamda tekrar deneyin.',
            );
            return;
          }
          if (!res.data.cropped) {
            setErrorMessage(
              'Belgeyi arka plandan ayrıştıramadık.\n\nLütfen tek renk bir yüzey üzerinde tekrar deneyin.',
            );
            return;
          }
        })
        .catch(() => {
          setErrorMessage('Bir şeyler yanlış gitti. Lütfen tekrar deneyin.');
        });
    }
  }, []);

  if (!imgSrc && document.id !== 'UB') {
    return <Loading />;
  }

  // Ask user for confirmation or show error messages
  return (
    <ImageBackground source={mainBackground} style={styles.container}>
      <TopBar
        onLeftButtonPressed={onTryAgain}
        leftButtonIcon={backArrow}
        title={document.title}
      />
      <ScrollView contentContainerStyle={styles.childContainer}>
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
          <Text style={styles.errorMessageText}>
            {errorMessage
              ? errorMessage
              : document.steps[step].confirmationDescription}
          </Text>
        </View>

        <View style={styles.bottomBar}>
          <Button
            text="Tekrar Dene"
            noBackground
            onPress={() => onTryAgain(!!errorMessage, trialCount)}
            style={[styles.bottomButtons, styles.tryAgainButton]}
          />
          {!errorMessage && (
            <Button
              onPress={() => continueProcess(imgSrc)}
              text="ONAYLA"
              style={{ marginLeft: width * 0.05, flex: 1 }}
            />
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default DocumentConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: height * 0.5,
  },
  errorMessageText: {
    color: 'white',
    fontSize: width * 0.04,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
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
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tryAgainButton: {
    borderColor: 'white',
    borderWidth: 1,
  },
});
