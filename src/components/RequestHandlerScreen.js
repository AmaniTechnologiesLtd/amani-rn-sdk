// Global Dependencies
import React from 'react'
import { View, Image, Text, TouchableOpacity, StatusBar, Dimensions, StyleSheet } from 'react-native'

// Local files
import successImage from '../../assets/success_big.png'
import failImage from '../../assets/failed_big.png'

const { width, height } = Dimensions.get('window')

export const RequestHandlerScreen = props => {
    const { isSucceed, documentTitle, continueProcess } = props

    const status = {
        info: isSucceed ? `${documentTitle} başarı ile yüklendi.` : `${documentTitle} yüklenemedi.`,
        buttonText: isSucceed ? 'DEVAM' : 'TEKRAR DENE',
        source: isSucceed ? successImage : failImage
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
    }
})
