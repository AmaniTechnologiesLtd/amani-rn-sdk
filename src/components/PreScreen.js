// Global dependencies
import React, { useEffect } from 'react'
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Text,
    BackHandler,
    StatusBar,
    Dimensions,
    StyleSheet
} from 'react-native'

const { width, height } = Dimensions.get('window')

export const PreScreen = props => {
    const { screenKey, versions, documentIndex, preScreenOn, goBack } = props

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            goBack()
        })
        return () => BackHandler.removeEventListener('hardwareBackPress')
    }, [])

    switch (screenKey) {
        case 'versioning':
            return (
                <SafeAreaView style={styles.container}>
                    <StatusBar barStyle="light-content" backgroundColor="black" />
                    <View style={styles.topBar}>
                        <TouchableOpacity
                            style={styles.topBarLeft}
                            onPress={goBack}
                            hitSlop={{ top: 25, left: 25, bottom: 25, right: 25 }}>
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                resizeMode="contain" source={require('../../assets/back-arrow.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.childContainer}>
                        <Text style={styles.childContainerTitle}> Doküman Tipi Seçin </Text>
                        {versions.map((version, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        documentIndex(index)
                                        preScreenOn(false)
                                    }}
                                    style={styles.versionButtonStyle}
                                >
                                    <Text style={styles.versionTitle}>
                                        {version.title}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </SafeAreaView>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'black'
    },
    childContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    childContainerTitle: {
        textAlign: 'center',
        fontSize: height * 0.04,
        padding: 20,
        color: 'white'
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
    versionButtonStyle: {
        width: width * 0.9,
        backgroundColor: '#212121',
        height: height * 0.06,
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 10
    },
    versionTitle: {
        color: 'white',
        textAlign: 'center'
    }
})
