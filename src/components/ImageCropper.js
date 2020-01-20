import React, { useRef, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    Text,
    StatusBar,
    BackHandler,
} from 'react-native'
import CustomCrop from './CustomCrop'
import iconBack from '../../assets/back-arrow.png'
import iconCrop from '../../assets/crop.png'

const ImageCropper = props => {
    const { image, onCancel } = props
    const { width, height } = Dimensions.get('window')
    const ratioX = image.width / width
    const ratioY = image.height / height
    let customCrop = useRef(null)

    const rectangleCoordinates = {
        topLeft: { x: width * 0.15 * ratioX, y: height * 0.2 * ratioY },
        topRight: { x: width * 0.85 * ratioX, y: height * 0.2 * ratioY },
        bottomRight: { x: width * 0.85 * ratioX, y: height * 0.85 * ratioY },
        bottomLeft: { x: width * 0.15 * ratioX, y: height * 0.85 * ratioY },
    }

    const getCropData = () => {
        const { onCropped } = props
        onCropped(customCrop.getCropData())
    }

    // Android back button handler
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onCancel)

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onCancel)
        }
    }, [onCancel])

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <View style={styles.topBar}>
                <TouchableOpacity
                    style={styles.topBarLeft}
                    onPress={onCancel}>
                    <Image
                        style={{
                            resizeMode: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                        source={iconBack}
                    />
                </TouchableOpacity>

                <Text style={styles.topBarTitle}>Crop Image</Text>

                <TouchableOpacity
                    style={styles.topBarRight}
                    onPress={getCropData}
                    hitSlop={{
                        top: 25,
                        left: 25,
                        bottom: 25,
                        right: 25,
                    }}>
                    <Image
                        style={{
                            resizeMode: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                        source={iconCrop}
                    />
                </TouchableOpacity>
            </View>
            <CustomCrop
                ref={ref => (customCrop = ref)}
                style={styles.customCrop}
                rectangleCoordinates={rectangleCoordinates}
                initialImage={image.uri}
                height={image.height}
                width={image.width}
                overlayColor="#ffffff"
                overlayStrokeColor="#ffffff"
                handlerColor="transparent"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 1,
    },
    customCrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    topBar: {
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: 'rgba(0,0,0,0.70)',
    },
    topBarLeft: {
        position: 'absolute',
        left: 10,
        top: 15,
        width: 30,
        height: 20,
    },
    topBarRight: {
        position: 'absolute',
        right: 10,
        top: 15,
        width: 30,
        height: 20,
    },
    topBarTitle: { color: 'white', fontSize: 16 },
})

export default ImageCropper
