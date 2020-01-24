// Global dependencies
import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    TextInput,
    Alert,
    SafeAreaView,
    StyleSheet,
    BackHandler,
    Dimensions
} from 'react-native'
import { WebView } from 'react-native-webview'

// Local files
import htmlView from './View/html'

const { width, height } = Dimensions.get('window')

const ContractScreen = props => {
    const { onContractDecline, onContractAccept, currentDocument, contractFormData } = props
    const [showContract, setShowContract] = useState(false)
    const [isContractApproved, setIsContractApproved] = useState(false)

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
                onContractDecline(false)
                return true
            }
        )
        return () => BackHandler.removeEventListener('hardwareBackPress')
    }, [])

    const handleContractProcess = async () => {
        if (!isContractApproved) {
            Alert.alert(
                '',
                'Sözleşmeyi kabul etmeden imzalama ekranına geçemezsiniz.',
                [
                    {
                        text: 'Anladım'
                    },
                ],
                {cancelable: false}
            )
            return
        }

        await onContractDecline(false)
        onContractAccept(currentDocument)
    }

    const customCheckboxView = () => {
        return (
            <TouchableOpacity onPress={() => setIsContractApproved(!isContractApproved)} style={styles.customCheckboxOutline}>
                {isContractApproved && (
                    <View style={styles.customCheckboxInline} />
                )}
            </TouchableOpacity>
        )
    }

    const handleFormSubmit = async data => {
        for (const key in data) {
            if (!data[key]) {
                Alert.alert(
                    '',
                    'Devam etmeden önce formu doldurmalısınız.',
                    [
                        {
                            text: 'Anladım'
                        },
                    ],
                    {cancelable: false}
                )
                return
            }
        }
        await contractFormData(data)
        setShowContract(true)
    }

    if (!showContract) {

        const formData = {
            job: null,
            city: null,
            district: null,
            address: null,
        }

        return (
            <View style={styles.contactFormContainer}>
                <StatusBar barStyle="dark-content" backgroundColor="white" />
                <Text style={styles.contactFormTitle}> SÖZLEŞME FORMU </Text>
                <View>
                    <View style={styles.contactFormView}>
                        <TextInput
                            style={styles.contactFormInput}
                            onChangeText={val => formData.job = val}
                            placeholder="Meslek"
                            placeholderTextColor="gray"
                            value={formData.job}
                        />
                    </View>
                    <View style={styles.contactFormView}>
                        <TextInput
                            style={styles.contactFormInput}
                            onChangeText={val => formData.city = val}
                            placeholder="İl"
                            placeholderTextColor="gray"
                            value={formData.job}
                        />
                    </View>
                    <View style={styles.contactFormView}>
                        <TextInput
                            style={styles.contactFormInput}
                            onChangeText={val => formData.district = val}
                            placeholder="İlçe"
                            placeholderTextColor="gray"
                            value={formData.job}
                        />
                    </View>
                    <View style={styles.contactFormView}>
                        <TextInput
                            style={styles.contactFormInput}
                            onChangeText={val => formData.address = val}
                            placeholder="Adres"
                            placeholderTextColor="gray"
                            value={formData.job}
                        />
                    </View>
                    <View style={{alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => handleFormSubmit(formData)} style={styles.contactFormButton}>
                        <Text style={{ color: 'white' }}>
                            Devam
                        </Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <WebView javaScriptEnabled source={{html: htmlView}} />
            <View style={styles.bottomBar}>
                <View style={styles.bottomBarButton}>
                <Text style={styles.bottomBarButtonText}> Onaylıyorum {' '}</Text>
                {customCheckboxView()}
                </View>
                <TouchableOpacity onPress={handleContractProcess} style={styles.bottomBarButton}>
                    <Text style={styles.bottomBarButtonText}> İmzala </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contactFormContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    contactFormView: {
        alignItems: 'center',
        padding: 10
    },
    contactFormTitle: {
        textAlign: 'center',
        fontSize: height * 0.04,
        padding: 20
    },
    contactFormInput: {
        width: width * 0.8,
        borderWidth: 0.5,
        borderColor: '#212121',
        color: '#212121'
    },
    contactFormButton: {
        backgroundColor:'#212121',
        height: height * 0.05,
        width: width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    customCheckboxOutline: {
        borderColor: 'white',
        borderWidth: 1,
        width: height * 0.035,
        height: height * 0.035,
        padding: 3,
    },
    customCheckboxInline: {
        backgroundColor: 'gray',
        height:'100%',
        width:'100%'
    },
    bottomBar: {
        flex: 0.06,
        backgroundColor: 'black',
        flexDirection: 'row'
    },
    bottomBarButton: {
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomBarButtonText: {
        color: 'white',
        textAlign: 'center',
    }
})

export default ContractScreen