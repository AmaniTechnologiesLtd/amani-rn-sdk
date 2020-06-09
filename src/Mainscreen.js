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
  Platform,
  ImageBackground,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import DeviceInfo from 'react-native-device-info';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

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
import stepWarning from '../assets/step-warning-icon.png';
import stepWarningDark from '../assets/step-warning-dark-icon.png';
import lockIcon from '../assets/locked-dark-icon.png';
import successIcon from '../assets/success-icon.png';
import approvedIcon from '../assets/approved-icon.png';
import seperatorIcon from '../assets/seperator-icon.png';

const { width, height } = Dimensions.get('window');

const MainScreen = (props) => {
  const { onActivity, onError, onExit, server, authData, customerData } = props;
  const [documents, dispatch] = useReducer(documentsReducer, initialDocuments);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedDocumentVersion, setSelectedDocumentVersion] = useState(null);
  const [showContract, setShowContract] = useState(false);
  const [corners, setCorners] = useState([]);
  const [files, setFiles] = useState([]);
  const [isStepsFinished, setIsStepsFinished] = useState(false);
  const [customer, setCustomer] = useState({});
  const [location, setLocation] = useState(null);
  const [permissions, setPermission] = useState({
    camera: null,
    location: null,
  });
  const [permissionMessage, setPermissionMessage] = useState({ show: false });
  const [message, setMessage] = useState({
    ...initialMessage,
  });

  const initialMessage = {
    show: false,
    type: 'error',
    header: 'Bir hata oluştu!',
    title: null,
    message: null,
    buttonText: 'TAMAM',
    buttonClick: () =>
      setMessage({
        ...initialMessage,
      }),
  };

  const goBack = async () => {
    const callbackData = [];
    documents.forEach((element) => {
      callbackData.push({
        [element.id]: documents.find((document) => document.id === element.id)
          .status,
      });
    });
    onExit({ status: 'OK', documents: callbackData });
  };

  // If camera and location permissions not granted show error screen
  useEffect(() => {
    if (!permissions.camera || !permissions.location) {
      let title = !permissions.camera
        ? 'Doğrulamaların çalışabilmesi için kamera izni vermen gerekiyor.\n\n'
        : '';
      title += !permissions.location
        ? 'Doğrulamaların çalışabilmesi için konum izni vermen gerekiyor.'
        : '';

      setPermissionMessage({
        show: true,
        type: 'error',
        header: 'Gerekli İzinler Eksik',
        title: title,
        message: '',
        buttonText: 'Ayarlara Git',
        onClose: () => {
          onError({
            status: 'ERROR',
            message: 'Kamera ve konum izni kullanılamıyor.',
          });
        },
        buttonClick: () => {
          openSettings();
        },
        popup: true,
      });
    } else {
      setPermissionMessage({ show: false });
    }

    // Set location for later use
    if (permissions.location) {
      Geolocation.setRNConfiguration({ authorizationLevel: 'whenInUse' });
      Geolocation.getCurrentPosition(
        (position) => setLocation(position.coords),
        (error) => console.log(error),
        { enableHighAccuracy: true },
      );
    }
  }, [permissions]);

  useEffect(() => {
    handlePermissions();

    if (isLoading) {
      api.setBaseUrl(server ? server.toLowerCase() : 'tr');
      (async function () {
        try {
          const loginResponse = await api.login({
            email: authData.appKey,
            password: authData.appPassword,
          });

          if (loginResponse.data) {
            api.setToken(loginResponse.data.token);
          }

          try {
            const customerResponse = await api.createCustomer(customerData);
            setCustomer(customerResponse.data);

            // Prepare available documents from company rules
            const available_documents = customerResponse.data.rules.reduce(
              (currentValue, rule) => [
                ...currentValue,
                ...rule.document_classes,
              ],
              [],
            );

            // Filter documents that company needs
            dispatch({
              type: 'FILTER_DOCUMENTS',
              document_types: available_documents,
            });

            // Check for missing documents and set statuses for documents
            documents.map((doc) => {
              const rule = customerResponse.data.rules.find((element) =>
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

            findIncompleteDocument(customerResponse.data);
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

  const handlePermissions = async () => {
    let camera = false;
    const cameraPermission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA;

    const res = await check(cameraPermission);

    if (res === RESULTS.GRANTED) {
      camera = true;
    } else if (res === RESULTS.DENIED) {
      const res2 = await request(cameraPermission);
      res2 === RESULTS.GRANTED ? (camera = true) : (camera = false);
    }

    let location = false;
    const locationPermission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    const locationRes = await check(locationPermission);

    if (locationRes === RESULTS.GRANTED) {
      location = true;
    } else if (locationRes === RESULTS.DENIED) {
      const res2 = await request(locationPermission);
      res2 === RESULTS.GRANTED ? (location = true) : (location = false);
    }

    setPermission({ camera, location });
  };

  const handleSendDocumentsRequest = async () => {
    setIsStepsFinished(false);
    await dispatch({
      type: 'CHANGE_STATUS',
      document_id: selectedDocument.id,
      status: 'PROCESSING',
    });

    await dispatch({
      type: 'INCREMENT_ATTEMPT',
      document_id: selectedDocument.id,
    });

    setSelectedDocument({
      ...selectedDocument,
      attempt: selectedDocument.attempt + 1,
    });

    updateCustomerRules(selectedDocument.id, 'PROCESSING');

    if (selectedDocument.options.includes('async')) {
      showSuccessMessage();
    }

    const deviceData = {
      id: DeviceInfo.getUniqueId(),
      os: Platform.OS,
      brand: DeviceInfo.getBrand(),
      model: DeviceInfo.getModel(),
      carrier: await DeviceInfo.getCarrier(),
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
      corners.forEach((corner) =>
        requestData.append('corners[]', JSON.stringify(corner)),
      );
    }

    if (selectedDocumentVersion.autoCrop) {
      requestData.append('cropped', true);
    }

    requestData.append('attempt', selectedDocument.attempt);

    files.forEach((file) => requestData.append('files[]', file));

    await api
      .sendDocument(requestData)
      .then((res) => {
        if (
          res.data.status === 'OK' ||
          selectedDocument.attempt >= selectedDocument.maxAttempt
        ) {
          dispatch({
            type: 'CHANGE_STATUS',
            document_id: selectedDocument.id,
            status: 'PENDING_REVIEW',
          });

          updateCustomerRules(selectedDocument.id, 'PENDING_REVIEW');

          if (!selectedDocument.options.includes('async')) {
            showSuccessMessage();
          }

          return;
        }

        dispatch({
          type: 'CHANGE_STATUS',
          document_id: selectedDocument.id,
          status: 'AUTOMATICALLY_REJECTED',
        });

        updateCustomerRules(selectedDocument.id, 'AUTOMATICALLY_REJECTED');

        if (!selectedDocument.options.includes('async')) {
          showErrorMessage(res.data.errors);
        }
      })
      .catch((error) => {
        dispatch({
          type: 'CHANGE_STATUS',
          document_id: selectedDocument.id,
          status: 'AUTOMATICALLY_REJECTED',
        });

        updateCustomerRules(
          selectedDocument.id,
          'AUTOMATICALLY_REJECTED',
          'Belge doğrulanamadı',
        );

        if (!selectedDocument.options.includes('async')) {
          showErrorMessage();
        }
      });
  };

  const handleError = (error) => {
    let errorMessage = 'Lütfen daha sonra tekrar dene.';

    // if (error.message) {
    //   errorMessage = error.message;
    // } else if (error.response && error.response.data.errors) {
    //   errorMessage = error.response.data.errors[0].ERROR_MESSAGE;
    // }

    setMessage({
      ...initialMessage,
      show: true,
      header: 'Bir hata oluştu!',
      title: errorMessage,
      buttonText: 'GERİ DÖN',
      buttonClick: () =>
        onError({
          status: 'ERROR',
          message: errorMessage,
        }),
    });
  };

  const showSuccessMessage = (document = null) => {
    const messageDocument = document ? document : selectedDocument;
    if (messageDocument) {
      setMessage({
        ...initialMessage,
        show: true,
        type: 'success',
        header: 'Tebrikler!',
        title: messageDocument.successTitle,
        message: messageDocument.successDescription,
        buttonText: 'DEVAM',
        buttonClick: () => findIncompleteDocument(customer),
        popup: true,
      });
    }
  };

  const showErrorMessage = (errors) => {
    if (selectedDocument) {
      setMessage({
        ...initialMessage,
        show: true,
        type: 'error',
        header: 'Dikkat!',
        title: selectedDocument.errorTitle,
        message: errors || selectedDocument.errorDescription,
        buttonText: 'DEVAM',
        buttonClick: () => {
          setFiles([]);
          setCorners([]);
          setMessage({ ...initialMessage });
        },
        popup: true,
      });
    }
  };

  const updateCustomerRules = (documentID, status, statusMessage = null) => {
    const rules = customer.rules.map((rule) => {
      if (rule.document_classes.includes(documentID)) {
        rule.status = status;

        if (statusMessage) {
          rule.status_message = statusMessage;
        }
      }
      return rule;
    });
    setCustomer({ ...customer, rules });
  };

  const skipDocument = () => {
    const rules = customer.rules.map((rule) => {
      if (rule.document_classes.includes(selectedDocument.id)) {
        rule.status = 'SKIPPED';
      }
      return rule;
    });
    setCustomer({ ...customer, rules });
    findIncompleteDocument(customer);
  };

  const clearSelectedDocument = () => {
    setSelectedDocument(null);
    setFiles([]);
    setCorners([]);
    setShowContract(false);
    setMessage({ ...initialMessage });
  };

  const checkPreviousSteps = (index, statuses) => {
    return documents.some((document, docIndex) => {
      if (docIndex < index) {
        return statuses.includes(documentStatus(document));
      }
      return false;
    });
  };

  const checkIsNextStepDisabled = (document, index) => {
    // Accessibility check for only physical contract
    return Boolean(
      (document.id === 'CO' &&
        checkPreviousSteps(index, [
          'NOT_UPLOADED',
          'REJECTED',
          'AUTOMATICALLY_REJECTED',
        ])) ||
        ['APPROVED'].includes(documentStatus(document)),
    );

    // Accessibility check for all documents
    // return Boolean(
    //   (index !== 0 &&
    //     checkPreviousSteps(index, ['NOT_UPLOADED', 'REJECTED'])) ||
    //     ['APPROVED', 'PENDING_REVIEW'].includes(document.status),
    // );
  };

  const moduleStatusBackground = (document) => {
    const status = documentStatus(document);
    if (['REJECTED', 'AUTOMATICALLY_REJECTED'].includes(status)) {
      return { backgroundColor: '#FF5C65', paddingVertical: 5 };
    } else if (status === 'NOT_UPLOADED') {
      return { backgroundColor: '#00FFD1' };
    }
  };

  const moduleTitleStyle = (document) => {
    const status = documentStatus(document);

    if (status === 'APPROVED') {
      return {
        color: '#CAE0F5',
        fontSize: width * 0.035,
        fontWeight: 'normal',
      };
    } else if (['REJECTED', 'AUTOMATICALLY_REJECTED'].includes(status)) {
      return {
        color: '#FFFFFF',
      };
    } else if (status === 'PROCESSING') {
      return { color: '#FFFFFF' };
    } else if (status === 'PENDING_REVIEW') {
      return { color: '#CAE0F5' };
    }
  };

  const documentStatus = (document) => {
    let status = document.status;

    if (!customer.rules) {
      return;
    }
    const rule = customer.rules.find((rule) =>
      rule.document_classes.includes(document.id),
    );

    if (document.status === 'AUTOMATICALLY_REJECTED') {
      status =
        rule.attempt >= document.maxAttempt ? 'PENDING_REVIEW' : 'REJECTED';
    }

    return status;
  };

  const moduleStatusIcon = (document, index) => {
    const status = documentStatus(document);

    if (
      document.id === 'CO' && // Show lock icon for only physical contract
      !['APPROVED', 'PENDING_REVIEW'].includes(status) &&
      index !== 0 &&
      checkPreviousSteps(index, [
        'NOT_UPLOADED',
        'REJECTED',
        'AUTOMATICALLY_REJECTED',
      ])
    ) {
      return (
        <Image
          resizeMode="contain"
          style={styles.moduleStatusIcon}
          source={lockIcon}
        />
      );
    } else if (status === 'NOT_UPLOADED') {
      return (
        <Image
          resizeMode="contain"
          style={styles.moduleStatusIcon}
          source={stepWarningDark}
        />
      );
    } else if (status === 'PENDING_REVIEW') {
      return (
        <Image
          resizeMode="contain"
          style={styles.moduleStatusIcon}
          source={successIcon}
        />
      );
    } else if (status === 'APPROVED') {
      return (
        <Image
          resizeMode="contain"
          style={styles.moduleStatusIcon}
          source={approvedIcon}
        />
      );
    } else if (['REJECTED', 'AUTOMATICALLY_REJECTED'].includes(status)) {
      return (
        <Image
          resizeMode="contain"
          style={styles.moduleStatusIcon}
          source={stepWarning}
        />
      );
    }

    return (
      <ActivityIndicator style={{ marginLeft: width * 0.06 }} color="white" />
    );
  };

  const selectDocument = (document) => {
    console.log(document);
    // First check if have any rejection message from studio
    if (customer && customer.rules) {
      const rule = customer.rules.find((step) =>
        step.document_classes.includes(document.id),
      );

      if (rule && rule.status_message) {
        setMessage({
          ...initialMessage,
          show: true,
          type: 'error',
          header: 'Belge Onaylanmadı',
          title: rule.status_message,
          buttonText: 'DEVAM',
          buttonClick: () => goToDocument(document),
          popup: true,
        });
        return;
      }
    }

    // If no message directly go to document
    goToDocument(document);
  };

  const goToDocument = (document) => {
    setMessage({
      ...initialMessage,
    });
    // Go to document capture page
    if (document.id === 'SG') {
      setShowContract(true);
    } else {
      setSelectedDocument(document);
    }
  };

  const findIncompleteDocument = (currentCustomer) => {
    // If last step physical contract is done return to main application
    if (
      documents.every((document) =>
        ['APPROVED', 'PENDING_REVIEW'].includes(documentStatus(document)),
      )
    ) {
      goBack();
      return;
    }

    // If not first time customer do not go to document automatically
    // go to document selection screen
    if (currentCustomer.status !== 'Created') {
      clearSelectedDocument();
      return;
    }

    const incompleteRules = currentCustomer.rules.filter((doc) =>
      ['NOT_UPLOADED', 'REJECTED', 'AUTOMATICALLY_REJECTED'].includes(
        doc.status,
      ),
    );

    clearSelectedDocument();

    if (incompleteRules.length) {
      const startDoc = documents.find((doc) =>
        incompleteRules[0].document_classes.includes(doc.id),
      );

      if (startDoc) {
        selectDocument(startDoc);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (message.show || permissionMessage.show) {
    const newMessage = message.show ? message : permissionMessage;
    return (
      <MessageScreen
        type={newMessage.type}
        header={newMessage.header}
        title={newMessage.title}
        message={newMessage.message}
        buttonText={newMessage.buttonText}
        onClose={
          newMessage.onClose ? newMessage.onClose : newMessage.buttonClick
        }
        onClick={newMessage.buttonClick}
        popup={newMessage.popup}
        onActivity={onActivity}
      />
    );
  }

  //If contract is already uploaded show message screen and return to main app
  if (
    documents.every((document) =>
      ['APPROVED', 'PENDING_REVIEW'].includes(documentStatus(document)),
    )
  ) {
    const contract = documents.find((doc) => doc.id === 'CO');
    selectDocument(contract);
    showSuccessMessage();
  }

  // All documents approved or pending review except physical contract
  // show applied screen and upload physical contract if needed
  if (
    documents
      .filter((document) => document.id !== 'CO')
      .every((document) =>
        ['APPROVED', 'PENDING_REVIEW'].includes(documentStatus(document)),
      ) &&
    selectedDocument === null
  ) {
    const contract = documents.find((doc) => doc.id === 'CO');
    return (
      <AppliedScreen
        customer={customer}
        goBack={goBack}
        takePhoto={() => {
          goToDocument(contract);
        }}
        onActivity={onActivity}
      />
    );
  }

  if (selectedDocument) {
    return (
      <CaptureDocument
        customer={customer}
        document={selectedDocument}
        setSelectedDocumentVersion={setSelectedDocumentVersion}
        onCapture={(capture) => setFiles([...files, capture])}
        onManualCropCorners={(cropData) => setCorners([...corners, cropData])}
        onStepsFinished={setIsStepsFinished}
        onClearDocument={() => {
          // If customer directly go to ID validation (new customer)
          // when pressed go back button exit to Ininal App
          if (customer.status === 'Created') {
            goBack();
            return;
          }

          // Otherwise exit to main screen
          clearSelectedDocument();
        }}
        onSkipDocument={skipDocument}
        onActivity={onActivity}
      />
    );
  }

  if (showContract) {
    return (
      <ContractScreen
        onContractDecline={() => setShowContract(false)}
        location={location}
        currentDocument={documents.find((document) => document.id === 'SG')}
        addressDocument={documents.find((document) => document.id === 'UB')}
        dispatch={dispatch}
        customer={customer}
        updateCustomerRules={updateCustomerRules}
        onActivity={onActivity}
      />
    );
  }

  return (
    <ImageBackground
      source={mainBackground}
      style={styles.container}
      onTouchStart={onActivity}>
      <TopBar
        onLeftButtonPressed={goBack}
        leftButtonIcon={backArrow}
        noBackground
      />
      <Text style={styles.containerHeaderText}>Eksik Adımları Tamamla</Text>
      <View style={styles.modulesContainer} onTouchStart={onActivity}>
        {documents.map((document, index) => {
          return (
            <Fragment key={document.id}>
              <TouchableOpacity
                disabled={checkIsNextStepDisabled(document, index)}
                style={[styles.moduleButton, moduleStatusBackground(document)]}
                onPress={() => selectDocument(document)}>
                <View style={styles.moduleContainer}>
                  <View style={styles.moduleTitleContainer}>
                    <Text
                      style={[styles.moduleTitle, moduleTitleStyle(document)]}>
                      {document.messages[documentStatus(document)]}
                    </Text>
                  </View>
                  <View style={styles.moduleStatusContainer}>
                    {moduleStatusIcon(document, index)}
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
    marginVertical: height * 0.03,
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
    color: '#263B5B',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    letterSpacing: 0.5,
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
