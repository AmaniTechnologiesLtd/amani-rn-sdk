// Global dependencies
import React from 'react'
import {
    StyleSheet,
    Image,
} from 'react-native'

export const PoweredBy = () => <Image style={styles.poweredBy}  source={require('../../assets/powered-by.png')}/>

const styles = StyleSheet.create({
    poweredBy: {
        position: 'absolute',
        bottom: 10,
        height: 12,
        width: 104,
        alignSelf: 'center',
        resizeMode: 'contain'
    }
})
