import React, { useEffect, useState, useReducer } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import documentsReducer, { initialDocuments } from '../store/documents'
import api from '../services/api'

const DocumentSelection = props => {

    const [availableDocuments, setAvailableDocuments] = useState(null)
    const [documents] = useReducer(documentsReducer, initialDocuments)
    let accessToken

    if (!availableDocuments) {
        api.login({ email: 'admin@amani.tech', password: 'pu4rguUo' }).then(fRes => {
            accessToken = fRes.data.access_hash
            api.smsVerification({ code: 111111, access_hash: accessToken })
                .then(sRes => {
                    setAvailableDocuments(sRes.data.available_documents)
                })
        })
    }

    useEffect(() => {
        if(availableDocuments) console.log(availableDocuments)
    }, [ availableDocuments ])

    if (!availableDocuments) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator color="black" />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {documents.map(document => {
                if ( availableDocuments.includes(document.id) && document.id !== 'SE' ) {
                    return (
                        <TouchableOpacity
                            key={document.id}
                            onPress={() => console.log('asd')}>
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
                                            color: '#212121',
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
        </View>
    )
}

export default DocumentSelection