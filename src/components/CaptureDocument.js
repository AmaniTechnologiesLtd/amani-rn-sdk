// Global dependencies
import React, { useState, useEffect, useRef } from 'react'
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    Image,
    Alert,
    BackHandler,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import { RNCamera } from 'react-native-camera'
import RNFS from 'react-native-fs'
import ImageEditor from '@react-native-community/image-editor'
import DocumentPicker from 'react-native-document-picker'

// Local files
import SelfieMask from './SelfieMask'
import SignatureDraw from './SignatureDraw'
import ImageCropper from './ImageCropper'

const { width, height } = Dimensions.get('window')

export default function CaptureDocument(props) {

    const {
        document,
        document: { steps, aspectRatio, cameraFacing, autoCrop },
        onCapture,
        onManualCropCorners
    } = props

    const [cameraType] = useState(
        cameraFacing === 'environment' ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front
    )

    const [previewArea, setPreviewArea] = useState({
        previewAreaX: null,
        previewAreaY: null,
        previewAreaWidth: null,
        previewAreaHeight: null,
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [isProcessStarted, setIsProcessStarted] = useState(false)
    const [imageCrop, setImageCrop] = useState(null)

    const camera = useRef(null)

    const goBack = async () => {
        const { onClearDocument } = props
        onClearDocument(null)
    }

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
        let image = await camera.current.takePictureAsync({
            quality: 0.7,
            orientation: 'portrait',
            base64: true,
            width: 1080,
            fixOrientation: true
        }).then(async data => {
            if (document.crop) setImageCrop(data)
            else {
                image = `data:image/jpeg;base64,${data.base64}`
                if (autoCrop) image = await handleAutoCrop(data)
                onCapture(image)
                calculateNextStep()
            }
            setButtonDisabled(false)
        })
    }

    const pickAndTransformPdf = () => {
        setIsProcessStarted(true)
        DocumentPicker.pick({
            type: [DocumentPicker.types.pdf]
        }).then(file => {
            RNFS.readFile(file.uri, 'base64').then(source => {
                onCapture(`data:application/pdf;base64,${source}`)
                calculateNextStep()
            })
        })
    }

    const calculateNextStep = () => {
        const { onStepsFinished } = props
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
            setImageCrop(null)
        } else {
            onStepsFinished(true)
        }
    }

    const setPreviewPosition = event => {
        setPreviewArea({
            previewAreaWidth: width,
            previewAreaHeight: width * 0.63 + 50,
            previewAreaX: event.nativeEvent.layout.x,
            previewAreaY: event.nativeEvent.layout.y,
        })
    }

    const handleAutoCrop = async data => {
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

    const handleSignature = signature => {
        setIsProcessStarted(true)
        onCapture(signature)
        calculateNextStep()
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

    const handleManualCrop = async data => {
        onCapture(`data:image/jpeg;base64,${await RNFS.readFile(data.image, 'base64')}`)
        onManualCropCorners([
            [
                parseInt(data.topLeft.x),
                parseInt(data.topLeft.y),
            ],
            [
                parseInt(data.topRight.x),
                parseInt(data.topRight.y),
            ],
            [
                parseInt(data.bottomLeft.x),
                parseInt(data.bottomLeft.y),
            ],
            [
                parseInt(data.bottomRight.x),
                parseInt(data.bottomRight.y),
            ],
        ])
        calculateNextStep()
    }

    if (isProcessStarted) {
        return (
            <View style={styles.cameraContainer}>
                <StatusBar barStyle="light-content" backgroundColor="black" />
                <ActivityIndicator color="white" size="large" />
            </View>
        )
    }

    if (imageCrop) {
        return (
            <ImageCropper
                image={imageCrop}
                onCancel={() => {
                    setImageCrop(false)
                    return true // Added for react navigation not to intervene
                }}
                onCropped={data => handleManualCrop(data)}
            />
        )
    }

    if (document.id === 'SG') {
        return (
            <View style={styles.signatureContainer}>
            <StatusBar hidden />
                <View style={{ flex: 0.07}}>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 20 }}
                        onPress={goBack}>
                        <Image style={styles.backArrowIcon} resizeMode="contain" source={require('../../assets/back-arrow.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.93 }}>
                    <SignatureDraw
                        onOK={handleSignature}
                        onEmpty={handleEmptySignature}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.cameraContainer}>
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
                            style={{ paddingHorizontal: 20 }}
                            onPress={goBack}>
                            <Image style={styles.backArrowIcon} resizeMode="contain" source={require('../../assets/back-arrow.png')} />
                        </TouchableOpacity>
                        <Text style={styles.topBarText}>{document.title}</Text>
                        {document.options.includes('fileUpload') ?
                            <TouchableOpacity
                                style={{ paddingHorizontal: 20 }}
                                onPress={() => pickAndTransformPdf()}>
                                <Image style={styles.fileUploadIcon} resizeMode="contain" source={require('../../assets/up.png')} />
                            </TouchableOpacity>
                            :
                            <View style={{flex: 0.15}} />
                        }
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
                <TouchableOpacity
                    style={styles.takePhotoButtonCircle}
                    disabled={buttonDisabled}
                    onPress={takePicture}>
                    <View style={[
                            styles.takePhotoButton,
                            {
                                backgroundColor: buttonDisabled
                                    ? '#9e9e9e'
                                    : 'white',
                            },
                        ]}
                    />
                </TouchableOpacity>
                </View>
                <View style={[styles.poweredBy, { backgroundColor: document.id !== 'UB' && document.id !== 'SG' ? 'rgba(0,0,0,0.70)' : 'transparent' }]}>
                    <Text style={{ color: 'white' }}>Powered By Amani</Text>
                </View>
            </RNCamera>
        </View>
    )
}

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selfieContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    signatureContainer: {
        flex: 1,
        backgroundColor: 'black'
    },
    manualCropContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    manualCropFooter: {
        flexDirection: 'row',
        backgroundColor: 'black'
    },
    manualCropFooterButton: {
        width: '50%',
        padding: 20
    },
    manualCropButtonText: {
        textAlign: 'center',
        color: 'white'
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
    },
    topBarText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        flex: 1,
        alignItems: 'center',
        paddingVertical: height * 0.022,
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
    takePhotoButtonCircle: {
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderRadius: 50,
        padding: 3,
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: height * 0.02
    },
    takePhotoButton: {
        borderRadius: 50,
        paddingHorizontal: width * 0.06,
        paddingVertical: height * 0.03,
    },
    buttonLoader: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        marginBottom: height * 0.025
    },
    backArrowIcon: {
        width: width * 0.035,
        height: height * 0.1,
        marginTop: -(height * 0.015)
    },
    fileUploadIcon: {
        width: width * 0.07,
        height: height * 0.1,
        marginTop: -(height * 0.015)
    },
    previewMiddle: {
        borderColor: 'white',
        borderWidth: 2,
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
