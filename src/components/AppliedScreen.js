import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Linking,
  BackHandler,
  TouchableOpacity,
  Share,
  Platform,
} from 'react-native';

import api from '../services/api';
import TopBar from './TopBar';
import backArrow from '../../assets/back-arrow.png';
import Button from './Button';
import mainBackground from '../../assets/main-bg.png';
import successIcon from '../../assets/success-icon.png';
import closeIcon from '../../assets/close-icon.png';
import shareIcon from '../../assets/share-icon.png';
import contractImage from '../../assets/ininal_contract.jpg';

const { height, width } = Dimensions.get('window');

const dateParse = (date) => {
  const expiration_date = new Date(date);
  return expiration_date.toLocaleDateString('tr-TR');
};

const AppliedScreen = (props) => {
  const { customer, goBack, takePhoto, onActivity } = props;
  const [urlButtonLoading, setUrlButtonLoading] = useState(false);
  const [contractUrl, setContractUrl] = useState(null);
  const [showMessage, setShowMessage] = useState(true);
  const [showTakePhoto, setShowTakePhoto] = useState(
    [
      'Temporarily Approved',
      'Temporary Approval Expired',
      'Pending Review',
      'Pending Approval',
    ].includes(customer.status)
      ? true
      : false,
  );

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPressAppliedScreen', () => {
      goBack();
      return true;
    });
    return () =>
      BackHandler.removeEventListener('hardwareBackPressAppliedScreen');
  }, []);

  const getContractURL = async () => {
    onActivity('Fzk_Ind');
    if (contractUrl) {
      return contractUrl;
    }
    try {
      setUrlButtonLoading(true);
      const response = await api.getContractURL(2, customer.id);

      if (response.data.document_url) {
        setContractUrl(response.data.document_url);
        setUrlButtonLoading(false);
        return response.data.document_url;
      }
    } catch (error) {
      setUrlButtonLoading(false);
    }
  };

  const shareOpen = async () => {
    const url = await getContractURL();
    let message = 'İninal Limit Artırım Kullanıcı Sözleşmesi';

    if (Platform.OS === 'android') {
      message += `\n\n ${url}`;
    }

    try {
      await Share.share({ message, url }, { subject: message });
    } catch (error) {}
  };

  // This will be shown for returning customers
  // and who clicked continue on previous screen
  if (showTakePhoto) {
    return (
      <ImageBackground
        source={mainBackground}
        style={[styles.container, { paddingTop: 0 }]}>
        <View style={{ flex: 1 }} onTouchStart={() => onActivity('TouchEvent')}>
          {(function () {
            if (customer.status === 'Temporarily Approved' && showMessage) {
              return (
                <>
                  <SafeAreaView>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={goBack}>
                      <Image style={styles.closeIcon} source={closeIcon} />
                    </TouchableOpacity>
                  </SafeAreaView>
                  <View style={styles.messageContainer}>
                    <Image
                      resizeMode="contain"
                      style={styles.successIcon}
                      source={successIcon}
                    />
                    <Text style={styles.header}>Başvurun onaylandı.</Text>
                    <Text style={styles.header}>Limitin artık 50.000 TL.</Text>
                    <Text style={styles.message}>
                      ininal kullanıcı sözleşmesinin fotoğrafını en geç
                      <Text style={{ fontWeight: 'bold' }}>
                        {` ${dateParse(
                          customer.approval_expiration,
                        )} tarihine kadar `}
                      </Text>
                      yüklemen gerekiyor. Eğer imzalı sözleşmen bize ulaşmazsa,
                      limitin tekrar{' '}
                      <Text style={{ fontWeight: 'bold' }}>750 TL</Text>'ye
                      düşecek.
                    </Text>
                  </View>
                  <View style={{ marginBottom: 10 }}>
                    <Button
                      onPress={() => {
                        setShowMessage(false);
                      }}
                      text="DEVAM ET"
                      style={styles.buttonStyle}
                    />
                  </View>
                </>
              );
            }

            if (
              customer.status === 'Temporary Approval Expired' &&
              showMessage
            ) {
              return (
                <>
                  <TopBar
                    onLeftButtonPressed={goBack}
                    leftButtonIcon={backArrow}
                    style={{ paddingHorizontal: 20 }}
                    title="Fiziksel Sözleşmeni Yükle"
                  />
                  <View
                    style={[
                      styles.messageContainer,
                      { justifyContent: 'flex-start', alignItems: 'baseline' },
                    ]}>
                    <Text
                      style={[
                        styles.message,
                        { textAlign: 'left', marginTop: 20 },
                      ]}>
                      Limitini tekrar yükseltmek ve ininal Plus Hesap sahibi
                      olmak için fiziksel sözleşmenin fotoğrafını en kısa sürede
                      yüklemen gerekiyor.
                    </Text>
                  </View>
                  <View style={{ marginBottom: 10 }}>
                    <Button
                      onPress={() => {
                        setShowMessage(false);
                      }}
                      text="DEVAM ET"
                      style={styles.buttonStyle}
                    />
                  </View>
                </>
              );
            }

            return (
              <>
                <TopBar
                  onLeftButtonPressed={goBack}
                  leftButtonIcon={backArrow}
                  onRightButtonPressed={shareOpen}
                  rightButtonIcon={shareIcon}
                  style={{ paddingHorizontal: 20 }}
                  title="Fiziksel Sözleşmeni Yükle"
                />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                  <View
                    style={[
                      {
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: 10,
                        flex: 1,
                      },
                    ]}>
                    <Image
                      resizeMode="contain"
                      style={styles.successIcon}
                      source={contractImage}
                    />
                    <View style={{ alignItems: 'baseline' }}>
                      <Text
                        style={[
                          styles.message,
                          { textAlign: 'left', marginTop: 10 },
                        ]}>
                        Limit artışının kalıcı olması için aşağıdaki adımları
                        tamamla
                      </Text>

                      <Text
                        style={[
                          styles.message,
                          { textAlign: 'left', marginTop: 20 },
                        ]}>
                        <Text style={{ fontWeight: 'bold' }}>1) </Text>
                        Yukarıda yer alan ininal sözleşmesini indir ve yazıcıda
                        yazdır
                      </Text>

                      <Text
                        style={[
                          styles.message,
                          { textAlign: 'left', marginTop: 10 },
                        ]}>
                        <Text style={{ fontWeight: 'bold' }}>2) </Text>
                        Sözleşmede bulunan 6 adet alanı imzala
                      </Text>

                      <Text
                        style={[
                          styles.message,
                          { textAlign: 'left', marginTop: 10 },
                        ]}>
                        <Text style={{ fontWeight: 'bold' }}>3) </Text>
                        İmzalı sözleşmenin fotoğrafını çek yükle
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginBottom: 10 }}>
                    {takePhoto && (
                      <Button
                        onPress={() => {
                          onActivity('Fzk_FotoCek');
                          takePhoto();
                        }}
                        noBackground
                        text="İMZALI SÖZLEŞMENİ YÜKLE"
                        style={styles.buttonStyle}
                      />
                    )}
                    <Button
                      onPress={async () => {
                        const url = await getContractURL();
                        console.log(url);
                        Linking.openURL(url);
                      }}
                      text="SÖZLEŞMENİ İNDİR"
                      style={styles.buttonStyle}
                      disabled={urlButtonLoading}
                    />
                  </View>
                </ScrollView>
              </>
            );
          })()}
        </View>
      </ImageBackground>
    );
  }

  // This will be shown as a success screen with a continue button
  // in normal flow
  return (
    <ImageBackground source={mainBackground} style={styles.container}>
      <View style={{ flex: 1 }} onTouchStart={() => onActivity('TouchEvent')}>
        <TopBar
          onLeftButtonPressed={goBack}
          leftButtonIcon={backArrow}
          style={{ paddingHorizontal: 20 }}
          noBackground
        />

        <View style={styles.messageContainer}>
          <Image
            resizeMode="contain"
            style={styles.successIcon}
            source={successIcon}
          />
          <Text style={styles.header}>Tebrikler!</Text>
          <Text style={styles.message}>
            Tüm dijital adımları başarıyla tamamladın.
          </Text>
          <Text style={styles.message}>
            Yüklediğin tüm belgeleri kontrol edip limitini en geç 2 iş günü
            içinde artıracağız.
          </Text>
          <Text style={styles.message}>Fiziksel sözleşme ile devam et.</Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Button
            onPress={() => setShowTakePhoto(true)}
            text="DEVAM ET"
            style={styles.buttonStyle}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default AppliedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successIcon: {
    marginVertical: 10,
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: height * 0.035,
  },
  message: {
    color: 'white',
    marginVertical: 10,
    marginHorizontal: 10,
    fontSize: height * 0.022,
    textAlign: 'center',
    opacity: 0.9,
  },
  buttonStyle: {
    marginBottom: 10,
    marginHorizontal: 20,
  },
  popupHeader: {
    color: '#CAE0F5',
    fontWeight: 'bold',
    fontSize: height * 0.025,
    letterSpacing: 0.666667,
    marginBottom: 5,
  },
  popupText: {
    color: 'white',
    letterSpacing: 0.583333,
  },
  seperator: {
    borderTopWidth: 1,
    borderColor: '#13283D',
    marginVertical: 15,
    opacity: 0.8,
  },
  popupHeaderWhite: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: height * 0.03,
  },
  textInput: {
    paddingVertical: 10,
    marginVertical: 10,
    borderBottomWidth: 2,
    borderColor: 'rgba(255, 255, 255, .3)',
    color: '#FFFFFF',
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
});
