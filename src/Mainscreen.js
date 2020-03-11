import React, { useState, useEffect, useReducer } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Image,
  StatusBar,
  BackHandler,
  PermissionsAndroid,
  Platform,
  Alert,
  ImageBackground,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import DeviceInfo from 'react-native-device-info';

// Local files
import CaptureDocument from './components/CaptureDocument';
import DocumentSuccess from './components/DocumentSuccess';
import ContractScreen from './components/SmartContract/ContractScreen';
import Loading from './components/Loading';
import PoweredBy from './components/PoweredBy';
import { initialDocuments, documentsReducer } from './store/documents';
import api from './services/api';
import TopBar from './components/TopBar';
import mainBackground from '../assets/main-bg.png';
import backArrow from '../assets/back-arrow.png';
import forwardArrow from '../assets/forward-arrow.png';
import lockIcon from '../assets/locked-icon.png';
import successIcon from '../assets/success-icon.png';
import failedIcon from '../assets/failed-icon.png';
import seperatorIcon from '../assets/seperator-icon.png';

const { width, height } = Dimensions.get('window');

export const MainScreen = props => {
  const { onError, onExit } = props;
  const [documents, dispatch] = useReducer(documentsReducer, initialDocuments);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedDocumentVersion, setSelectedDocumentVersion] = useState(null);
  // const [cropDocument, setCropDocument] = useState(null);
  const [showContract, setShowContract] = useState(false);
  const [corners, setCorners] = useState([]);
  const [files, setFiles] = useState([]);
  const [isStepsFinished, setIsStepsFinished] = useState(false);
  const [customer, setCustomer] = useState({
    access: null,
    id: null,
    data: null,
  });
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [permissions, setPermission] = useState({
    camera: null,
    location: null,
  });
  const [location, setLocation] = useState(null);

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
          .passed,
      });
    });
    onExit(callbackData);
  };

  const errorHandler = e => {
    Alert.alert(
      'Bir şeyler yanlış gitti',
      e.response.data.errors[0].ERROR_MESSAGE,
      [
        {
          text: 'Tamam',
          onPress: () => onError(e.response.data.errors[0]),
        },
      ],
      { cancelable: false },
    );
  };

  useEffect(() => {
    const getLocation = async () => {
      if (permissions.location === 'granted' || Platform.OS === 'ios') {
        await Geolocation.getCurrentPosition(position =>
          setLocation(position.coords),
        );
      }
    };
    getLocation();
  }, [permissions]);

  useEffect(() => {
    // Check if every document finished
    // if (Object.values(documents).every(item => item.passed === true)) {
    //   setControllerButton({
    //     text: 'Doğrulamayı Bitir',
    //     backgroundColor: '#00e676',
    //     color: '#212121',
    //   });
    // }

    if (isLoading) {
      api.setBaseUrl(props.server ? props.server.toLowerCase() : 'tr');
      const authData = props.authData;
      const customerInformations = props.customerInformations;
      api
        .login({ email: authData.appKey, password: authData.appPassword })
        .then(fRes => {
          const formData = {
            customerData: customerInformations,
            token: fRes.data.token,
          };

          api
            .createCustomer(formData)
            .then(async sRes => {
              setCustomer({
                access: fRes.data.token,
                id: sRes.data.id,
                data: customerInformations,
              });
              await dispatch({
                type: 'FILTER_DOCUMENTS',
                document_types: fRes.data.available_documents,
              });

              // Check for missing documents
              let rules = [];
              await sRes.data.missing_rules.map(rule => {
                rules = rules.concat(rule.document_classes);
              });

              documents.map(doc => {
                if (!rules.includes(doc.id)) {
                  dispatch({
                    type: 'CHANGE_STATUS',
                    document_id: doc.id,
                    passed: true,
                  });
                }
              });

              setIsLoading(false);
            })
            .catch(error => errorHandler(error));
        })
        .catch(error => errorHandler(error));
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        goBack();
      },
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
      passed: 'loading',
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
      .sendDocument(customer.access, requestData)
      .then(res => {
        if (res.data.status === 'OK') {
          dispatch({
            type: 'CHANGE_STATUS',
            document_id: selectedDocument.id,
            passed: true,
          });
          return;
        }
        dispatch({
          type: 'CHANGE_STATUS',
          document_id: selectedDocument.id,
          passed: false,
        });
      })
      .catch(error => {
        dispatch({
          type: 'CHANGE_STATUS',
          document_id: selectedDocument.id,
          passed: false,
        });
      });
  };

  const clearSelectedDocument = () => {
    setSelectedDocument(null);
    // setCropDocument(null);
    setFiles([]);
    setCorners([]);
    setShowSuccessScreen(false);
  };

  const onDocumentCaptured = capture => {
    // if (selectedDocument.crop) {
    //   setCropDocument(capture);
    // }
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

  const checkIsNextStepDisabled = (document, index) => {
    return false;
    // if (document.id === 'SG') {
    //   if (
    //     Object.values(documents).every(
    //       item => item.id === 'SG' || item.passed === true,
    //     )
    //   ) {
    //     return false;
    //   }
    //   return true;
    // }
    // return Boolean(
    //   (index !== 0 && documents[index - 1].passed == null) || document.passed,
    // );
  };

  const handleCurrentModalStatus = (document, index) => {
    // if document is not Signature and its locked
    if (
      index !== 0 &&
      documents[index - 1].passed !== true &&
      documents[index - 1].passed !== 'loading' &&
      !document.passed
    ) {
      return (
        <Image
          resizeMode="contain"
          style={styles.moduleStatusIcon}
          source={lockIcon}
        />
      );
    } else if (document.passed === null) {
      return (
        <Image
          resizeMode="contain"
          style={styles.moduleStatusIcon}
          source={forwardArrow}
        />
      );
    } else if (document.passed === 'loading') {
      return (
        <ActivityIndicator style={{ marginLeft: width * 0.06 }} color="white" />
      );
    }

    return (
      <Image
        resizeMode="contain"
        style={styles.moduleStatusIcon}
        source={document.passed ? successIcon : failedIcon}
      />
    );
  };

  if (
    Platform.OS === 'android' &&
    permissions.camera !== 'granted' &&
    permissions.location !== 'granted'
  ) {
    return (
      <View
        style={[
          styles.container,
          { alignItems: 'center', paddingHorizontal: width * 0.07 },
        ]}
      >
        <StatusBar translucent backgroundColor="transparent" />
        <Text style={{ color: 'white', fontSize: 18 }}>
          Camera and Location permissions are not authorized
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (showSuccessScreen) {
    return (
      <DocumentSuccess
        document={selectedDocument}
        continueProcess={clearSelectedDocument}
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
      <StatusBar translucent backgroundColor="transparent" />
      <TopBar onLeftButtonPressed={goBack} leftButtonIcon={backArrow} />
      <Text style={styles.containerHeaderText}>Eksik Adımları Tamamla</Text>
      <View style={styles.modulesContainer}>
        {documents.map((document, index) => {
          return (
            <>
              <TouchableOpacity
                disabled={checkIsNextStepDisabled(document, index)}
                style={styles.moduleButton}
                key={document.id}
                onPress={() =>
                  document.id === 'SG'
                    ? setShowContract(true)
                    : setSelectedDocument(document)
                }
              >
                <View style={styles.moduleContainer}>
                  <View style={styles.moduleTitleContainer}>
                    <Text style={styles.moduleTitle}>{document.title}</Text>
                  </View>
                  <View style={styles.moduleStatusContainer}>
                    {handleCurrentModalStatus(document, index)}
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
            </>
          );
        })}
      </View>
      <PoweredBy />
    </ImageBackground>
  );
};

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
    width: '100%',
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

export default MainScreen;
