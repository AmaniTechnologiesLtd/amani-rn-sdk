// Global dependencies
import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Alert,
    StyleSheet
} from 'react-native'
import { WebView } from 'react-native-webview'

// Local files
import htmlView from './View/html'
import documents from '../../store/documents'


const ContractScreen = props => {
    const { onContractDecline, onContractAccept, currentDocument } = props

    const handleContractDecline = () => {
        Alert.alert(
            '',
            'Kontratı reddettiğiniz durumda ana ekrana yönlendirileceksiniz.\nDevam etmek istediğinize emin misiniz?',
            [
                {
                    text: 'Hayır'
                },
                {
                    text: 'Evet',
                    onPress: () =>  onContractDecline(false)
                }
            ],
            {cancelable: false}
        )
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <WebView style={{flex: 1}} source={{html: htmlView}} />
            <View style={styles.bottomBar}>
                <TouchableOpacity onPress={handleContractDecline} style={styles.bottomBarButton}>
                    <Text style={styles.bottomBarButtonText}> Reddet </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={async () => {
                    await onContractDecline(false)
                    onContractAccept(currentDocument)
                }} style={styles.bottomBarButton}>
                    <Text style={styles.bottomBarButtonText}> Okudum, anladım ve onaylıyorum. </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    bottomBar: {
        flex: 0.06,
        backgroundColor: '#212121',
        flexDirection: 'row'
    },
    bottomBarButton: {
        flex: 0.5,
        justifyContent: 'center'
    },
    bottomBarButtonText: {
        color: 'white',
        textAlign: 'center'
    }
})

export default ContractScreen