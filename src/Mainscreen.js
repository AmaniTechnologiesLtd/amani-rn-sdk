import React, { useState, useEffect, useReducer, Fragment } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Image,
  BackHandler,
  PermissionsAndroid,
  Platform,
  ImageBackground,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import DeviceInfo from 'react-native-device-info';

// Local files
import CaptureDocument from './components/CaptureDocument';
import MessageScreen from './components/MessageScreen';
import ContractScreen from './components/SmartContract/ContractScreen';
import Loading from './components/Loading';
import PoweredBy from './components/PoweredBy';
import { initialDocuments, documentsReducer } from './store/documents';
import api from './services/api';
import TopBar from './components/TopBar';
import AppliedScreen from './components/AppliedScreen';
import mainBackground from '../assets/main-bg.png';
import backArrow from '../assets/back-arrow.png';
import forwardArrow from '../assets/forward-arrow.png';
import lockIcon from '../assets/locked-icon.png';
import successIcon from '../assets/success-icon.png';
import pendingIcon from '../assets/step-pending-icon.png';
import failedIcon from '../assets/failed-icon.png';
import seperatorIcon from '../assets/seperator-icon.png';

const { width, height } = Dimensions.get('window');

const MainScreen = props => {
  const { onError, onExit, server, authData, customerInformations } = props;
  const [documents, dispatch] = useReducer(documentsReducer, initialDocuments);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedDocumentVersion, setSelectedDocumentVersion] = useState(null);
  const [showContract, setShowContract] = useState(false);
  const [corners, setCorners] = useState([]);
  const [files, setFiles] = useState([]);
  const [isStepsFinished, setIsStepsFinished] = useState(false);
  const [customer, setCustomer] = useState({});
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [permissions, setPermission] = useState({
    camera: null,
    location: null,
  });
  const [location, setLocation] = useState(null);

  const initialMessage = {
    show: false,
    type: 'error',
    header: 'Bir hata oluştu!',
    title: null,
    message: null,
    buttonText: 'TAMAM',
    buttonClick: () => setMessage(initialMessage),
  };
  const [message, setMessage] = useState(initialMessage);

  const checkPermissions = async () => {
    setPermission({
      camera: await PermissionsAndroid.request('android.permission.CAMERA'),
      location: await PermissionsAndroid.request(
        'android.permission.ACCESS_FINE_LOCATION',
      ),
    });
  };

  if (
    Platform.OS === 'android' &&
    !permissions.camera &&
    !permissions.location
  ) {
    checkPermissions();
  }

  const goBack = async () => {
    const callbackData = [];
    documents.forEach(element => {
      callbackData.push({
        [element.id]: documents.find(document => document.id === element.id)
          .status,
      });
    });
    onExit({ status: 'OK', documents: callbackData });
  };

  // Check needed permissions (camera, location)
  useEffect(() => {
    (async function() {
      if (permissions.location === 'granted' || Platform.OS === 'ios') {
        await Geolocation.getCurrentPosition(position =>
          setLocation(position.coords),
        );
      }
    })();

    // If necessary permissions not granted show error screen
    if (
      Platform.OS === 'android' &&
      permissions.camera !== 'granted' &&
      permissions.location !== 'granted'
    ) {
      setMessage({
        show: true,
        type: 'error',
        header: 'Gerekli İzinler Eksik!',
        title: 'Doğrulamaların çalışabilmesi için gereken izinler eksik',
        message:
          'Kamera ve Konum izinlerini verdikten sonra uygulamayı tekrar başlatın',
        buttonText: 'GERİ DÖN',
        buttonClick: () =>
          onError({
            status: 'ERROR',
            message: 'Kamera ve konum izni kullanılamıyor...',
          }),
      });
    } else {
      setMessage(initialMessage);
    }
  }, [permissions]);

  useEffect(() => {
    if (isLoading) {
      api.setBaseUrl(server ? server.toLowerCase() : 'tr');
      (async function() {
        try {
          const loginReponse = await api.login({
            email: authData.appKey,
            password: authData.appPassword,
          });

          api.setToken(loginReponse.data.token);

          try {
            const customerReponse = await api.createCustomer(
              customerInformations,
            );
            setCustomer(customerReponse.data);

            // Prepare available documents from company rules
            const available_documents = customerReponse.data.rules.reduce(
              (currentValue, rule) => [
                ...currentValue,
                ...rule.document_classes,
              ],
              [],
            );

            dispatch({
              type: 'FILTER_DOCUMENTS',
              document_types: available_documents,
            });

            // Check for missing documents
            documents.map(doc => {
              const rule = customerReponse.data.rules.find(element =>
                element.document_classes.includes(doc.id),
              );

              if (rule) {
                dispatch({
                  type: 'CHANGE_STATUS',
                  document_id: doc.id,
                  status: rule.status,
                });
              }
            });
          } catch (error) {
            handleError(error);
          }
        } catch (error) {
          handleError(error);
        }
        setIsLoading(false);
      })();
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      goBack,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (isStepsFinished) {
      handleSendDocumentsRequest();
    }
  }, [isStepsFinished]);

  const handleSendDocumentsRequest = async () => {
    setIsStepsFinished(false);
    await dispatch({
      type: 'CHANGE_STATUS',
      document_id: selectedDocument.id,
      status: 'PROCESSING',
    });

    setShowSuccessScreen(true);

    const deviceData = {
      id: DeviceInfo.getUniqueId(),
      os: Platform.OS,
      model: DeviceInfo.getModel(),
      gsm: await DeviceInfo.getCarrier(),
    };

    const requestData = new FormData();

    requestData.append(
      'type',
      selectedDocumentVersion.title !== 'Diğer' ? selectedDocument.id : 'OT',
    );
    requestData.append('customer_id', customer.id);
    requestData.append('device_data', JSON.stringify(deviceData));
    if (location) {
      requestData.append('location', JSON.stringify(location));
    }
    if (corners) {
      corners.forEach(corner =>
        requestData.append('corners[]', JSON.stringify(corner)),
      );
    }

    files.forEach(file => requestData.append('files[]', file));

    await api
      .sendDocument(requestData)
      .then(res => {
        if (res.data.status === 'OK') {
          dispatch({
            type: 'CHANGE_STATUS',
            document_id: selectedDocument.id,
            status: 'PENDING_REVIEW',
          });
          return;
        }
        dispatch({
          type: 'CHANGE_STATUS',
          document_id: selectedDocument.id,
          status: 'PENDING_REVIEW',
        });
      })
      .catch(error => {
        dispatch({
          type: 'CHANGE_STATUS',
          document_id: selectedDocument.id,
          status: 'PENDING_REVIEW',
        });
      });
  };

  const handleError = error => {
    setMessage({
      ...initialMessage,
      show: true,
      header: 'Bir şeyler yanlış gitti!',
      title: error.response.data.errors
        ? error.response.data.errors[0].ERROR_MESSAGE
        : 'Lütfen daha sonra tekrar deneyin...',
      buttonText: 'GERİ DÖN',
      buttonClick: () =>
        onError({
          status: 'ERROR',
          message: error.response.data.errors
            ? error.response.data.errors[0]
            : 'Bilinmeyen hata',
        }),
    });
  };

  const clearSelectedDocument = () => {
    setSelectedDocument(null);
    setFiles([]);
    setCorners([]);
    setShowSuccessScreen(false);
  };

  const onDocumentCaptured = capture => {
    setFiles([...files, capture]);
  };

  const onDocumentDeclined = () => {
    setFiles(files.slice(0, -1));
  };

  const onDocumentCrop = cropData => {
    setCorners([...corners, cropData]);
  };

  const clearDocument = () => {
    setFiles([]);
    setSelectedDocument(null);
  };

  const checkPreviousSteps = (index, statuses) => {
    return documents.some((document, docIndex) => {
      if (docIndex < index) {
        return statuses.includes(document.status);
      }
      return false;
    });
  };

  const checkIsNextStepDisabled = (document, index) => {
    // return false;

    return Boolean(
      (index !== 0 &&
        checkPreviousSteps(index, ['NOT_UPLOADED', 'REJECTED'])) ||
        ['APPROVED', 'PENDING_REVIEW'].includes(document.status),
    );
  };

  const modalStatusIcon = (document, index) => {
    if (
      !['APPROVED', 'PENDING_REVIEW'].includes(document.status) &&
      (index !== 0 && checkPreviousSteps(index, ['NOT_UPLOADED', 'REJECTED']))
    ) {
      return (
        <Image
          resizeMode="contain"
          style={styles.moduleStatusIcon}
          source={lockIcon}
        />
      );
    } else if (document.status === 'NOT_UPLOADED') {
      return (
        <Image
          resizeMode="contain"
          style={styles.moduleStatusIcon}
          source={forwardArrow}
        />
      );
    } else if (document.status === 'PENDING_REVIEW') {
      return (
        <Image
          resizeMode="contain"
          style={styles.moduleStatusIcon}
          source={pendingIcon}
        />
      );
    } else if (document.status === 'APPROVED') {
      return (
        <Image
          resizeMode="contain"
          style={styles.moduleStatusIcon}
          source={successIcon}
        />
      );
    } else if (document.status === 'REJECTED') {
      return (
        <Image
          resizeMode="contain"
          style={styles.moduleStatusIcon}
          source={failedIcon}
        />
      );
    }

    return (
      <ActivityIndicator style={{ marginLeft: width * 0.06 }} color="white" />
    );
  };

  const handleDocumentClick = document => {
    // First check if have any rejection message from studio
    const rule = customer.rules.find(step =>
      step.document_classes.includes(document.id),
    );

    if (rule && rule.status_message) {
      setMessage({
        ...initialMessage,
        show: true,
        type: 'warning',
        header: rule.status_message,
        buttonText: 'DEVAM',
        buttonClick: () => goToDocument(document),
      });
      return;
    }

    // If no message directly go to document
    goToDocument(document);
  };

  const goToDocument = document => {
    setMessage(initialMessage);
    // Redirect to document capture page
    if (document.id === 'SG') {
      setShowContract(true);
    } else {
      setSelectedDocument(document);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (message.show) {
    return (
      <MessageScreen
        type={message.type}
        header={message.header}
        title={message.title}
        message={message.message}
        buttonText={message.buttonText}
        onClick={message.buttonClick}
      />
    );
  }

  if (
    documents.every(document =>
      ['APPROVED', 'PENDING_REVIEW'].includes(document.status),
    )
  ) {
    return (
      <AppliedScreen
        customer={customer}
        goBack={goBack}
        allApproved={documents.every(
          document => document.status === 'APPROVED',
        )}
      />
    );
  }

  if (showSuccessScreen) {
    return (
      <MessageScreen
        type="success"
        header="Tebrikler!"
        title={selectedDocument.successTitle}
        message={selectedDocument.successDescription}
        nextStepMessage={selectedDocument.nextStepDescription}
        buttonText="DEVAM"
        onClick={clearSelectedDocument}
      />
    );
  }

  if (selectedDocument) {
    return (
      <CaptureDocument
        customer={customer}
        document={selectedDocument}
        setSelectedDocumentVersion={setSelectedDocumentVersion}
        onCapture={onDocumentCaptured}
        onDecline={onDocumentDeclined}
        onManualCropCorners={onDocumentCrop}
        onStepsFinished={setIsStepsFinished}
        onClearDocument={clearDocument}
      />
    );
  }

  if (showContract) {
    return (
      <ContractScreen
        onContractDecline={() => setShowContract(false)}
        location={location}
        currentDocument={documents.find(document => document.id === 'SG')}
        dispatch={dispatch}
        customer={customer}
      />
    );
  }

  return (
    <ImageBackground source={mainBackground} style={styles.container}>
      <TopBar onLeftButtonPressed={goBack} leftButtonIcon={backArrow} />
      <Text style={styles.containerHeaderText}>Eksik Adımları Tamamla</Text>
      <View style={styles.modulesContainer}>
        {documents.map((document, index) => {
          return (
            <Fragment key={document.id}>
              <TouchableOpacity
                disabled={checkIsNextStepDisabled(document, index)}
                style={styles.moduleButton}
                onPress={() => handleDocumentClick(document)}
              >
                <View style={styles.moduleContainer}>
                  <View style={styles.moduleTitleContainer}>
                    <Text
                      style={[
                        styles.moduleTitle,
                        ['APPROVED'].includes(document.status)
                          ? styles.moduleTitleApproved
                          : {},
                      ]}
                    >
                      {document.messages[document.status]}
                    </Text>
                  </View>
                  <View style={styles.moduleStatusContainer}>
                    {modalStatusIcon(document, index)}
                  </View>
                </View>
              </TouchableOpacity>
              {index < documents.length - 1 && (
                <View style={styles.moduleSeperator}>
                  <Image
                    resizeMode="contain"
                    style={styles.seperatorIcon}
                    source={seperatorIcon}
                  />
                </View>
              )}
            </Fragment>
          );
        })}
      </View>
      <PoweredBy />
    </ImageBackground>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  containerHeaderText: {
    color: 'white',
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginVertical: 30,
  },
  modulesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  moduleContainer: {
    flexDirection: 'row',
  },
  moduleButton: {
    backgroundColor: 'rgba(14, 37, 70, 0.6)',
    padding: 15,
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 10,
  },
  moduleSeperator: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginVertical: 5,
    paddingRight: 10,
  },
  buttonBackground: {
    resizeMode: 'cover',
    padding: 20,
  },
  moduleTitleContainer: {
    width: '90%',
    justifyContent: 'center',
  },
  moduleTitle: {
    color: '#eee',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  moduleTitleApproved: {
    color: '#CAE0F5',
    fontSize: width * 0.035,
    fontWeight: 'normal',
  },
  moduleStatusContainer: {
    width: '10%',
    justifyContent: 'center',
  },
  moduleStatusIcon: {
    width: width * 0.15,
    height: height * 0.025,
  },
});
