import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Alert,
  Image,
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
import TopBar from '../TopBar';
import mainBackground from '../../../assets/main-bg.png';
import backArrow from '../../../assets/back-arrow.png';
import blueBackground from '../../../assets/btn-blue.png';
import orangeBackground from '../../../assets/btn-orange.png';
import { content } from './View/html';
import SignatureDraw from '../SignatureDraw/SignatureDraw';
import cities from '../../store/cities.json';

const { width, height } = Dimensions.get('window');

const ContractScreen = props => {
  const { onContractDecline, currentDocument, customer, location } = props;
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
    BackHandler.addEventListener('hardwareBackPress', () => {
      onContractDecline();
      return true;
    });
    return () => BackHandler.removeEventListener('hardwareBackPress');
  }, []);

  const handleContractProcess = async () => {
    if (!isContractApproved) {
      Alert.alert(
        'Dikkat!',
        'Sözleşmeyi kabul etmeden imzalama ekranına geçemezsiniz',
        [
          {
            text: 'Anladım',
          },
        ],
        { cancelable: false },
      );
      return;
    }
    setShowSignatureScreen(true);
  };

  const customCheckboxView = () => {
    return (
      <TouchableOpacity
        onPress={() => setIsContractApproved(!isContractApproved)}
        style={styles.customCheckboxOutline}
      >
        {isContractApproved && (
          <View style={styles.customCheckboxInline}>
            <Image
              source={require('../../../assets/checked.png')}
              style={{ height: height * 0.03 }}
              resizeMode="contain"
            />
          </View>
        )}
      </TouchableOpacity>
    );
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
        state={props.state}
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
          onLeftButtonPressed={() => setShowContract(false)}
          leftButtonIcon={backArrow}
          title={currentDocument.title}
        />
        <View style={styles.contactForm}>
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
                    .District
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
                numberOfLines={Platform.OS === 'ios' ? null : 6}
                minHeight={Platform.OS === 'ios' && 6 ? 6 * 6 : null}
                value={formData.address}
              />
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

            <TouchableOpacity
              onPress={handleFormSubmit}
              style={styles.contactFormButton}
            >
              <ImageBackground
                source={orangeBackground}
                style={styles.contactFromButtonBackground}
              >
                <Text style={styles.contactFromButtonText}>DEVAM</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
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
          <Text style={styles.approveButtonText}>
            Sözleşmeyi okudum, anladım ve doğruluğunu teyit ediyorum
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleContractProcess}
          style={styles.bottomBarButton}
        >
          <ImageBackground
            source={orangeBackground}
            style={styles.bottomBarButtonBackground}
          >
            <Text style={styles.contactFromButtonText}>İMZALA</Text>
          </ImageBackground>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
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
  contactFormButton: {
    width: '90%',
    marginHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  contactFromButtonBackground: {
    paddingVertical: 20,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  contactFromButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: width * 0.04,
    color: 'white',
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
