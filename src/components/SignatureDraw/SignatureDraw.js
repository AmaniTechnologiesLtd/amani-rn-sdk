// Global dependencies
import React, { useState, useEffect } from 'react'
import {
    View,
    SafeAreaView,
    StatusBar,
    Image,
    TouchableOpacity,
    Text,
    Alert,
    StyleSheet,
    BackHandler
} from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import DeviceInfo from 'react-native-device-info'

// Local files
import SignatureScreen from './index'
import { Loading } from '../Loading'
import api from '../../services/api'


export const SignatureDraw = props => {
    const { document, isSignatureScreenOn, customer, backToContractForm } = props
    const [location, setLocation] = useState(null)
    const [signature, setSignature] = useState(null)
    const [currentStep, setCurrentStep] = useState(0)
    const [isProcessStarted, setIsProcessStarted] = useState(null)

    useEffect(() => {
        const getLocation = async () => {
            await Geolocation.getCurrentPosition(position => setLocation(position.coords))
        }
        getLocation()

        BackHandler.addEventListener('hardwareBackPress', () => {
            backToContractForm(!true)
            return true
        })
        return () => BackHandler.removeEventListener('hardwareBackPress')
    }, [])

    useEffect(() => {
        if (location && signature) handleSignatureMatch()
    }, [location, signature])

    const handleSignatureSteps = res => {
        if (res.data.status === 'OK') {
            if (currentStep < document.steps.length - 1) {
                setCurrentStep(currentStep + 1)
                setIsProcessStarted(false)
                return
            }
            isSignatureScreenOn(false)
        } else {
            setIsProcessStarted(false)
            Alert.alert(
                '',
                'İmzanızı ne yazık ki eşleştiremedik. Lütfen tekrar deneyin.',
                [
                    { text: 'Tamam' },
                ],
                {cancelable: false}
            )
        }
    }

    const handleSignatureMatch = async () => {
        const deviceData = {
            id: DeviceInfo.getUniqueId(),
            os: Platform.OS,
            model: DeviceInfo.getModel(),
            gsm: await DeviceInfo.getCarrier()
        }

        const requestData = new FormData()

        requestData.append('type', document.id)
        requestData.append('customer_token', customer.id)
        requestData.append('device_data', JSON.stringify(deviceData))
        requestData.append('location', JSON.stringify(location))
        requestData.append('files[]', signature)

        await api.sendDocument(customer.access, requestData)
            .then(res => {
                handleSignatureSteps(res)
            })
            .catch(error => {
                // console.log(error)
            })
    }

    const handleSignature = signature => {
        setSignature(signature)
        setIsProcessStarted(true)
    }

    const handleEmptySignature = () => {
        Alert.alert(
            'Warning',
            'Please make sure your signature is drawn.',
            [
              {text: 'OK'},
            ],
            {cancelable: true}
        )
    }

    if (isProcessStarted) return <Loading />

    return (
        <View style={styles.signatureContainer}>
            <StatusBar hidden />
            <SafeAreaView style={styles.topBar}>
                <TouchableOpacity
                    style={styles.topBarLeft}
                    onPress={() => backToContractForm(!true)}
                    hitSlop={{ top: 25, left: 25, bottom: 25, right: 25 }}>
                        <Image
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            resizeMode="contain" source={require('../../../assets/back-arrow.png')}
                        />
                </TouchableOpacity>
                <Text style={styles.topBarTitle}>{document.steps[currentStep].title} {document.steps[currentStep].description}</Text>
            </SafeAreaView>
            <View style={{ flex: 1 }}>
                <SignatureScreen
                    onOK={handleSignature}
                    onEmpty={handleEmptySignature}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    signatureContainer: {
        flex: 1,
        backgroundColor: 'black'
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
        width: 30,
        height: 20,
    },
    topBarTitle: { color: 'white', fontSize: 16 }
})
