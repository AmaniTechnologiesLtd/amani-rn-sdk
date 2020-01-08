// Global dependencies
import React, { useState, useEffect, useRef } from 'react'
import {
    StyleSheet,
    StatusBar,
    BackHandler,
    Dimensions,
    Text,
    View,
    Image,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
import ImageEditor from '@react-native-community/image-editor'
import { RNCamera } from 'react-native-camera'
import RNFS from 'react-native-fs'

// Local files
import SelfieMask from './SelfieMask'
import backArrow from '../../assets/back-arrow.png'

const { width, height } = Dimensions.get('window')

export default function CaptureDocument(props) {
    const {
        document,
        document: { steps, aspectRatio, cameraFacing }
    } = props
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [cameraType] = useState(
        cameraFacing === 'environment' ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front
    )
    const [previewArea, setPreviewArea] = useState({
        previewAreaX: null,
        previewAreaY: null,
        previewAreaWidth: null,
        previewAreaHeight: null,
    })
    const camera = useRef(null)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                goBack()
                return true
            }
        )

        return () => {
            backHandler.remove()
        }
    }, [])

    const takePicture = async () => {
        setButtonDisabled(true)
        const {
            document: { autoCrop },
            onCapture,
        } = props

        let image = await camera.current.takePictureAsync({
            quality: 0.7,
            orientation: 'portrait',
            base64: true,
            width: 1080,
            fixOrientation: true
        }).then(async data => {
            if (document.crop) {
                setButtonDisabled(false)
                image = data
            } else {
                image = `data:image/jpeg;base64,${data.base64}`
                if (autoCrop) image = await cropImage(data)
            }
            onCapture(image)
            calculateNextStep()
        })
    }

    const calculateNextStep = () => {
        const { onStepsFinished } = props
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
            setButtonDisabled(false)
        } else if (!document.crop) {
            onStepsFinished(true)
        }
    }

    const cropImage = async data => {
        const ratio = width / data.width
        const cropData = {
            offset: {
                x: previewArea.previewAreaX * ratio,
                y: previewArea.previewAreaY,
            },
            size: {
                height: 1080,
                width: 1080,
            },
        }

        const src = await ImageEditor.cropImage(data.uri, cropData).then(
            async path => await RNFS.readFile(path, 'base64')
        )

        return `data:image/jpeg;base64,${src}`
    }

    const goBack = async () => {
        const { onClearDocument } = props
        onClearDocument(null)
    }

    const setPreviewPosition = event => {
        setPreviewArea({
            previewAreaWidth: width,
            previewAreaHeight: width * 0.63 + 50,
            previewAreaX: event.nativeEvent.layout.x,
            previewAreaY: event.nativeEvent.layout.y,
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <RNCamera
                ref={camera}
                style={styles.preview}
                type={cameraType}
                captureAudio={false}
                ratio="16:9">
                <View style={{ backgroundColor: document.id !== 'UB' && document.id !== 'SG' ? 'rgba(0,0,0,0.70)' : 'transparent' }}>
                    <View style={styles.topBar}>
                        <TouchableOpacity
                            style={{ marginHorizontal: 20 }}
                            onPress={() => goBack()}>
                            <Image style={styles.backArrow} resizeMode="contain" source={backArrow} />
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={styles.topBarText}>{document.title}</Text>
                    </View>
                </View>

                <View style={[styles.topArea, { backgroundColor: document.id !== 'UB' && document.id !== 'SG' ? 'rgba(0,0,0,0.70)' : 'transparent' }]}>
                    {steps.length > 1 && (
                        <Text style={styles.topText}>
                            {steps[currentStep].title}
                        </Text>
                    )}
                </View>
                {aspectRatio && (
                    <View
                        style={{ flexDirection: 'row' }}
                        onLayout={setPreviewPosition}>
                        <View style={styles.backDrop} />
                        <View
                            style={[
                                styles.previewMiddle,
                                {
                                    width: width * 0.85,
                                    paddingTop: width * 0.85 * aspectRatio,
                                },
                            ]}
                        />
                        <View style={styles.backDrop} />
                    </View>
                )}
                {document.id === 'SE' && (
                    <View
                        style={{ flexDirection: 'row' }}
                        onLayout={setPreviewPosition}>
                        <View style={styles.backDrop} />
                        <View style={styles.selfieContainer}>
                            <SelfieMask />
                        </View>
                        <View style={styles.backDrop} />
                    </View>
                )}
                <View style={[styles.topArea, { backgroundColor: document.id !== 'UB' && document.id !== 'SG' ? 'rgba(0,0,0,0.70)' : 'transparent' }]}>
                    <Text style={styles.bottomText}>
                        {steps[currentStep].description}
                    </Text>
                </View>
                <View style={[styles.topArea, { backgroundColor: document.id !== 'UB' && document.id !== 'SG' ? 'rgba(0,0,0,0.70)' : 'transparent' }]}>
                    {buttonDisabled ? (<ActivityIndicator style={styles.buttonLoader} color="white" />) :
                        (
                            <TouchableOpacity
                                style={styles.takePhotoButton}
                                disabled={buttonDisabled}
                                onPress={() => takePicture()} />
                        )}
                </View>
                <View style={[styles.poweredBy, { backgroundColor: document.id !== 'UB' && document.id !== 'SG' ? 'rgba(0,0,0,0.70)' : 'transparent' }]}>
                    <Text style={{ color: 'white' }}>Powered By Amani</Text>
                </View>
            </RNCamera>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    preview: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 2,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topBarText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
    },
    topArea: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    bottomText: {
        color: 'white',
        fontSize: 16,
        paddingHorizontal: '7%',
        textAlign: 'center',
    },
    takePhotoButton: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 50,
        paddingHorizontal: width * 0.06,
        paddingVertical: height * 0.03,
        marginBottom: height * 0.007
    },
    buttonLoader: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        marginBottom: height * 0.025
    },
    backArrow: {
        width: width * 0.035,
        height: height * 0.1,
        marginTop: -(height * 0.015)
    },
    previewMiddle: {
        borderColor: 'white',
        borderWidth: 2,
    },
    selfieContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    poweredBy: {
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    backDrop: {
        backgroundColor: 'rgba(0,0,0,0.70)',
        flex: 1,
    }
})