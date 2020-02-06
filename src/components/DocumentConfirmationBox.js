// Global Dependencies
import React, { useState, useEffect } from 'react'
import { View, Image, Text, TouchableOpacity, StatusBar, Dimensions, StyleSheet } from 'react-native'

// Local files
import api from '../services/api'
import { Loading } from './Loading'
import successImage from '../../assets/success_big.png'
import failImage from '../../assets/failed_big.png'

const { width, height } = Dimensions.get('window')

export const DocumentConfirmationBox = props => {
    const { imageUrl, isSucceed, document, onTryAgain, continueProcess, customer, corners, step } = props
    const [isImageApproved, setIsImageApproved] = useState(false)
    const [imgSrc, setImgSrc] = useState(null)

    const status = {
        info: isSucceed ? `${document.title} başarı ile yüklendi.` : `${document.title} yüklenemedi.`,
        buttonText: isSucceed ? 'DEVAM' : 'TEKRAR DENE',
        source: isSucceed ? successImage : failImage
    }

    useEffect(() => {
        if (!imgSrc) {
            const requestData = new FormData()
            if (corners) corners.forEach(corner => requestData.append('corners[]', JSON.stringify(corner)))
            requestData.append('files[]', imageUrl)

            api.cropImage(customer.access, requestData).then(res => setImgSrc(res.data.image)).catch(err => setImgSrc(imageUrl))
        }
    }, [])

    if (!imgSrc) return <Loading />

    if (imgSrc && !isImageApproved) {
        return (
            <View style={styles.confirmationContainer}>
                <StatusBar hidden />
                <Text style={styles.confirmationTitle}>
                    {document.title.toLocaleUpperCase()} {"\n\n"}
                    {document.steps.length > 0 && document.steps[step].title.toLocaleUpperCase()}
                </Text>
                <Image
                    resizeMode="contain"
                    style={[styles.confirmationImagePreview, { transform: [{ scaleX: document.id != 'SE' ? 1 : -1}] }]}
                    source={{uri: imgSrc}}
                />
                <View style={styles.confirmationBottomBar}>
                    <TouchableOpacity onPress={onTryAgain} style={[styles.confirmationBottomBarButton, { marginRight: width * 0.05 }]}>
                        <Text style={styles.confirmationButtonText}>
                            TEKRAR DENE
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsImageApproved(true)} style={styles.confirmationBottomBarButton}>
                        <Text style={styles.confirmationButtonText}>
                            ONAYLA
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={styles.childContainer}>
                <Image source={status.source} resizeMode="contain" style={{width: width * 0.7}} />
                <Text style={styles.statusInfoText}>
                    {status.info}
                </Text>
            </View>
            <TouchableOpacity onPress={continueProcess} style={styles.statusButton}>
                <Text style={styles.statusButtonText}>
                    {status.buttonText}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    childContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusInfoText: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: height * -0.055,
        marginBottom: 20
    },
    statusButton: {
        backgroundColor: 'black',
        justifyContent: 'center',
        width: width * 0.9,
        height: height * 0.06,
        borderRadius: 5
    },
    statusButtonText: {
        color: 'white',
        textAlign: 'center'
    },
    confirmationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    confirmationTitle: {
        color: 'white',
        fontSize: width * 0.06,
        top: height * 0.12,
        position: 'absolute',
        textAlign: 'center'
    },
    confirmationImagePreview: {
        width: width * 0.9,
        height: height * 0.5,
        position: 'absolute',
    },
    confirmationBottomBar: {
        position: 'absolute',
        bottom: height * 0,
        height: height * 0.07,
        width: width * 0.85,
        flexDirection: 'row'
    },
    confirmationBottomBarButton: {
        flex: 0.5,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 7
    },
    confirmationButtonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: width * 0.035
    }
})
