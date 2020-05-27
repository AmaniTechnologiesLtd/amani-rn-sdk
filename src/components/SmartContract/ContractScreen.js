import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Alert,
  StyleSheet,
  BackHandler,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { WebView } from 'react-native-webview';

// Local files
import api from '../../services/api';
import TopBar from '../TopBar';
import mainBackground from '../../../assets/main-bg.png';
import backArrow from '../../../assets/back-arrow.png';
import blueBackground from '../../../assets/btn-blue.png';
import checkboxEmpty from '../../../assets/checkbox_empty.png';
import checkboxChecked from '../../../assets/checkbox_checked.png';
import Button from '../Button';
import Loading from '../Loading';
import ModalPicker from '../ModalPicker';
import { content } from './View/html';
import SignatureDraw from '../SignatureDraw/SignatureDraw';
import cities from '../../store/cities.json';
import { trCompare, capitalizeFirstLetters } from '../../helpers';
const { height } = Dimensions.get('window');

const ContractScreen = (props) => {
  const {
    onContractDecline,
    currentDocument,
    addressDocument,
    customer,
    location,
    dispatch,
    updateCustomerRules,
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [showContract, setShowContract] = useState(false);
  const [showSignatureScreen, setShowSignatureScreen] = useState(false);
  const [isContractApproved, setIsContractApproved] = useState(false);
  const [addressHeight, setAddressHeight] = useState(50);
  const [otherJob, setOtherJob] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({
    job: null,
    city: null,
    district: null,
    address: null,
  });

  const jobList = [
    { name: 'Öğrenci' },
    { name: 'Ev Hanımı' },
    { name: 'Memur' },
    { name: 'Serbest Çalışan' },
    { name: 'İşsiz' },
    { name: 'Diğer' },
  ];

  const sortCities = (toBeSorted) => {
    return toBeSorted.sort((a, b) => {
      const topCities = ['İstanbul', 'Ankara', 'İzmir'];

      if (topCities.includes(a.name) && topCities.includes(b.name)) {
        return topCities.indexOf(a.name) - topCities.indexOf(b.name);
      } else if (topCities.includes(a.name)) {
        return -1;
      } else if (topCities.includes(b.name)) {
        return 1;
      } else {
        return trCompare(a.name, b.name);
      }
    });
  };

  const sortProvinces = (provinces) => {
    return provinces.sort((a, b) => trCompare(a.name, b.name));
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPressContractScreen', () => {
      onContractDecline();
      return true;
    });
    return () =>
      BackHandler.removeEventListener('hardwareBackPressContractScreen');
  }, []);

  // Wait for address document to be processed on the server
  useEffect(() => {
    if (addressDocument.status !== 'PROCESSING') {
      getCustomerData();
    }
  }, [addressDocument]);

  const getCustomerData = async () => {
    try {
      const response = await api.getCustomer(customer.id);

      if (response.data.address) {
        if (
          response.data.address.address &&
          response.data.address.address.length > 0
        ) {
          setShowMessage(true);
        }

        setFormData({
          ...formData,
          city: response.data.address.city
            ? capitalizeFirstLetters(response.data.address.city)
            : null,
          district: response.data.address.province
            ? capitalizeFirstLetters(response.data.address.province)
            : null,
          address: response.data.address.address
            ? response.data.address.address
            : null,
          job: response.data.occupation ? response.data.occupation : null,
        });
      }

      setIsLoading(false);
    } catch (error) {}
  };

  const handleFormSubmit = async () => {
    let data = { ...formData };
    if (data.job === 'Diğer') {
      data.job = otherJob;
    }

    for (const key in data) {
      if (data[key] === null) {
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
    setFormData(data);
    setShowContract(true);
  };

  const charsLeft = (max) => {
    return formData.address ? max - formData.address.length : max;
  };

  const selectJobView = (disabled, selected, showModal) => (
    <TouchableOpacity
      disabled={disabled}
      onPress={showModal}
      style={{ width: '100%' }}>
      <View style={styles.contactFormInput}>
        <Text style={{ color: formData.job ? 'white' : '#CAE0F5' }}>
          {formData.job || 'Meslek'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const selectCityView = (disabled, selected, showModal) => (
    <TouchableOpacity
      disabled={disabled}
      onPress={showModal}
      style={{ width: '100%' }}>
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
      onPress={showModal}>
      <View style={styles.contactFormInput}>
        <Text
          style={{
            color: formData.district ? 'white' : '#CAE0F5',
          }}>
          {formData.district || 'İlçe'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const updateSize = (newHeight) => {
    setAddressHeight(newHeight);
  };

  if (isLoading) {
    return <Loading />;
  }

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
        updateCustomerRules={updateCustomerRules}
      />
    );
  }

  if (!showContract) {
    return (
      <ImageBackground source={mainBackground} style={styles.container}>
        <TopBar
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
              <ModalPicker
                selectView={selectJobView}
                items={jobList}
                title="Meslek Seç"
                searchable={false}
                onSelected={(val) => {
                  setFormData({
                    ...formData,
                    job: (val && val.name) || null,
                  });
                  setOtherJob(null);
                }}
              />

              {formData.job === 'Diğer' && (
                <TextInput
                  style={[
                    styles.contactFormInput,
                    { color: otherJob ? 'white' : '#CAE0F5', marginTop: 10 },
                  ]}
                  onChangeText={setOtherJob}
                  placeholder="Mesleğinizi yazın"
                  placeholderTextColor="#CAE0F5"
                />
              )}
            </View>

            <View style={styles.contactFormView}>
              <ModalPicker
                selectView={selectCityView}
                items={sortCities(cities)}
                title="İl Seç"
                onSelected={(val) =>
                  setFormData({
                    ...formData,
                    city: (val && val.name) || null,
                    district: null,
                  })
                }
              />
            </View>

            <View style={styles.contactFormView}>
              <ModalPicker
                disabled={!formData.city}
                selectView={selectProvinceView}
                title="İlçe Seç"
                items={
                  cities.find(
                    (city) => city.name === (formData.city || 'Adana'),
                  )
                    ? sortProvinces(
                        cities.find(
                          (city) => city.name === (formData.city || 'Adana'),
                        ).district,
                      )
                    : []
                }
                onSelected={(val) =>
                  setFormData({
                    ...formData,
                    district: (val && val.name) || null,
                  })
                }
              />
            </View>

            <View style={styles.contactFormView}>
              <TextInput
                style={[styles.multilineFormInput, { height: addressHeight }]}
                onChangeText={(val) =>
                  setFormData({ ...formData, address: val })
                }
                onContentSizeChange={(e) =>
                  updateSize(e.nativeEvent.contentSize.height)
                }
                placeholder="Açık Adres"
                placeholderTextColor="#CAE0F5"
                multiline
                maxLength={150}
                value={formData.address}
              />
              <Text style={styles.charCount}>{charsLeft(150)} / 150</Text>
            </View>

            {showMessage && (
              <ImageBackground
                source={blueBackground}
                style={styles.addresNoteBackground}>
                <Text style={styles.addressNote}>
                  Adres bilgisini yüklediğin belgeden aldık. Eksik veya yanlış
                  kısımlar varsa tıklayıp düzenleyebilirsin.
                </Text>
              </ImageBackground>
            )}

            <Button
              onPress={handleFormSubmit}
              text="DEVAM"
              style={{ marginHorizontal: 20, marginBottom: 10 }}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }

  return (
    <View style={styles.container}>
      <TopBar
        onLeftButtonPressed={() => setShowContract(false)}
        leftButtonIcon={backArrow}
        title={currentDocument.title}
      />

      <WebView style={{}} source={{ html: content }} />

      <View style={styles.bottomBar}>
        <View style={styles.approveButton}>
          {Platform.OS === 'ios' ? (
            // TODO: When @react-native-community/checkbox supports iOS remove checkbox PNG
            <TouchableOpacity
              onPress={() => setIsContractApproved(!isContractApproved)}>
              <Image
                style={styles.checkboxIOS}
                source={isContractApproved ? checkboxChecked : checkboxEmpty}
              />
            </TouchableOpacity>
          ) : (
            <CheckBox
              value={isContractApproved}
              onValueChange={setIsContractApproved}
              tintColors={{ true: 'white', false: 'white' }}
            />
          )}
          <TouchableOpacity
            onPress={() => setIsContractApproved(!isContractApproved)}>
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
    </View>
  );
};

export default ContractScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    minHeight: height * 0.1,
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
  checkboxIOS: {
    width: height * 0.03,
    height: height * 0.03,
    marginRight: 10,
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
