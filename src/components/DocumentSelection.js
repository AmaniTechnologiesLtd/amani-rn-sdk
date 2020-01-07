import React, { useEffect, useState, useReducer } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import documentsReducer, { initialDocuments } from '../store/documents'
import api from '../services/api'
import AmazingCropper from 'react-native-amazing-cropper'
import RNFS from 'react-native-fs'
import CaptureDocument from './CaptureDocument'

const DocumentSelection = props => {
    const [availableDocuments, setAvailableDocuments] = useState(null)
    const [documents] = useReducer(documentsReducer, initialDocuments)
    const [selectedDocument, setSelectedDocument] = useState(null)
    const [files, setFiles] = useState([])
    const [cropDocument, setCropDocument] = useState(null)
    const [tokens, setTokens] = useState({ auth: null, sms: null, customer: null })

    if (!availableDocuments) {
        api.login({ email: 'admin@amani.tech', password: 'pu4rguUo' }).then(fRes => {
            api.smsVerification({ code: 111111, access_hash: fRes.data.access_hash })
                .then(sRes => {
                    const formData = {
                        customerData: {
                            name: 'test',
                            email: 'test@mail.com',
                            phone: '+9055555',
                        },
                        smsToken: sRes.data.token,
                    }
                    api.createCustomer(formData).then(async tRes => {
                        setTokens({ auth: fRes.data.access_hash, sms: sRes.data.token, customer: tRes.data.token })
                        setAvailableDocuments(sRes.data.available_documents)
                    })
                })
        })
    }

    const handleSendDocumentsRequest = async () => {
        const requestData = new FormData()

        requestData.append('type', selectedDocument.id)
        requestData.append('customer_token', tokens.customer)

        files.map(x => {
            requestData.append('files[]', x)
            return true
        })

        await api
            .sendDocument(tokens.sms, requestData)
            .then(res => {
                // console.log(res)
            })
            .catch(error => {
                // console.log(error.response)
            })
    }

    const stepsFinished = async () => {
        await handleSendDocumentsRequest()
        setFiles([])
        setSelectedDocument(null);
    }

    if (!availableDocuments) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator color="black" />
            </View>
        )
    }

    const  onDone = async croppedImageUri => {
        const test = await RNFS.readFile(croppedImageUri, 'base64')
        console.log(`data:image/jpeg;base64,${test}`)
    }

    const onCancel = () => {
        setCropDocument(null);
    }

    if (cropDocument) {
        return (
            <AmazingCropper
            onDone={onDone}
            onCancel={onCancel}
            imageUri={cropDocument.uri}
            imageWidth={cropDocument.width}
            imageHeight={cropDocument.height}
            NOT_SELECTED_AREA_OPACITY={0.45}
            BORDER_WIDTH={20}
            />
        );
      }

    const documentCaptured = capture => {
        if (selectedDocument.crop) {
            setCropDocument(capture);
        } else {
          console.log('Upload Document');
        }
        setFiles([...files, capture])
      };

    const croppedData = (image, coordinates) => {
        console.log(image, coordinates)
    }

    if (selectedDocument) {
        return (
            <CaptureDocument
                document={selectedDocument}
                onCapture={documentCaptured}
                onClearDocument={setSelectedDocument}
                onStepsFinished={stepsFinished}
            />
        )
    }


    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {documents.map(document => {
                if ( availableDocuments.includes(document.id) && document.id !== 'SE' ) {
                    return (
                        <TouchableOpacity
                            style={{
                                padding: 15,
                                borderRadius: 15,
                                margin: 7,
                                backgroundColor: '#212121',
                            }}
                            key={document.id}
                            onPress={() => setSelectedDocument(document)}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                }}>
                                <View
                                    style={{
                                        width: '90%',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <Text
                                        style={{
                                            color: '#eee',
                                            width: '100%',
                                        }}>
                                        {document.title}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        width: '10%',
                                        justifyContent: 'center',
                                    }}>
                                    <Text> Icons </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }
            })
        }
        <TouchableOpacity
                            style={{
                                padding: 15,
                                borderRadius: 15,
                                margin: 7,
                                backgroundColor: '#212121',
                            }}
                            key={documents[6].id}
                            onPress={() => setSelectedDocument(documents[6])}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                }}>
                                <View
                                    style={{
                                        width: '90%',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <Text
                                        style={{
                                            color: '#eee',
                                            width: '100%',
                                        }}>
                                        {documents[6].title}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        width: '10%',
                                        justifyContent: 'center',
                                    }}>
                                    <Text> Icons </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    touchableBar: {
      padding: 15,
      borderRadius: 15,
      margin: 7,
      backgroundColor: '#212121',
    },
  })

export default DocumentSelection