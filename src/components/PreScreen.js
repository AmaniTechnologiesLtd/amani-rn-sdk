// Global dependencies
import React from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    StatusBar,
    Dimensions
} from 'react-native'

const { width, height } = Dimensions.get('window')

export const PreScreen = props => {
    const { screenKey, versions, documentIndex, preScreenOn } = props
    switch (screenKey) {
        case 'versioning':
            return (
                <View style={styles.container}>
                    <StatusBar barStyle="dark-content" backgroundColor="white" />
                    <Text style={{ textAlign: 'center', fontSize: height * 0.04, padding: 20 }}> Doküman Tipi Seçin </Text>
                    {versions.map((version, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => {
                                documentIndex(index)
                                preScreenOn(false)
                            }} style={{width: width * 0.9, backgroundColor: '#212121', height: height * 0.06, justifyContent: 'center', borderRadius: 5, marginBottom: 10 }}>
                                <Text style={{color: 'white', textAlign: 'center'}}>
                                    {version.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
