// Global Dependencies
import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native';

// Local files
import api from '../services/api';
import {Loading} from './Loading';
import mainBackground from '../../assets/main-bg.png';
import orangeBackground from '../../assets/btn-orange.png';
import backArrow from '../../assets/back-arrow.png';

const {width, height} = Dimensions.get('window');

export const DocumentConfirmationBox = props => {
  const {
    imageUrl,
    document,
    onTryAgain,
    continueProcess,
    customer,
    corners,
    step,
  } = props;
  const [errorMessage, setErrorMessage] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (!imgSrc && document.id !== 'UB') {
      const requestData = new FormData();
      if (corners) {
        corners.forEach(corner =>
          requestData.append('corners[]', JSON.stringify(corner)),
        );
      }
      requestData.append('files[]', imageUrl);

      api
        .cropImage(customer.access, requestData)
        .then(res => {
          if (res.data.status === 'ERROR') {
            if (res.data.statusText) {
              setErrorMessage(res.data.statusText);
              return;
            }
            setErrorMessage('Bir şeyler yanlış gitti');
          }
          setImgSrc(res.data.image);
        })
        .catch(err => {
          setErrorMessage('Bir şeyler yanlış gitti, tekrar deneyin');
        });
    }
  }, []);

  if (!imgSrc && document.id !== 'UB') {
    return <Loading />;
  }

  return (
    <ImageBackground source={mainBackground} style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.topBarLeft}
          onPress={onTryAgain}
          hitSlop={{top: 25, left: 25, bottom: 25, right: 25}}>
          <Image
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
            source={backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>{document.title}</Text>
      </View>
      <Text style={styles.confirmationTitle}>
        {document.steps.length > 0 && document.steps[step].confirmationTitle}
      </Text>
      <Image
        resizeMode="contain"
        style={[
          styles.confirmationImagePreview,
          {transform: [{scaleX: document.id !== 'SE' ? 1 : -1}]},
        ]}
        source={{uri: imgSrc}}
      />
      <Text
        style={{color: 'white', fontSize: width * 0.035, textAlign: 'center'}}>
        {errorMessage}
      </Text>
      <View style={styles.confirmationBottomBar}>
        <TouchableOpacity
          onPress={onTryAgain}
          style={[styles.bottomButtons, styles.tryAgainButton]}>
          <Text style={styles.bottomButtonText}>Tekrar Dene</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!!errorMessage}
          onPress={continueProcess}
          style={[
            styles.bottomButtons,
            {backgroundColor: errorMessage ? 'gray' : 'white'},
          ]}>
          <ImageBackground
            source={orangeBackground}
            style={styles.bottomButtonBackground}>
            <Text style={styles.bottomButtonText}>ONAYLA</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    position: 'relative',
    width: '100%',
  },
  topBarLeft: {
    position: 'absolute',
    left: 0,
    top: 15,
    width: width * 0.055,
    height: height * 0.03,
  },
  topBarTitle: {
    color: 'white',
    fontSize: width * 0.045,
  },
  statusInfoText: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: height * -0.055,
    marginBottom: 20,
  },
  statusButton: {
    justifyContent: 'center',
    width: width * 0.9,
    height: height * 0.06,
    borderRadius: 5,
  },
  statusButtonText: {
    color: 'white',
    textAlign: 'center',
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
  confirmationBottomBar: {
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
  bottomButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: width * 0.04,
    color: 'white',
  },
  bottomButtonBackground: {
    resizeMode: 'cover',
    padding: 20,
  },
  tryAgainButton: {
    borderColor: 'white',
    borderWidth: 1,
    marginRight: width * 0.05,
  },
});
