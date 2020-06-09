import React, { useState, useEffect } from 'react';
import {
  View,
  Alert,
  StyleSheet,
  BackHandler,
  Platform,
  Modal,
  Dimensions,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import LottieView from 'lottie-react-native';

// Local files
import TopBar from '../TopBar';
import SignatureScreen from './index';
import Loading from '../Loading';
import MessageScreen from '../MessageScreen';
import backArrow from '../../../assets/back-arrow.png';
import api from '../../services/api';
import animationSignature from '../../../assets/animation_signature.json';
import { errorMessages } from '../../constants';

const { height } = Dimensions.get('window');

const SignatureDraw = (props) => {
  const {
    document,
    goBackToMainScreen,
    customer,
    goBack,
    formData,
    dispatch,
    updateCustomerRules,
    onActivity,
  } = props;
  const [signature, setSignature] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [notMatched, setNotMatched] = useState(null);
  const [showAnimation, setShowAnimation] = useState(true);
  const [isProcessStarted, setIsProcessStarted] = useState(null);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', async () => {
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

  const handleSignatureMatch = async () => {
    setIsProcessStarted(true);
    await sendContractForm();
    await sendSignatureDocuments();
  };

  const sendSignatureDocuments = async () => {
    await dispatch({
      type: 'INCREMENT_ATTEMPT',
      document_id: document.id,
    });

    document.attempt += 1;

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
    requestData.append('attempt', document.attempt);
    signature.forEach((sign) => requestData.append('files[]', sign));

    await api
      .sendDocument(requestData)
      .then(async (res) => {
        if (
          res.data.status !== 'OK' &&
          document.attempt < document.maxAttempt
        ) {
          setNotMatched(errorMessages[res.data.errors[0].error_code]);
          setCurrentStep(0);
          setSignature([]);
          setIsProcessStarted(false);

          await dispatch({
            type: 'CHANGE_STATUS',
            document_id: document.id,
            status: 'AUTOMATICALLY_REJECTED',
          });

          return;
        }

        await dispatch({
          type: 'CHANGE_STATUS',
          document_id: document.id,
          status: 'PENDING_REVIEW',
        });

        updateCustomerRules(document.id, 'PENDING_REVIEW');

        goBackToMainScreen();
      })
      .catch(async (error) => {
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

        await dispatch({
          type: 'CHANGE_STATUS',
          document_id: document.id,
          status: 'AUTOMATICALLY_REJECTED',
        });
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

  const handleSignature = async (drawnSignature) => {
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
        header="Dikkat!"
        title={notMatched}
        buttonText="DEVAM"
        onClick={() => setNotMatched(null)}
      />
    );
  }

  return (
    <View style={styles.container} onTouchStart={onActivity}>
      <TopBar
        onLeftButtonPressed={goBack}
        leftButtonIcon={backArrow}
        title={document.steps[currentStep].title}
      />

      <Modal
        transparent
        statusBarTranslucent
        animationType="none"
        visible={showAnimation}>
        <LottieView
          style={[height < 600 ? { height: height * 0.78 } : {}]}
          source={animationSignature}
          autoPlay
          loop={false}
          onAnimationFinish={() => setShowAnimation(false)}
        />
      </Modal>

      <SignatureScreen onOK={handleSignature} onEmpty={handleEmptySignature} />
    </View>
  );
};

export default SignatureDraw;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
