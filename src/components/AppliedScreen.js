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
import Button from 'amani-rn-sdk/src/components/Button';
import mainBackground from '../../assets/main-bg.png';
import blueBackground from '../../assets/btn-blue.png';
import successIcon from '../../assets/success-icon.png';

const { height } = Dimensions.get('window');

const handleSendButton = (formData) => {
  console.log(formData);
};

const SendEmailContent = () => {
  const [formData, setFormData] = useState({
    type: 'email',
    email: '',
  });
  const [message, setMessage] = useState(false);

  if (message) {
    return (
      <View>
        <Text
          style={[
            styles.popupHeaderWhite,
            { textAlign: 'center', marginVertical: 20 },
          ]}>
          Sözleşmenin bir kopyası e-posta adresinize gönderildi
        </Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.popupHeaderWhite}>
        Sözleşmeyi göndermek istediğin e-posta adresini gir
      </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(val) => setFormData({ ...formData, email: val })}
        placeholder="E-posta adresi"
        placeholderTextColor="#CAE0F5"
        autoCompleteType="email"
        keyboardType="email-address"
        returnKeyType="send"
        onSubmitEditing={() => {
          if (formData.email) {
            handleSendButton(formData);
            setMessage(true);
          }
        }}
        value={formData.email}
      />
      <Button
        disabled={!formData.email}
        text="GÖNDER"
        style={{ marginVertical: 10 }}
        onPress={() => {
          handleSendButton(formData);
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

const CargoContent = ({ customer }) => {
  return (
    <View>
      <Text style={styles.popupHeader}>Göndereceğin Adres</Text>
      <Text style={styles.popupText}>Lorem Ipsum dolor sit amet</Text>
      <View style={styles.seperator} />
      <Text style={styles.popupHeader}>Anlaşmalı Kargo Firması</Text>
      <Text style={styles.popupText}>MNG Kargo</Text>
      <View style={styles.seperator} />
      <Text style={styles.popupHeader}>Kullanman Gereken Kargo Kodu</Text>
      <Text style={styles.popupText}>XXX91237123</Text>
      <View style={styles.seperator} />
      <Text style={[styles.popupText, { marginBottom: 10 }]}>
        Unutma, limit artışını kalıcı olabilmesi için en geç 14 gün içinde
        yollamalısın.
      </Text>
      {customer.approval_expiration && (
        <Button
          text={`Son teslim tarihi: ${dateParse(customer.approval_expiration)}`}
          style={{ marginVertical: 10 }}
          backgroundImage={blueBackground}
        />
      )}
      <Button
        text="MNG KARGO ŞUBELERİ"
        style={{ marginVertical: 10 }}
        onPress={() =>
          Linking.openURL('https://www.mngkargo.com.tr/icerik/en-yakin-sube')
        }
      />
    </View>
  );
};

const AppliedScreen = (props) => {
  const { customer, goBack } = props;
  const [showPopup, setShowPopup] = useState(false);
  const [customerData, setCustomerData] = useState({});

  useEffect(() => {
    getCustomerData();
    BackHandler.addEventListener('hardwareBackPressContractScreen', () => {
      goBack();
      return true;
    });
    return () =>
      BackHandler.removeEventListener('hardwareBackPressContractScreen');
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
    return <Popup onClose={() => setShowPopup(false)}>{showPopup}</Popup>;
  }

  return (
    <ImageBackground source={mainBackground} style={styles.container}>
      <ScrollView>
        <TopBar
          onLeftButtonPressed={goBack}
          leftButtonIcon={backArrow}
          style={{ paddingHorizontal: 20 }}
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
            Limit artışının kalıcı olması için ininal kullanıcı sözleşmesini
            yazdırıp, imzalaman ve en geç
            <Text style={{ fontWeight: 'bold' }}>
              {customer.status === 'Temporarily Approved'
                ? ` ${dateParse(customer.approval_expiration)} tarihine kadar `
                : ` iki hafta içerisinde `}
            </Text>
            bize kargolaman gerekiyor. Aksi durumda limitin tekrar 750 TL'ye
            düşecek.
          </Text>

          <Text style={styles.message}>
            Kayıtlı e-posta adresine sözleşmenin bir kopyasını gönderdik. Farklı
            bir e-posta adresine yollamak istersen "e-posta ile gönder"
            seçeneğini seçebilirsin.
          </Text>
        </View>

        <View>
          <Button
            onPress={() =>
              setShowPopup(<CargoContent customer={customerData} />)
            }
            text="Anlaşmalı kargo firması için tıkla"
            style={styles.buttonStyle}
            backgroundImage={blueBackground}
          />
          <Button
            onPress={getContractURL}
            noBackground={true}
            text="Sözleşmeyi İndir"
            style={styles.buttonStyle}
            backgroundImage={blueBackground}
          />
          <Button
            onPress={() =>
              setShowPopup(<SendEmailContent customer={customerData} />)
            }
            noBackground={true}
            text="E-posta ile gönder"
            style={styles.buttonStyle}
            backgroundImage={blueBackground}
          />
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
    opacity: 0.8,
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
