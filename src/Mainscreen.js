// Global dependencies
import React, {useState, useEffect, useReducer} from 'react';
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
import {CaptureDocument} from './components/CaptureDocument';
import {ContractScreen} from './components/SmartContract/ContractScreen';
import {Loading} from './components/Loading';
import {PoweredBy} from './components/PoweredBy';
import {initialDocuments, documentsReducer} from './store/documents';
import api from './services/api';
import blueBackground from '../assets/btn-blue.png';
import orangeBackground from '../assets/btn-orange.png';
import mainBackground from '../assets/main-bg.png';
import forwardArrow from '../assets/forward-arrow.png';
import lockIcon from '../assets/locked-icon.png';
import successIcon from '../assets/success.png';
import failedIcon from '../assets/failed.png';

const {width, height} = Dimensions.get('window');

export const MainScreen = props => {
  const {onError, onExit} = props;
  const [documents, dispatch] = useReducer(documentsReducer, initialDocuments);

  const [isLoading, setIsLoading] = useState(true);
  const [missingRules, setMissingRules] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedDocumentVersion, setSelectedDocumentVersion] = useState(null);
  const [setCropDocument] = useState(null);
  const [showContract, setShowContract] = useState(false);
  const [corners, setCorners] = useState([]);
  const [files, setFiles] = useState([]);
  const [isStepsFinished, setIsStepsFinished] = useState(false);
  const [customer, setCustomer] = useState({
    access: null,
    id: null,
    data: null,
  });
  const [permissions, setPermission] = useState({camera: null, location: null});
  const [location, setLocation] = useState(null);

  const [controllerButton, setControllerButton] = useState({
    text: 'Geri Dön',
    backgroundColor: 'transparent',
    color: 'white',
  });

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
      {cancelable: false},
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
    if (Object.values(documents).every(item => item.passed === true)) {
      setControllerButton({
        text: 'Doğrulamayı Bitir',
        backgroundColor: '#00e676',
        color: '#212121',
      });
    }

    if (isLoading) {
      api.setBaseUrl(props.server ? props.server.toLowerCase() : 'tr');
      const authData = props.authData;
      const customerInformations = props.customerInformations;
      api
        .login({email: authData.appKey, password: authData.appPassword})
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
                id: sRes.data.token,
                data: customerInformations,
              });
              await dispatch({
                type: 'FILTER_DOCUMENTS',
                document_types: fRes.data.available_documents,
              });
              let rules = [];
              await sRes.data.missing_rules.map(rule => {
                rules = rules.concat(rule.document_classes);
              });
              setMissingRules(rules);
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
    if (missingRules) {
      documents.map(doc => {
        if (!missingRules.includes(doc.id)) {
          dispatch({
            type: 'CHANGE_STATUS',
            document_id: doc.id,
            passed: true,
          });
        }
      });
      setIsLoading(false);
    }
  }, [documents, missingRules]);

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

    setSelectedDocument(null);

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
    requestData.append('customer_token', customer.id);
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

    setCropDocument(null);
    setFiles([]);
    setCorners([]);

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

  const onDocumentCaptured = capture => {
    if (selectedDocument.crop) {
      setCropDocument(capture);
    }
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
    if (document.id === 'SG') {
      if (
        Object.values(documents).every(
          item => item.id === 'SG' || item.passed === true,
        )
      ) {
        return false;
      }
      return true;
    }
    return Boolean(
      (index !== 0 && documents[index - 1].passed == null) || document.passed,
    );
  };

  const handleCurrentModalStatus = (document, index) => {
    // If document is Signature and other documents are not succeed yet
    if (
      document.id === 'SG' &&
      !Object.values(documents).every(
        item => item.id === 'SG' || item.passed === true,
      )
    ) {
      return (
        <Image
          resizeMode="contain"
          style={styles.moduleStatusIcon}
          source={lockIcon}
        />
      );
    }
    // if document is not Signature and its locked
    else if (
      index !== 0 &&
      documents[index - 1].passed !== true &&
      documents[index - 1].passed !== 'loading' &&
      !document.passed &&
      document.id !== 'SG'
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
        <ActivityIndicator style={{marginLeft: width * 0.06}} color="white" />
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
          {alignItems: 'center', paddingHorizontal: width * 0.07},
        ]}>
        <StatusBar translucent backgroundColor="transparent" />
        <Text style={{color: 'white', fontSize: 18}}>
          Camera and Location permissions are not authorized
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return <Loading />;
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
        state={[documents, dispatch]}
        customer={customer}
      />
    );
  }

  return (
    <ImageBackground source={mainBackground} style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Text style={styles.containerHeaderText}>
        Yüklemek İçin Bir Doküman Seç
      </Text>

      <View style={styles.modulesContainer}>
        {documents.map((document, index) => {
          return (
            <TouchableOpacity
              disabled={checkIsNextStepDisabled(document, index)}
              style={styles.moduleButton}
              key={document.id}
              onPress={() =>
                document.id === 'SG'
                  ? setShowContract(true)
                  : setSelectedDocument(document)
              }>
              <ImageBackground
                source={blueBackground}
                style={styles.buttonBackground}>
                <View style={styles.moduleContainer}>
                  <View style={styles.moduleTitleContainer}>
                    <Text style={styles.moduleTitle}>{document.title}</Text>
                  </View>
                  <View style={styles.moduleStatusContainer}>
                    {handleCurrentModalStatus(document, index)}
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity onPress={goBack} style={styles.controllerButton}>
        <ImageBackground
          source={orangeBackground}
          style={styles.controllerBackground}>
          <Text style={{color: controllerButton.color}}>
            {controllerButton.text}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
      <PoweredBy />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  containerHeaderText: {
    color: 'white',
    fontSize: width * 0.06,
    marginBottom: 20,
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
    backgroundColor: 'green',
    justifyContent: 'center',
    marginBottom: height * 0.02,
    overflow: 'hidden',
    borderRadius: 10,
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
  controllerButton: {
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: 'green',
    flexDirection: 'row',
  },
  controllerBackground: {
    flex: 1,
    padding: 20,
    resizeMode: 'cover',
    alignItems: 'center',
  },
});

export default MainScreen;
