import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  BackHandler,
  Platform,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

// Local files
import SignatureScreen from './index';
import {Loading} from '../Loading';
import api from '../../services/api';

export const SignatureDraw = props => {
  const {
    document,
    goBackToMainScreen,
    customer,
    goBack,
    location,
    formData,
  } = props;
  const [documents, dispatch] = props.state;
  const [signature, setSignature] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessStarted, setIsProcessStarted] = useState(null);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', async () => {
      await dispatch({
        type: 'CHANGE_STATUS',
        document_id: document.id,
        passed: false,
      });
      goBack();
      return true;
    });
    return () => BackHandler.removeEventListener('hardwareBackPress');
  }, []);

  useEffect(() => {
    if (signature.length === 2) {
      handleSignatureMatch();
    }
  }, [signature]);

  const calculateNextStep = () => {
    if (currentStep < document.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsProcessStarted(false);
      return;
    }
  };

  const handleIsSignatureCorrect = res => {
    if (res.data.status !== 'OK') {
      Alert.alert(
        '',
        'İmzanızı ne yazık ki eşleştiremedik. Lütfen tekrar deneyin.',
        [{text: 'Tamam'}],
        {cancelable: false},
      );
      setCurrentStep(0);
      setSignature([]);
      return;
    }
    goBackToMainScreen();
  };

  const handleSignatureMatch = async () => {
    setIsProcessStarted(true);
    await sendContractForm();
    await sendSignatureDocuments();
  };

  const sendSignatureDocuments = async () => {
    const deviceData = {
      id: DeviceInfo.getUniqueId(),
      os: Platform.OS,
      model: DeviceInfo.getModel(),
      gsm: await DeviceInfo.getCarrier(),
    };

    const requestData = new FormData();

    requestData.append('type', document.id);
    requestData.append('customer_token', customer.id);
    requestData.append('device_data', JSON.stringify(deviceData));
    signature.forEach(sign => requestData.append('files[]', sign));

    await api
      .sendDocument(customer.access, requestData)
      .then(async res => {
        await dispatch({
          type: 'CHANGE_STATUS',
          document_id: document.id,
          passed: true,
        });
        handleIsSignatureCorrect(res);
      })
      .catch(async error => {
        await dispatch({
          type: 'CHANGE_STATUS',
          document_id: document.id,
          passed: false,
        });
        setCurrentStep(0);
        setSignature([]);
        Alert.alert(
          '',
          'Bir hata oluştu.',
          [
            {
              text: 'Tamam',
              onPress: () => setIsProcessStarted(false),
            },
          ],
          {cancelable: false},
        );
      });
  };

  const sendContractForm = async () => {
    let customerData = customer.data;

    customerData = {
      ...customerData,
      occupation: formData.job,
      address: {
        city: formData.city,
        province: formData.district,
        address: formData.address,
      },
    };

    const requestData = {
      customerData,
      token: customer.access,
    };

    await api.createCustomer(requestData);
  };

  const handleSignature = async drawnSignature => {
    setSignature([...signature, drawnSignature]);
    calculateNextStep();
  };

  const handleEmptySignature = () => {
    Alert.alert(
      'Warning',
      'Please make sure your signature is drawn.',
      [{text: 'OK'}],
      {cancelable: true},
    );
  };

  if (isProcessStarted) {
    return <Loading />;
  }

  return (
    <View style={styles.signatureContainer}>
      <StatusBar hidden />
      <SafeAreaView style={styles.topBar}>
        <TouchableOpacity
          style={styles.topBarLeft}
          onPress={goBack}
          hitSlop={{top: 25, left: 25, bottom: 25, right: 25}}>
          <Image
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="contain"
            source={require('../../../assets/back-arrow.png')}
          />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>
          {document.steps[currentStep].title}{' '}
          {document.steps[currentStep].description}
        </Text>
      </SafeAreaView>
      <View style={{flex: 1}}>
        <SignatureScreen
          onOK={handleSignature}
          onEmpty={handleEmptySignature}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signatureContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  topBar: {
    flexDirection: 'row',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    justifyContent: 'center',
    paddingVertical: 15,
  },
  topBarLeft: {
    position: 'absolute',
    left: 10,
    top: 15,
    width: 30,
    height: 20,
  },
  topBarTitle: {color: 'white', fontSize: 16},
});
