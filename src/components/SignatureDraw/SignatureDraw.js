import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet, BackHandler, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

// Local files
import TopBar from '../TopBar';
import SignatureScreen from './index';
import Loading from '../Loading';
import MessageScreen from '../MessageScreen';
import backArrow from '../../../assets/back-arrow.png';
import api from '../../services/api';

const SignatureDraw = props => {
  const {
    document,
    goBackToMainScreen,
    customer,
    goBack,
    formData,
    dispatch,
  } = props;
  const [signature, setSignature] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [notMatched, setNotMatched] = useState(false);
  const [isProcessStarted, setIsProcessStarted] = useState(null);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', async () => {
      await dispatch({
        type: 'CHANGE_STATUS',
        document_id: document.id,
        status: 'PENDING_REVIEW',
      });
      goBack();
      return true;
    });
    return () => BackHandler.removeEventListener('hardwareBackPress');
  }, []);

  useEffect(() => {
    if (signature.length === document.steps.length) {
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
      setNotMatched(true);
      setCurrentStep(0);
      setSignature([]);
      setIsProcessStarted(false);
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
    requestData.append('customer_id', customer.id);
    requestData.append('device_data', JSON.stringify(deviceData));
    signature.forEach(sign => requestData.append('files[]', sign));

    await api
      .sendDocument(requestData)
      .then(async res => {
        await dispatch({
          type: 'CHANGE_STATUS',
          document_id: document.id,
          status: 'PENDING_REVIEW',
        });
        handleIsSignatureCorrect(res);
      })
      .catch(async error => {
        await dispatch({
          type: 'CHANGE_STATUS',
          document_id: document.id,
          status: 'PENDING_REVIEW',
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
          { cancelable: false },
        );
      });
  };

  const sendContractForm = async () => {
    const customerData = {
      id: customer.id,
      occupation: formData.job,
      address: {
        city: formData.city,
        province: formData.district,
        address: formData.address,
      },
    };

    await api.createCustomer(customerData);
  };

  const handleSignature = async drawnSignature => {
    setIsProcessStarted(true);
    setSignature([...signature, drawnSignature]);
    calculateNextStep();
  };

  const handleEmptySignature = () => {
    Alert.alert('Dikkat!', 'İmza alanı boş olamaz', [{ text: 'OK' }], {
      cancelable: true,
    });
  };

  if (isProcessStarted) {
    return <Loading />;
  }

  if (notMatched) {
    return (
      <MessageScreen
        type="error"
        header="İmzanızı eşleştiremedik!"
        title="Dijital imzanız kimliğinizdeki imza ile aynı olmalıdır"
        buttonText="TEKRAR DENE"
        onClick={() => setNotMatched(false)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <TopBar
        style={{ paddingHorizontal: 20, paddingTop: 40 }}
        onLeftButtonPressed={goBack}
        leftButtonIcon={backArrow}
        title={document.steps[currentStep].title}
      />

      <View style={{ flex: 1 }}>
        <SignatureScreen
          onOK={handleSignature}
          onEmpty={handleEmptySignature}
        />
      </View>
    </View>
  );
};

export default SignatureDraw;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263B5B',
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
  topBarTitle: { color: 'white', fontSize: 16 },
});
