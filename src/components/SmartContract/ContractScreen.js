import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Alert,
  SafeAreaView,
  StyleSheet,
  BackHandler,
  Platform,
  Dimensions,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { WebView } from 'react-native-webview';
import PickerModal from 'react-native-picker-modal-view';

// Local files
import api from '../../services/api';
import TopBar from '../TopBar';
import mainBackground from '../../../assets/main-bg.png';
import backArrow from '../../../assets/back-arrow.png';
import blueBackground from '../../../assets/btn-blue.png';
import Button from 'amani-rn-sdk/src/components/Button';
import { content } from './View/html';
import SignatureDraw from '../SignatureDraw/SignatureDraw';
import cities from '../../store/cities.json';

const { height } = Dimensions.get('window');

const ContractScreen = props => {
  const {
    onContractDecline,
    currentDocument,
    customer,
    location,
    dispatch,
  } = props;
  const [showContract, setShowContract] = useState(false);
  const [showSignatureScreen, setShowSignatureScreen] = useState(false);
  const [isContractApproved, setIsContractApproved] = useState(false);

  const [formData, setFormData] = useState({
    job: null,
    city: null,
    district: null,
    address: null,
  });

  useEffect(() => {
    getCustomerData();
    BackHandler.addEventListener('hardwareBackPressContractScreen', () => {
      onContractDecline();
      return true;
    });
    return () =>
      BackHandler.removeEventListener('hardwareBackPressContractScreen');
  }, []);

  const getCustomerData = async () => {
    try {
      const response = await api.getCustomer(customer.id);

      setFormData({
        ...formData,
        city: response.data.address.city ? response.data.address.city : null,
        district: response.data.address.province
          ? response.data.address.province
          : null,
        address: response.data.address.address
          ? response.data.address.address
          : null,
        job: response.data.occupation ? response.data.occupation : null,
      });
    } catch (error) {}
  };

  const handleFormSubmit = async () => {
    for (const key in formData) {
      if (formData[key] === null) {
        Alert.alert(
          '',
          'Devam etmeden önce formu doldurmalısınız.',
          [
            {
              text: 'Anladım',
            },
          ],
          { cancelable: false },
        );
        return;
      }
    }
    setShowContract(true);
  };

  const charsLeft = max => {
    return formData.address ? max - formData.address.length : max;
  };

  const selectCityView = (disabled, selected, showModal) => (
    <TouchableOpacity
      disabled={disabled}
      onPress={showModal}
      style={{ width: '100%' }}
    >
      <View style={styles.contactFormInput}>
        <Text style={{ color: formData.city ? 'white' : '#CAE0F5' }}>
          {formData.city || 'İl'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const selectProvinceView = (disabled, selected, showModal) => (
    <TouchableOpacity
      style={{ width: '100%' }}
      disabled={disabled}
      onPress={showModal}
    >
      <View style={styles.contactFormInput}>
        <Text
          style={{
            color: formData.district ? 'white' : '#CAE0F5',
          }}
        >
          {formData.district || 'İlçe'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  /* For changing list item style. Not working properly for now
  const listItem = (selected, item) => (
    <View style={{ backgroundColor: '#263B5B' }}>
      <View
        style={{
          marginHorizontal: 10,
          paddingVertical: 10,
          borderBottomWidth: 0.5,
          borderColor: '#ffffff',
        }}
      >
        <Text style={{ color: 'white' }}>{item.Name}</Text>
      </View>
    </View>
  );
  */

  if (showSignatureScreen) {
    return (
      <SignatureDraw
        formData={formData}
        document={currentDocument}
        dispatch={dispatch}
        location={location}
        goBack={() => setShowSignatureScreen(false)}
        goBackToMainScreen={onContractDecline}
        customer={customer}
      />
    );
  }

  if (!showContract) {
    return (
      <ImageBackground source={mainBackground} style={styles.container}>
        <TopBar
          style={{ paddingHorizontal: 20, paddingTop: 40 }}
          onLeftButtonPressed={onContractDecline}
          leftButtonIcon={backArrow}
          title={currentDocument.title}
        />
        <ScrollView style={styles.contactForm}>
          <Text style={styles.contactFormTitle}>
            Sözleşmeni hazırlayabilmemiz için lütfen gerekli alanları doldur
          </Text>
          <View>
            <View style={styles.contactFormView}>
              <TextInput
                style={styles.contactFormInput}
                onChangeText={val => setFormData({ ...formData, job: val })}
                placeholder="Meslek"
                placeholderTextColor="#CAE0F5"
                value={formData.job}
              />
            </View>
            <View style={styles.contactFormView}>
              <PickerModal
                renderSelectView={selectCityView}
                onSelected={val =>
                  setFormData({ ...formData, city: val.Name, district: null })
                }
                onBackButtonPressed={() => {}}
                items={cities}
                sortingLanguage={'tr'}
                showToTopButton={true}
                showAlphabeticalIndex={true}
                autoGenerateAlphabeticalIndex={true}
                searchPlaceholderText={'Ara...'}
                autoSort={false}
              />
            </View>
            <View style={styles.contactFormView}>
              <PickerModal
                disabled={!formData.city}
                renderSelectView={selectProvinceView}
                onSelected={val =>
                  setFormData({ ...formData, district: val.Name })
                }
                onBackButtonPressed={() => {}}
                items={
                  cities.find(city => city.Name === (formData.city || 'Adana'))
                    ? cities.find(
                        city => city.Name === (formData.city || 'Adana'),
                      ).District
                    : []
                }
                sortingLanguage={'tr'}
                showToTopButton={true}
                showAlphabeticalIndex={true}
                autoGenerateAlphabeticalIndex={true}
                searchPlaceholderText={'Ara...'}
                autoSort={false}
                style={{ backgroundColor: '#263B5B' }}
              />
            </View>
            <View style={styles.contactFormView}>
              <TextInput
                style={styles.multilineFormInput}
                onChangeText={val => setFormData({ ...formData, address: val })}
                placeholder="Açık Adres"
                placeholderTextColor="#CAE0F5"
                multiline
                maxLength={100}
                numberOfLines={Platform.OS === 'ios' ? null : 4}
                minHeight={Platform.OS === 'ios' && 3 ? 3 * 3 : null}
                value={formData.address}
              />
              <Text style={styles.charCount}>{charsLeft(100)} / 100</Text>
            </View>

            <ImageBackground
              source={blueBackground}
              style={styles.addresNoteBackground}
            >
              <Text style={styles.addressNote}>
                Adres bilgisini yüklediğin belgeden aldık. Eksik veya yanlış
                kısımlar varsa tıklayıp düzenleyebilirsin.
              </Text>
            </ImageBackground>

            <Button
              onPress={handleFormSubmit}
              text="DEVAM"
              style={{ marginHorizontal: 20 }}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBar
        style={{ paddingHorizontal: 20, paddingTop: 40 }}
        onLeftButtonPressed={() => setShowContract(false)}
        leftButtonIcon={backArrow}
        title={currentDocument.title}
      />

      <WebView style={{}} source={{ html: content }} />

      <View style={styles.bottomBar}>
        <View style={styles.approveButton}>
          <CheckBox
            value={isContractApproved}
            onValueChange={setIsContractApproved}
            tintColors={{ true: 'white', false: 'white' }}
          />
          <TouchableOpacity
            onPress={() => setIsContractApproved(!isContractApproved)}
          >
            <Text style={styles.approveButtonText}>
              Sözleşmeyi okudum, anladım ve doğruluğunu teyit ediyorum
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          onPress={() => setShowSignatureScreen(true)}
          disabled={!isContractApproved}
          text="İMZALA"
        />
      </View>
    </SafeAreaView>
  );
};

export default ContractScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263B5B',
  },
  contactForm: {
    flex: 1,
    paddingBottom: 20,
  },
  contactFormView: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  contactFormTitle: {
    fontSize: height * 0.025,
    padding: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  contactFormInput: {
    width: '100%',
    paddingHorizontal: 0,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: 'rgba(255, 255, 255, .3)',
    color: '#FFFFFF',
  },
  multilineFormInput: {
    width: '100%',
    borderBottomWidth: 2,
    textAlignVertical: 'top',
    borderColor: 'rgba(255, 255, 255, .3)',
    color: '#FFFFFF',
  },
  charCount: {
    color: '#76889B',
    fontSize: height * 0.02,
    marginTop: 3,
    alignSelf: 'flex-start',
  },
  customCheckboxOutline: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 50,
    width: height * 0.035,
    height: height * 0.035,
    marginLeft: 5,
  },
  customCheckboxInline: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressNote: {
    color: 'white',
  },
  addresNoteBackground: {
    margin: 20,
    padding: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bottomBar: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#263B5B',
  },
  approveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  approveButtonText: {
    color: 'white',
    paddingRight: 20,
  },
  bottomBarButton: {
    width: '100%',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  bottomBarButtonBackground: {
    paddingVertical: 20,
    resizeMode: 'cover',
    alignItems: 'center',
  },
});
