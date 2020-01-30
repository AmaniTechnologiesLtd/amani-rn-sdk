// Global dependencies
import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    TextInput,
    Alert,
    Image,
    SafeAreaView,
    StyleSheet,
    BackHandler,
    Platform,
    Dimensions
} from 'react-native'
import { WebView } from 'react-native-webview'

// Local files
import { content } from './View/html'
import { SignatureDraw } from '../SignatureDraw/SignatureDraw'

const { width, height } = Dimensions.get('window')

export const ContractScreen = props => {
    const { onContractDecline, currentDocument, customer } = props
    const [showContract, setShowContract] = useState(false)
    const [showSignatureScreen, setShowSignatureScreen] = useState(false)
    const [isContractApproved, setIsContractApproved] = useState(false)

    const [formData, setFormData] = useState({
        job: null,
        city: null,
        district: null,
        address: null,
    })

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
                onContractDecline()
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
        setShowSignatureScreen(true)
    }

    const customCheckboxView = () => {
        return (
            <TouchableOpacity onPress={() => setIsContractApproved(!isContractApproved)} style={styles.customCheckboxOutline}>
                {isContractApproved && (
                    <View style={styles.customCheckboxInline}>
                        <Image
                            source={require('../../../assets/checked.png')}
                            style={{height: height * 0.03}}
                            resizeMode="contain"
                        />
                    </View>
                )}
            </TouchableOpacity>
        )
    }

    const handleFormSubmit = async () => {
        for (const key in formData) {
            if (formData[key] === null) {
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
        setShowContract(true)
    }

    if (showSignatureScreen) {
        return (
            <SignatureDraw
                document={currentDocument}
                state={props.state}
                goBack={() => setShowSignatureScreen(false)}
                goBackToMainScreen={onContractDecline}
                customer={customer}
            />
        )
    }

    if (!showContract) {
        return (
            <SafeAreaView style={styles.contactFormContainer}>
                <StatusBar barStyle="dark-content" backgroundColor="white" />
                <View style={styles.topBar}>
                    <TouchableOpacity
                        style={styles.topBarLeft}
                        onPress={onContractDecline}
                        hitSlop={{ top: 25, left: 25, bottom: 25, right: 25 }}>
                        <Image
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            resizeMode="contain" source={require('../../../assets/back-arrow-black.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.contactFormTitle}> SÖZLEŞME FORMU </Text>
                    <View>
                        <View style={styles.contactFormView}>
                            <TextInput
                                style={styles.contactFormInput}
                                onChangeText={val => setFormData({...formData, job: val})}
                                placeholder="Meslek"
                                placeholderTextColor="gray"
                                value={formData.job}
                            />
                        </View>
                        <View style={styles.contactFormView}>
                            <TextInput
                                style={styles.contactFormInput}
                                onChangeText={val => setFormData({...formData, city: val})}
                                placeholder="İl"
                                placeholderTextColor="gray"
                                value={formData.city}
                            />
                        </View>
                        <View style={styles.contactFormView}>
                            <TextInput
                                style={styles.contactFormInput}
                                onChangeText={val => setFormData({...formData, district: val})}
                                placeholder="İlçe"
                                placeholderTextColor="gray"
                                value={formData.district}
                            />
                        </View>
                        <View style={styles.contactFormView}>
                            <TextInput
                                style={styles.multilineFormInput}
                                onChangeText={val => setFormData({...formData, address: val})}
                                placeholder="Adres"
                                placeholderTextColor="gray"
                                multiline
                                numberOfLines={Platform.OS === 'ios' ? null : 12}
                                minHeight={(Platform.OS === 'ios' && 12) ? (12 * 12) : null}
                                value={formData.address}
                            />
                        </View>
                        <View style={{alignItems: 'center'}}>
                        <TouchableOpacity onPress={handleFormSubmit} style={styles.contactFormButton}>
                            <Text style={{ color: 'white' }}>
                                Devam
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.topBar}>
                <TouchableOpacity
                    style={styles.topBarLeft}
                    onPress={onContractDecline}
                    hitSlop={{ top: 25, left: 25, bottom: 25, right: 25 }}>
                    <Image
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        resizeMode="contain" source={require('../../../assets/back-arrow-black.png')}
                    />
                </TouchableOpacity>
            </View>
            <WebView style={{marginTop: height * 0.025}} javaScriptEnabled source={{html: content}} />
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
        height: height * 0.05,
        paddingHorizontal: width * 0.035,
        borderWidth: 0.5,
        borderColor: '#212121',
        color: '#212121'
    },
    multilineFormInput: {
        width: width * 0.8,
        paddingHorizontal: width * 0.035,
        borderWidth: 0.5,
        textAlignVertical: 'top',
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
        borderRadius: 50,
        width: height * 0.035,
        height: height * 0.035,

    },
    customCheckboxInline: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topBar: {
        flexDirection: 'row',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        justifyContent: 'center',
        paddingVertical: 15,
    },
    topBarLeft: {
        position: 'absolute',
        left: 10,
        top: 15,
        width: width * 0.055,
        height: height * 0.03,
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
