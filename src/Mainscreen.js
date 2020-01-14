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
    BackHandler
} from 'react-native'

// Local files
import CaptureDocument from './components/CaptureDocument'
import api from './services/api'
import documentsReducer, { initialDocuments } from './store/documents'

const { width, height } = Dimensions.get('window')

const MainScreen = props => {
    const [availableDocuments, setAvailableDocuments] = useState(null)
    const [documents] = useReducer(documentsReducer, initialDocuments)
    const [selectedDocument, setSelectedDocument] = useState(null)
    const [files, setFiles] = useState([])

    const [cropDocument, setCropDocument] = useState(null)
    const [isStepsFinished, setIsStepsFinished] = useState(false)
    const [tokens, setTokens] = useState({ auth: null, sms: null, customer: null })

    const { onExit, onCreateCustomer } = props


    const goBack = async () => {
        const callbackData = []
        availableDocuments.forEach(element => {
            callbackData.push({
                 [element]: documents.find(document => document.id === element).passed
            })
        })
        onExit(callbackData)
    }

    useEffect(() => {
        if (!availableDocuments) {
            api.setBaseUrl(props.server ? props.server.toLowerCase() : 'tr')
            const authData = props.authData
            const customerInformations = props.customerInformations
            api.login({ email: authData.appKey, password: authData.appPassword }).then((fRes) => {
                api.smsVerification({ code: 111111, access_hash: fRes.data.access_hash }).then((sRes) => {
                    const formData = {
                        customerData: customerInformations,
                        smsToken: sRes.data.token
                    }
                    api.createCustomer(formData).then(async (tRes) => {
                        setTokens({ auth: fRes.data.access_hash, sms: sRes.data.token, customer: tRes.data.token })
                        setAvailableDocuments(sRes.data.available_documents)
                        onCreateCustomer({ id: tRes.data.id })
                    })
                })
            })
            return
        }

        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            goBack()
        })

        return () => backHandler.remove()
    }, [availableDocuments])

    useEffect(() => {
            if (isStepsFinished) handleSendDocumentsRequest()
            setIsStepsFinished(false)
    }, [isStepsFinished])

    const handleSendDocumentsRequest = async () => {
        selectedDocument.passed = 'loading'
        if (!cropDocument) setSelectedDocument(null)

        const requestData = new FormData()
        requestData.append('type', selectedDocument.id)
        requestData.append('customer_token', tokens.customer)
        files.map((x) => {
            requestData.append('files[]', x)
            return true
        })

        await api.sendDocument(tokens.sms, requestData)
            .then(res => {
                selectedDocument.passed = true
                // console.log(res)
            })
            .catch(error => {
                selectedDocument.passed = false
                // console.log(error.response)
            })

        if (cropDocument) {
            setSelectedDocument(null)
            setCropDocument(null)
        }

        setFiles([])
    }

    const handleCurrentModalStatus = isPassed => {
        if (isPassed === 'loading') return <ActivityIndicator style={{ marginLeft: width * 0.06 }} color="white" />
        return (
            <Image
                resizeMode="contain"
                style={styles.moduleStatusIcon}
                source={isPassed ? require('../assets/success.png') : require('../assets/failed.png')}
            />
        )
    }

    const documentCaptured = (capture) => {
        if (selectedDocument.crop) setCropDocument(capture)
        setFiles([...files, capture])
    }

    if (!availableDocuments) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color="white" />
            </View>
        )
    }

    if (selectedDocument) {
        return (
            <CaptureDocument
                document={selectedDocument}
                onCapture={documentCaptured}
                onClearDocument={setSelectedDocument}
                onStepsFinished={setIsStepsFinished}
            />
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <Text style={{color: 'white', padding: 20, fontSize: width * 0.07}}> Select a Document Type</Text>

            <View style={styles.modulesContainer}>
                {documents.map((document) => {
                    if (availableDocuments.includes(document.id)) {
                        return (
                            <TouchableOpacity
                                style={styles.moduleButton}
                                key={document.id}
                                onPress={() => setSelectedDocument(document)}
                            >
                                <View style={styles.moduleContainer}>
                                    <View style={styles.moduleTitleContainer}>
                                        <Text style={styles.moduleTitle}>{document.title}</Text>
                                    </View>
                                    <View style={styles.moduleStatusContainer}>
                                        {document.passed !== null &&
                                            handleCurrentModalStatus(document.passed)
                                        }
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                })}
            </View>
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
        height: height * 0.03
    }
})

export default MainScreen
