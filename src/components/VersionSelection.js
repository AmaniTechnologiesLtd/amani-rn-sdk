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

export const VersionSelection = props => {
    const {
        versions,
        versionGroup,
        groupIndex,
        closeVersionSelected,
        menuMode,
        goBack
    } = props

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            goBack()
        })
        return () => BackHandler.removeEventListener('hardwareBackPress')
    }, [])

    const handleVersionChoice = (group, versionKey) => {
        groupIndex(versionKey)
        versionGroup(group)
        closeVersionSelected()
    }

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
                {Object.keys(versions).map((group, groupKey) => {
                    return (
                        <View key={groupKey}>
                            <Text style={styles.groupTitle}> {group.toLocaleUpperCase()} </Text>
                            <View style={menuMode === 'horizontal' ? styles.horizontalGroupViewContainer : styles.verticalGroupViewContainer}>
                                {versions[group].map((version, versionKey) => {
                                    return (
                                        <TouchableOpacity
                                            key={versionKey}
                                            onPress={() => handleVersionChoice(group, versionKey)}
                                            style={styles.versionButton}
                                        >
                                            <Text style={styles.versionTitle}> {version.title} </Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>
                    )
                })}
            </View>
        </SafeAreaView>
    )
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
        width: width * 0.055,
        height: height * 0.03
    },
    horizontalGroupViewContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: width * 0.9,
        backgroundColor: 'transparent',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10
    },
    verticalGroupViewContainer: {
        flexDirection: 'column',
        width: width * 0.9,
        backgroundColor: 'transparent',
        borderRadius: 5,
        marginBottom: 10
    },
    groupTitle: {
        fontSize: width * 0.06,
        margin: 3,
        color: 'white',
        textAlign: 'left'
    },
    versionButton: {
        backgroundColor:'#212121',
        height: height * 0.055,
        padding: 5,
        margin: 2,
        borderRadius: 5,
        justifyContent: 'center'
    },
    versionTitle: {
        color: '#eee',
        textAlign: 'center'
    }
})
