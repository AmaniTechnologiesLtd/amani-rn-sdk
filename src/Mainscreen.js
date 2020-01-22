// Global dependencies
import React, { useState, useEffect, useReducer } from 'react'
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
} from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import DeviceInfo from 'react-native-device-info'

// Local files
import CaptureDocument from './components/CaptureDocument'
import PoweredBy from './components/PoweredBy'
import api from './services/api'
import documentsReducer, { initialDocuments } from './store/documents'
import ContractScreen from 'amani-rn-sdk/src/components/SmartContract/ContractScreen';

const { width, height } = Dimensions.get('window')

const MainScreen = props => {
    const [documents] = useReducer(documentsReducer, initialDocuments)

    const [availableDocuments, setAvailableDocuments] = useState([])
    const [selectedDocument, setSelectedDocument] = useState(null)
    const [cropDocument, setCropDocument] = useState(null)
    const [showContract, setShowContract] = useState(false)
    const [corners, setCorners] = useState([])
    const [files, setFiles] = useState([])
    const [isStepsFinished, setIsStepsFinished] = useState(false)
    const [tokens, setTokens] = useState({ auth: null, sms: null, customer: null })
    const [permissions, setPermission] = useState({camera: null, location: null})
    const [location, setLocation] = useState({latitude: null, longitude: null})

    const { onCreateCustomer, onError, onExit } = props

    const checkPermissions = async () => {
        setPermission({
            camera: await PermissionsAndroid.request('android.permission.CAMERA'),
            location: await PermissionsAndroid.request('android.permission.ACCESS_FINE_LOCATION')
        })
    }

    if (Platform.OS === 'android' && !permissions.camera && !permissions.location) checkPermissions()

    const goBack = async () => {
        const callbackData = []
        availableDocuments.forEach(element => {
            callbackData.push({
                 [element.id]: documents.find(document => document.id === element.id).passed
            })
        })
        onExit(callbackData)
    }

    const errorHandler = (e) => {
        Alert.alert(
            'Something went wrong',
            e.response.data.errors[0].ERROR_MESSAGE,
            [
                {
                  text: 'OK',
                  onPress: () => onError(e.response.data.errors[0])
                },
            ],
            {cancelable: false}
        )
    }

    useEffect(() => {
        if (availableDocuments.length === 0) {
            api.setBaseUrl(props.server ? props.server.toLowerCase() : 'tr')
            const authData = props.authData
            const customerInformations = props.customerInformations
            api.login({ email: authData.appKey, password: authData.appPassword }).then((fRes) => {
                api.smsVerification({ code: 111111, access_hash: fRes.data.access_hash }).then((sRes) => {
                    // If already a customer get token
                    if (customerInformations.id) {
                        api.getCustomer(customerInformations.id, sRes.data.token).then(async (tRes) => {
                            setTokens({ auth: fRes.data.access_hash, sms: sRes.data.token, customer: tRes.data.token })
                            documents.map(doc => {
                                if (sRes.data.available_documents.includes(doc.id)) {
                                    setAvailableDocuments(oldDoc => [...oldDoc, doc])
                                }
                            })
                        }).catch(error => errorHandler(error))
                        return
                    }

                    const formData = {
                        customerData: customerInformations,
                        smsToken: sRes.data.token
                    }
                    api.createCustomer(formData).then(async (tRes) => {
                        setTokens({ auth: fRes.data.access_hash, sms: sRes.data.token, customer: tRes.data.token })
                        documents.map(doc => {
                            if (sRes.data.available_documents.includes(doc.id)) {
                                setAvailableDocuments(oldDoc => [...oldDoc, doc])
                            }
                        })
                        onCreateCustomer({ id: tRes.data.id })
                    }).catch(error => errorHandler(error))
                }).catch(error => errorHandler(error))
            }).catch(error => errorHandler(error))
        }

        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            goBack()
        })

        return () => backHandler.remove()
    }, [availableDocuments])

    useEffect(() => {
        if (permissions.location === 'granted' || Platform.OS === 'ios') {
            Geolocation.getCurrentPosition(position => setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude }))
        }
        if (isStepsFinished) handleSendDocumentsRequest()
        setIsStepsFinished(false)
    }, [isStepsFinished, location])

    const handleSendDocumentsRequest = async () => {
        selectedDocument.passed = 'loading'
        setSelectedDocument(null)

        const deviceData = {
            id: DeviceInfo.getUniqueId(),
            os: Platform.OS,
            model: DeviceInfo.getModel(),
            gsm: await DeviceInfo.getCarrier()
        }

        const requestData = new FormData()

        requestData.append('type', selectedDocument.id)
        requestData.append('customer_token', tokens.customer)
        requestData.append('device_data', JSON.stringify(deviceData))
        requestData.append('location', JSON.stringify(location))

        if (corners) {
          corners.forEach(corner => requestData.append('corners[]', JSON.stringify(corner)))
        }

        files.forEach(file => requestData.append('files[]', file))

        await api.sendDocument(tokens.sms, requestData)
            .then(res => {
                if (res.data.status === 'OK') {
                    selectedDocument.passed = true
                } else {
                    selectedDocument.passed = false
                }
            })
            .catch(error => {
                selectedDocument.passed = false
            })

        setCropDocument(null)
        setFiles([])
        setCorners([])
    }

    const onDocumentCaptured = (capture) => {
        if (selectedDocument.crop) setCropDocument(capture)
        setFiles([...files, capture])
    }

    const onDocumentCrop = cropData => {
        setCorners([...corners, cropData])
    }

    const handleCurrentModalStatus = (isPassed, isLocked) => {

        if (isLocked) {
            return (
                <Image
                    resizeMode="contain"
                    style={styles.moduleStatusIcon}
                    source={require('../assets/locked-icon.png')}
                />
            )
        }

        else if (isPassed === null) return

        else if (isPassed === 'loading') return <ActivityIndicator style={{ marginLeft: width * 0.06 }} color="white" />

        return (
            <Image
                resizeMode="contain"
                style={styles.moduleStatusIcon}
                source={isPassed ? require('../assets/success.png') : require('../assets/failed.png')}
            />
        )

    }

    if (Platform.OS === 'android' && permissions.camera !== 'granted' && permissions.location !== 'granted') {
        return (
            <View style={[styles.container, { alignItems: 'center', paddingHorizontal: width * 0.07 }]}>
                <StatusBar barStyle="light-content" backgroundColor="black" />
                <Text style={{ color: 'white', fontSize: 18 }}> Camera and Location permissions are not authorized </Text>
            </View>
        )
    }

    if (availableDocuments.length === 0) {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="black" />
                <ActivityIndicator color="white" />
            </View>
        )
    }

    if (selectedDocument) {
        return (
            <CaptureDocument
                onCapture={onDocumentCaptured}
                document={selectedDocument}
                onManualCropCorners={onDocumentCrop}
                onClearDocument={setSelectedDocument}
                onStepsFinished={setIsStepsFinished}
            />
        )
    }

    if (showContract) {
        return (
            <ContractScreen
                onContractDecline={setShowContract}
                currentDocument={documents.find(document => document.id === 'SG')}
                onContractAccept={setSelectedDocument}
            />
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <Text style={{color: 'white', padding: 20, fontSize: width * 0.07}}> Doküman Seçim Ekranı </Text>

            <View style={styles.modulesContainer}>
                {availableDocuments.map((document, index) => {
                    return (
                        <TouchableOpacity
                            disabled={ (index !== 0 && availableDocuments[index -1].passed == null) || document.passed }
                            style={ (index !== 0 && availableDocuments[index -1].passed == null) || document.passed ? styles.disabledModuleButton : styles.moduleButton }
                            key={document.id}
                            onPress={() => document.id === 'SG' ? setShowContract(true) : setSelectedDocument(document)}
                        >
                            <View style={styles.moduleContainer}>
                                <View style={styles.moduleTitleContainer}>
                                    <Text style={styles.moduleTitle}>{document.title}</Text>
                                </View>
                                <View style={styles.moduleStatusContainer}>
                                    {handleCurrentModalStatus(document.passed, index !== 0 && availableDocuments[index -1].passed == null)}
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <PoweredBy />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
    },
    modulesContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    moduleContainer: {
        flexDirection: 'row',
        width: '100%'
    },
    moduleButton: {
        height: height * 0.055,
        paddingHorizontal: 20,
        justifyContent: 'center',
        marginHorizontal: width * 0.03,
        marginBottom: height * 0.002,
        backgroundColor: '#212121'
    },
    disabledModuleButton: {
        height: height * 0.055,
        paddingHorizontal: 20,
        justifyContent: 'center',
        marginHorizontal: width * 0.03,
        marginBottom: height * 0.002,
        backgroundColor: 'transparent'
    },
    moduleTitleContainer: {
        width: '90%',
        justifyContent: 'center',
    },
    moduleTitle: {
        color: '#eee',
        fontSize: width * 0.04,
        width: '100%'
    },
    moduleStatusContainer: {
        width: '10%',
        justifyContent: 'center'
    },
    moduleStatusIcon: {
        width: width * 0.15,
        height: height * 0.025
    }
})

export default MainScreen
