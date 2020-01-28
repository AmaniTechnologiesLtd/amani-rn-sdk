// Global dependencies
import React from 'react'
import {
    View,
    ActivityIndicator,
    StyleSheet,
    StatusBar
} from 'react-native'

export const Loading = () => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <ActivityIndicator color="white" size="large" />
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
