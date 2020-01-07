import React, { useState, useEffect, useRef } from 'react'
import {
    StyleSheet,
    StatusBar,
    BackHandler,
    Dimensions,
    Image,
    Button,
    Text,
    View,
    ActivityIndicator,
    Platform,
    TouchableOpacity
} from 'react-native'
import SelfieMask from './SelfieMask'
import ImageEditor from '@react-native-community/image-editor'
import { RNCamera } from 'react-native-camera'
import RNFS from 'react-native-fs'

const { width, height } = Dimensions.get('window')

export default function CaptureDocument(props) {
    const {
        document,
        document: { steps, aspectRatio, cameraFacing } } = props
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [cameraType, setCameraType] = useState(
        cameraFacing === 'environment'
            ? RNCamera.Constants.Type.back
            : RNCamera.Constants.Type.front
    )
    const [previewArea, setPreviewArea] = useState({
        previewAreaX: null,
        previewAreaY: null,
        previewAreaWidth: null,
        previewAreaHeight: null,
    })
    const camera = useRef(null)

    // Run once only when component mounted
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                goBack() // works best when the goBack is async
                return true
            }
        )

        return () => {
            backHandler.remove()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                if (document.autoCrop) image = await cropImage(data)
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
        } else {
            onStepsFinished(true)
        }
    }

    const cropImage = async data => {
        const ratio = data.width / width
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
            // eslint-disable-next-line no-return-await
            async path => await RNFS.readFile(path, 'base64')
        )

        return `data:image/jpeg;base64,${src}`
    }


    const flipCamera = async () => {
        setCameraType(
            cameraType === RNCamera.Constants.Type.back
                ? RNCamera.Constants.Type.front
                : RNCamera.Constants.Type.back
        )
    }

    const goBack = async () => {
        const { onClearDocument } = props
        onClearDocument(null)
    }

    const setPreviewPosition = event => {
        setPreviewArea({
            previewAreaWidth: width,
            previewAreaHeight: width * 0.63 + 50,
            previewAreaX: 0,
            previewAreaY: event.nativeEvent.layout.y - 50,
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
                <View style={[styles.topArea, { backgroundColor: document.id !== 'UB' && document.id !== 'SG' ? 'rgba(0,0,0,0.70)' : 'transparent'} ]}>
                    {steps.length > 1 && (
                        <Text style={styles.topText}>
                            {steps[currentStep].title}
                        </Text>
                    )}
                </View>
                {aspectRatio && (
                    <View
                        style={styles.previewArea}
                        onLayout={setPreviewPosition}>
                        <View style={[styles.previewSide, styles.backDrop]} />
                        <View
                            style={[
                                styles.previewMiddle,
                                {
                                    width: width * 0.85,
                                    paddingTop: width * 0.85 * aspectRatio,
                                },
                            ]}
                        />
                        <View style={[styles.previewSide, styles.backDrop]} />
                    </View>
                )}
                {document.id === 'SE' && (
                    <View
                        style={styles.previewArea}
                        onLayout={setPreviewPosition}>
                        <View style={[styles.previewSide, styles.backDrop]} />
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <SelfieMask />
                        </View>
                        <View style={[styles.previewSide, styles.backDrop]} />
                    </View>
                )}
                <View style={[styles.topArea, { backgroundColor: document.id !== 'UB' && document.id !== 'SG' ? 'rgba(0,0,0,0.70)' : 'transparent'} ]}>
                    <Text style={styles.bottomText}>
                        {steps[currentStep].description}
                    </Text>
                </View>
                <View style={[styles.topArea, { backgroundColor: document.id !== 'UB' && document.id !== 'SG' ? 'rgba(0,0,0,0.70)' : 'transparent'} ]}>
                    {buttonDisabled ? (
                        <ActivityIndicator color="white" style={styles.spinner} />
                    ) : (
                        <TouchableOpacity
                            style={styles.takePhotoButton}
                            disabled={buttonDisabled}
                            onPress={() => takePicture()}>
                        <Text>asd</Text>
                            </TouchableOpacity>
                    )}
                </View>
                <View style={[styles.poweredBy, { backgroundColor: document.id !== 'UB' && document.id !== 'SG' ? 'rgba(0,0,0,0.70)' : 'transparent' }]}>
                    <Text style={styles.poweredByText}>Powered By Amani</Text>
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
    spinner: {
        marginBottom: 5,
    },
    preview: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 2,
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
    bottomArea: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomText: {
        color: 'white',
        fontSize: 16,
        paddingHorizontal: '7%',
        textAlign: 'center',
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    takePhotoButton: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 50,
        paddingHorizontal: width * 0.04,
        paddingVertical: height * 0.02,
    },
    previewArea: {
        flexDirection: 'row',
    },
    previewSide: {
        flex: 1,
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
    poweredByText: {
        color: 'white',
    },
    backDrop: {
        backgroundColor: 'rgba(0,0,0,0.70)',
    },
})