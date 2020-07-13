import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  // TextInput,
  Dimensions,
  StyleSheet,
  Linking,
  BackHandler,
  TouchableOpacity,
} from 'react-native';

import api from '../services/api';
import TopBar from './TopBar';
import Popup from './Popup';
import backArrow from '../../assets/back-arrow.png';
import Button from './Button';
import successIcon from '../../assets/success-icon.png';
import closeIcon from '../../assets/close-icon.png';

const { height, width } = Dimensions.get('window');

// const SendEmailContent = (props) => {
//   const { customer, onActivity } = props;
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState(false);

//   const sendContractEmail = async () => {
//     try {
//       await api.sendContractEmail(customer.id, { email });
//       // if (response.data.document_url) {
//       //   Linking.openURL(response.data.document_url);
//       // }
//     } catch (error) {}
//   };

//   if (message) {
//     return (
//       <View>
//         <Text
//           style={[
//             styles.popupHeaderWhite,
//             { textAlign: 'center', marginVertical: 20 },
//           ]}>
//           Sözleşmenin bir kopyası e-posta adresine gönderildi
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View>
//       <Text style={styles.popupHeaderWhite}>
//         Sözleşmeyi göndermek istediğin e-posta adresini gir
//       </Text>
//       <Text
//         style={[styles.message, { textAlign: 'left', marginHorizontal: 0 }]}>
//         Kayıtlı e-posta adresine sözleşmenin bir kopyasını gönderdik. Farklı bir
//         e-posta adresine yollamak istersen "e-posta ile gönder" seçeneğini
//         seçebilirsin.
//       </Text>
//       <TextInput
//         style={styles.textInput}
//         onChangeText={(val) => setEmail(val)}
//         placeholder="E-posta adresi"
//         placeholderTextColor="#CAE0F5"
//         autoCompleteType="email"
//         keyboardType="email-address"
//         returnKeyType="send"
//         onSubmitEditing={() => {
//           if (email) {
//             sendContractEmail();
//             setMessage(true);
//           }
//         }}
//         value={email}
//       />
//       <Button
//         disabled={!email}
//         text="GÖNDER"
//         style={{ marginVertical: 10 }}
//         onPress={() => {
//           onActivity('Fzk_Eposta_Gnd');
//           sendContractEmail();
//           setMessage(true);
//         }}
//       />
//     </View>
//   );
// };

const dateParse = (date) => {
  const expiration_date = new Date(date);
  return expiration_date.toLocaleDateString('tr-TR');
};

const AppliedScreen = (props) => {
  const { customer, goBack, takePhoto, onActivity } = props;
  const [showPopup, setShowPopup] = useState(false);
  // const [customerData, setCustomerData] = useState({});
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
    // getCustomerData();
    BackHandler.addEventListener('hardwareBackPressAppliedScreen', () => {
      goBack();
      return true;
    });
    return () =>
      BackHandler.removeEventListener('hardwareBackPressAppliedScreen');
  }, []);

  // const getCustomerData = async () => {
  //   try {
  //     const response = await api.getCustomer(customer.id);

  //     setCustomerData(response.data);
  //   } catch (error) {}
  // };

  const getContractURL = async () => {
    onActivity('Fzk_Ind');
    try {
      const response = await api.getContractURL(customer.id);
      if (response.data.document_url) {
        Linking.openURL(response.data.document_url);
      }
    } catch (error) {}
  };

  if (showPopup) {
    return (
      <Popup onClose={() => setShowPopup(false)} onActivity={onActivity}>
        {showPopup}
      </Popup>
    );
  }

  // This will be shown for returning customers
  // and who clicked continue on previous screen
  if (showTakePhoto) {
    return (
      <View style={[styles.container, { paddingTop: 0 }]}>
        <View style={{ flex: 1 }} onTouchStart={() => onActivity('TouchEvent')}>
          {(function () {
            if (customer.status === 'Temporarily Approved') {
              return (
                <>
                  <TouchableOpacity style={styles.closeButton} onPress={goBack}>
                    <Image style={styles.closeIcon} source={closeIcon} />
                  </TouchableOpacity>
                  <View style={styles.messageContainer}>
                    <Image
                      resizeMode="contain"
                      style={styles.successIcon}
                      source={successIcon}
                    />
                    <Text style={styles.header}>Başvurun onaylandı.</Text>
                    <Text style={styles.header}>Limitin artık 50.000 TL.</Text>
                    <Text style={styles.message}>
                      Limit artışının kalıcı olması için kullanıcı sözleşmesini
                      yazdırıp, imzalayıp
                      <Text style={{ fontWeight: 'bold' }}>
                        {` ${dateParse(
                          customer.approval_expiration,
                        )} tarihine kadar `}
                      </Text>
                      fotoğrafını yüklemen gerekiyor. Eğer imzalı sözleşmeni
                      yüklemezsen, limitin tekrar{' '}
                      <Text style={{ fontWeight: 'bold' }}>750 TL</Text>'ye
                      düşecek.
                    </Text>
                  </View>
                </>
              );
            }

            if (customer.status === 'Temporary Approval Expired') {
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
                      Limitini tekrar yükseltmek ve Plus Hesap sahibi olmak için
                      fiziksel sözleşmenin fotoğrafını en kısa sürede yüklemen
                      gerekiyor.
                    </Text>
                  </View>
                </>
              );
            }

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
                    Limit artışının kalıcı olması için aşağıda yer alan
                    kullanıcı sözleşmesini yazdırıp. İmzalayıp, fotoğrafını
                    yüklemen gerekiyor.
                  </Text>

                  <Text style={[styles.message, { textAlign: 'left' }]}>
                    En geç
                    <Text style={{ fontWeight: 'bold' }}>
                      {customer.status === 'Temporarily Approved'
                        ? ` ${dateParse(
                            customer.approval_expiration,
                          )} tarihine kadar `
                        : ` iki hafta içinde `}
                    </Text>
                    fiziksel sözleşmeni yüklemezsen, limitin tekrar{' '}
                    <Text style={{ fontWeight: 'bold' }}>750 TL</Text>'ye
                    düşecek.
                  </Text>
                </View>
              </>
            );
          })()}

          <View style={{ marginBottom: 10 }}>
            <Button
              onPress={getContractURL}
              text="Sözleşmeyi İndir"
              style={styles.buttonStyle}
              noBackground
            />
            {/* <Button
              onPress={() => {
                onActivity('Fzk_Eposta');
                setShowPopup(
                  <SendEmailContent
                    customer={customerData}
                    onActivity={onActivity}
                  />,
                );
              }}
              text="Sözleşmeni E-posta ile Gönder"
              style={styles.buttonStyle}
              noBackground
            /> */}
            {takePhoto && (
              <Button
                onPress={() => {
                  onActivity('Fzk_FotoCek');
                  takePhoto();
                }}
                text="Sözleşmenin Fotoğrafını Çek"
                style={styles.buttonStyle}
              />
            )}
          </View>
        </View>
      </View>
    );
  }

  // This will be shown as a success screen with a continue button
  // in normal flow
  return (
    <View style={styles.container}>
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
            Yüklediğin tüm belgeleri kontrol edip limitini en geç 48 saat içinde
            artıracağız.
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
    </View>
  );
};

export default AppliedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#263B5B',
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
