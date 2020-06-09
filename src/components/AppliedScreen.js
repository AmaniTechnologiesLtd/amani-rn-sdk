import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Linking,
  BackHandler,
} from 'react-native';

import api from '../services/api';
import TopBar from './TopBar';
import Popup from './Popup';
import backArrow from '../../assets/back-arrow.png';
import Button from './Button';
import mainBackground from '../../assets/main-bg.png';
import blueBackground from '../../assets/btn-blue.png';
import successIcon from '../../assets/success-icon.png';

const { height } = Dimensions.get('window');

const SendEmailContent = (props) => {
  const { customer } = props;
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(false);

  const sendContractEmail = async () => {
    try {
      const response = await api.sendContractEmail(customer.id, { email });
      console.log(response);
      // if (response.data.document_url) {
      //   Linking.openURL(response.data.document_url);
      // }
    } catch (error) {}
  };

  if (message) {
    return (
      <View>
        <Text
          style={[
            styles.popupHeaderWhite,
            { textAlign: 'center', marginVertical: 20 },
          ]}>
          Sözleşmenin bir kopyası e-posta adresine gönderildi
        </Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.popupHeaderWhite}>
        Sözleşmeyi göndermek istediğin e-posta adresini gir
      </Text>
      <Text
        style={[styles.message, { textAlign: 'left', marginHorizontal: 0 }]}>
        Kayıtlı e-posta adresine sözleşmenin bir kopyasını gönderdik. Farklı bir
        e-posta adresine yollamak istersen "e-posta ile gönder" seçeneğini
        seçebilirsin.
      </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(val) => setEmail(val)}
        placeholder="E-posta adresi"
        placeholderTextColor="#CAE0F5"
        autoCompleteType="email"
        keyboardType="email-address"
        returnKeyType="send"
        onSubmitEditing={() => {
          if (email) {
            sendContractEmail();
            setMessage(true);
          }
        }}
        value={email}
      />
      <Button
        disabled={!email}
        text="GÖNDER"
        style={{ marginVertical: 10 }}
        onPress={() => {
          sendContractEmail();
          setMessage(true);
        }}
      />
    </View>
  );
};

const dateParse = (date) => {
  const expiration_date = new Date(date);
  return expiration_date.toLocaleDateString('tr-TR');
};

const AppliedScreen = (props) => {
  const { customer, goBack, takePhoto, onActivity } = props;
  const [showPopup, setShowPopup] = useState(false);
  const [customerData, setCustomerData] = useState({});

  useEffect(() => {
    getCustomerData();
    BackHandler.addEventListener('hardwareBackPressAppliedScreen', () => {
      goBack();
      return true;
    });
    return () =>
      BackHandler.removeEventListener('hardwareBackPressAppliedScreen');
  }, []);

  const getCustomerData = async () => {
    try {
      const response = await api.getCustomer(customer.id);

      setCustomerData(response.data);
    } catch (error) {}
  };

  const getContractURL = async () => {
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

  return (
    <ImageBackground source={mainBackground} style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          minHeight: '100%',
        }}
        onTouchStart={onActivity}>
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
          {customer.status === 'Temporarily Approved' ? (
            <>
              <Text style={[styles.header, { marginBottom: 0 }]}>
                Tebrikler! Başvurun Onaylandı
              </Text>
              <Text style={[styles.header, { marginTop: 0 }]}>
                Limitin artık 20.000 TL
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.header}>Tebrikler! Başvurun Alındı</Text>
              <Text style={styles.message}>
                Belgelerini kontrol edip limitini en geç 48 saat içinde
                artıracağız.
              </Text>
            </>
          )}

          <Text style={styles.message}>
            Limit artışının kalıcı olması için en geç
            <Text style={{ fontWeight: 'bold' }}>
              {customer.status === 'Temporarily Approved'
                ? ` ${dateParse(customer.approval_expiration)} tarihine kadar `
                : ` iki hafta içinde `}
            </Text>
            aşağıda yer alan ininal kullanıcı sözleşmesini yazdırıp, imzalayıp
            fotoğrafını yüklemen gerekiyor. Aksi durumda ininal plus hesabın
            ayrıcalıklarını kaybedeceksin ve limitin tekrar 750 TL'ye düşecek.
          </Text>
        </View>

        <View>
          <Button
            onPress={getContractURL}
            text="Sözleşmeyi İndir"
            style={styles.buttonStyle}
            backgroundImage={blueBackground}
          />
          <Button
            onPress={() =>
              setShowPopup(<SendEmailContent customer={customerData} />)
            }
            text="Sözleşmeni E-posta ile Gönder"
            style={styles.buttonStyle}
            backgroundImage={blueBackground}
          />
          {takePhoto && (
            <Button
              onPress={takePhoto}
              text="Sözleşmenin Fotoğrafını Çek"
              style={styles.buttonStyle}
            />
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default AppliedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
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
});
