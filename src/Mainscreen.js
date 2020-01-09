// Global dependencies
import React, { useState, useEffect, useReducer } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions, StyleSheet, Image, StatusBar } from 'react-native'
import AmazingCropper from 'react-native-amazing-cropper'
import RNFS from 'react-native-fs'

// Local files
import CaptureDocument from './components/CaptureDocument'
import api from './services/api'
import documentsReducer, { initialDocuments } from './store/documents'

const { width, height } = Dimensions.get('window')

const MainScreen = (props) => {
    const [availableDocuments, setAvailableDocuments] = useState(null)
    const [documents] = useReducer(documentsReducer, initialDocuments)
    const [selectedDocument, setSelectedDocument] = useState(null)
    const [files, setFiles] = useState([])

    const [cropDocument, setCropDocument] = useState(null)
    const [isStepsFinished, setIsStepsFinished] = useState(false)
    const [tokens, setTokens] = useState({ auth: null, sms: null, customer: null })

    useEffect(
        () => {
            if (isStepsFinished) handleSendDocumentsRequest()
            setIsStepsFinished(false)
        },
        [isStepsFinished]
    )

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
                })
            })
        })
    }

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

    const onDone = async (croppedImageUri) => {
        const src = await RNFS.readFile(croppedImageUri, 'base64')
        setFiles([`data:image/jpeg;base64,${src}`])
        setIsStepsFinished(true)
    }

    if (!availableDocuments) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color="black" />
            </View>
        )
    }

    if (cropDocument) {
        return (
            <AmazingCropper
                onDone={onDone}
                onCancel={() => setCropDocument(null)}
                imageUri={cropDocument.uri}
                imageWidth={cropDocument.width}
                imageHeight={cropDocument.height}
                NOT_SELECTED_AREA_OPACITY={0.45}
                BORDER_WIDTH={20}
            />
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
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        borderRadius: 15,
        marginHorizontal: width * 0.03,
        marginVertical: height * 0.0035,
        backgroundColor: '#212121'
    },
    moduleTitleContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    moduleTitle: {
        color: '#eee',
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
