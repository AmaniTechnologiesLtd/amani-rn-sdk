// Global dependencies
import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Alert,
    StyleSheet,
    BackHandler,
    Dimensions
} from 'react-native'
import { WebView } from 'react-native-webview'

// Local files
import htmlView from './View/html'

const { width, height } = Dimensions.get('window')

const ContractScreen = props => {
    const { onContractDecline, onContractAccept, currentDocument } = props
    const [isContractApproved, setIsContractApproved] = useState(false)

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
                onContractDecline(false)
                return true
            }
        )
        return () => BackHandler.removeEventListener('hardwareBackPress')
    }, [])

    const handleContractProcess = async () => {
        if (!isContractApproved) {
            Alert.alert(
                '',
                'Sözleşmeyi kabul etmeden imzalama ekranına geçemezsiniz.',
                [
                    {
                        text: 'Anladım'
                    },
                ],
                {cancelable: false}
            )
            return
        }

        await onContractDecline(false)
        onContractAccept(currentDocument)
    }

    const customCheckboxView = () => {
        return (
            <TouchableOpacity onPress={() => setIsContractApproved(!isContractApproved)} style={styles.customCheckboxOutline}>
                {isContractApproved && (
                    <View style={styles.customCheckboxInline} />
                )}
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <WebView source={{html: htmlView}} />
            <View style={styles.bottomBar}>
                <View style={styles.bottomBarButton}>
                <Text style={styles.bottomBarButtonText}> Onaylıyorum {' '}</Text>
                {customCheckboxView()}
                </View>
                <TouchableOpacity onPress={handleContractProcess} style={styles.bottomBarButton}>
                    <Text style={styles.bottomBarButtonText}> İmzala </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    customCheckboxOutline: {
        borderColor: 'white',
        borderWidth: 1,
        width: height * 0.035,
        height: height * 0.035,
        padding: 3,
    },
    customCheckboxInline: {
        backgroundColor: 'gray',
        height:'100%',
        width:'100%'
    },
    bottomBar: {
        flex: 0.06,
        backgroundColor: 'black',
        flexDirection: 'row'
    },
    bottomBarButton: {
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomBarButtonText: {
        color: 'white',
        textAlign: 'center',
    }
})

export default ContractScreen