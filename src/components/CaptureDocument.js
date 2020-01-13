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
    TouchableOpacity
} from 'react-native'
import { RNCamera } from 'react-native-camera'
import RNFS from 'react-native-fs'
import { CropView } from 'react-native-image-crop-tools'
import ImageEditor from '@react-native-community/image-editor'
import Signature from 'react-native-signature-canvas'

// Local files
import SelfieMask from './SelfieMask'

const { width, height } = Dimensions.get('window')

export default function CaptureDocument(props) {

    const {
        document,
        document: { steps, aspectRatio, cameraFacing, autoCrop },
        onCapture
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
    const [cropDocument, setCropDocument] = useState(null)

    const camera = useRef(null)
    const cropViewRef = useRef()

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
            if (document.crop) {
                setButtonDisabled(false)
                setCropDocument(data)
            } else {
                image = `data:image/jpeg;base64,${data.base64}`
                if (autoCrop) image = await handleAutoCrop(data)
                onCapture(image)
                calculateNextStep()
            }
        })
    }

    const calculateNextStep = () => {
        const { onStepsFinished } = props
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
            setButtonDisabled(false)
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
        onCapture(signature)
        calculateNextStep()
    }

    const handleManualCrop = async croppedImageUri => {
        const src = await RNFS.readFile(croppedImageUri, 'base64')
        onCapture(`data:image/jpeg;base64,${src}`)
        calculateNextStep()
    }

    if (cropDocument) {
        return (
            <View style={styles.manualCropContainer}>
                <StatusBar hidden />
                <CropView
                    sourceUrl={cropDocument.uri}
                    style={{flex: 1}}
                    ref={cropViewRef}
                    onImageCrop={res => handleManualCrop(res.uri)}
                />
                <View style={styles.manualCropFooter}>
                    <TouchableOpacity style={styles.manualCropFooterButton} onPress={goBack}>
                        <Text style={styles.manualCropButtonText}> Back </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.manualCropFooterButton} onPress={() => cropViewRef.current.saveImage(100)}>
                        <Text style={styles.manualCropButtonText}> Crop </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    if (document.id === 'SG') {
        return (
            <View style={styles.signatureContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#4630BE" />
                <View style={{ flex: 0.07}}>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 20 }}
                        onPress={goBack}>
                        <Image style={styles.backArrowIcon} resizeMode="contain" source={require('../../assets/back-arrow.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.93 }}>
                    <Signature
                        onOK={handleSignature}
                        onEmpty
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
                        {document.options.includes('fileUpload') && (
                            <TouchableOpacity
                                style={{ paddingHorizontal: 20 }}
                                onPress={() => props.takePdfFile()}>
                                <Image style={styles.fileUploadIcon} resizeMode="contain" source={require('../../assets/up.png')} />
                            </TouchableOpacity>
                        )}
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
                    <TouchableOpacity
                        style={[styles.takePhotoButton, {backgroundColor: buttonDisabled ? '#9e9e9e': 'white'}]}
                        disabled={buttonDisabled}
                        onPress={takePicture}
                    />
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    selfieContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    signatureContainer: {
        flex: 1,
        backgroundColor: '#4630BE'
    },
    manualCropContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    manualCropFooter: {
        flexDirection: 'row',
        backgroundColor: '#4630BE'
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
