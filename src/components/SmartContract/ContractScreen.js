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
import checkboxEmpty from '../../../assets/checkbox_empty.png';
import checkboxChecked from '../../../assets/checkbox_checked.png';
import Button from '../Button';
import Loading from '../Loading';
import ModalPicker from '../ModalPicker';
import { content } from './View/html';
import SignatureDraw from '../SignatureDraw/SignatureDraw';
const { height } = Dimensions.get('window');

const ContractScreen = (props) => {
  const {
    onContractDecline,
    currentDocument,
    customer,
    location,
    dispatch,
    updateCustomerRules,
    onActivity,
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [showContract, setShowContract] = useState(false);
  const [showSignatureScreen, setShowSignatureScreen] = useState(false);
  const [isContractApproved, setIsContractApproved] = useState(false);
  const [otherJob, setOtherJob] = useState(null);
  const [formData, setFormData] = useState({
    job: null,
  });
  const [formErrors, setFormErrors] = useState(false);

  const jobList = [
    { name: 'Öğrenci' },
    { name: 'Kamu Çalışanı' },
    { name: 'Özel Sektör Çalışanı' },
    { name: 'Serbest Meslek' },
    { name: 'Ev Hanımı' },
    { name: 'İşsiz' },
    { name: 'Diğer' },
  ];

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPressContractScreen', () => {
      onContractDecline();
      return true;
    });
    getCustomerData();
    return () =>
      BackHandler.removeEventListener('hardwareBackPressContractScreen');
  }, []);

  const getCustomerData = async () => {
    try {
      const response = await api.getCustomer(customer.id);

      if (response.data) {
        setFormData({
          ...formData,
          job: response.data.occupation ? response.data.occupation : null,
        });
        setOtherJob(response.data.occupation);
      }

      setIsLoading(false);
    } catch (error) {}
  };

  const handleFormSubmit = async () => {
    let data = { ...formData };
    if (data.job === 'Diğer') {
      data.job = otherJob;
    }

    setFormErrors(true);
    for (const key in data) {
      if (!data[key]) {
        Alert.alert(
          '',
          'Lütfen devam etmeden önce gerekli alanları doldur.',
          [{ text: 'Anladım' }],
          { cancelable: false },
        );
        return;
      }
    }
    setFormData(data);
    setShowContract(true);
  };

  const selectJobView = (disabled, selected, showModal) => (
    <TouchableOpacity
      disabled={disabled}
      onPress={showModal}
      style={{ width: '100%' }}>
      <View style={styles.contactFormInput}>
        <Text
          style={[
            { color: formData.job ? 'white' : '#CAE0F5' },
            formErrors && !formData.job ? styles.inputError : {},
          ]}>
          {formData.job || 'Meslek'}
        </Text>
      </View>
    </TouchableOpacity>
  );

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
        onActivity={onActivity}
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
        <ScrollView
          style={styles.contactForm}
          onTouchStart={() => onActivity('TouchEvent')}>
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
                  placeholderTextColor={
                    formErrors && !otherJob ? '#FF5C65' : '#CAE0F5'
                  }
                  value={otherJob}
                />
              )}
            </View>

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
    <View
      style={styles.container}
      onTouchStart={() => onActivity('TouchEvent')}>
      <TopBar
        onLeftButtonPressed={() => setShowContract(false)}
        leftButtonIcon={backArrow}
        title={currentDocument.versions[''][0].confirmationTopBar}
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
            onPress={() => {
              onActivity('Dijital_Onay');
              setIsContractApproved(!isContractApproved);
            }}>
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
  inputError: {
    color: '#FF5C65',
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
  checkboxIOS: {
    width: height * 0.03,
    height: height * 0.03,
    marginRight: 10,
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
