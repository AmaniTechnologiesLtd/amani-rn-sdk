// Global dependencies
import React, {useEffect} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  BackHandler,
  StatusBar,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import blueBackground from '../../assets/btn-blue.png';
import mainBackground from '../../assets/main-bg.png';
import backArrow from '../../assets/back-arrow.png';
import forwardArrow from '../../assets/forward-arrow.png';

const {width, height} = Dimensions.get('window');

export const VersionSelection = props => {
  const {
    document,
    versionGroup,
    groupIndex,
    closeVersionSelected,
    menuMode,
    goBack,
  } = props;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      goBack();
    });
    return () => BackHandler.removeEventListener('hardwareBackPress');
  }, []);

  const handleVersionChoice = (group, versionKey) => {
    groupIndex(versionKey);
    versionGroup(group);
    closeVersionSelected();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ImageBackground source={mainBackground} style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.topBarLeft}
            onPress={goBack}
            hitSlop={{top: 25, left: 25, bottom: 25, right: 25}}>
            <Image
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
              source={backArrow}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.childContainer}>
          <Text style={styles.childContainerTitle}>
            {document.versionTitle}
          </Text>

          <Text style={styles.childContainerDescription}>
            {document.versionDescription}
          </Text>

          {Object.keys(document.versions).map((group, groupKey) => {
            return (
              <View key={groupKey}>
                <Text style={styles.groupTitle}>
                  {group.toLocaleUpperCase()}
                </Text>
                <View
                  style={
                    menuMode === 'horizontal'
                      ? styles.horizontalGroupViewContainer
                      : styles.verticalGroupViewContainer
                  }>
                  {document.versions[group].map((version, versionKey) => {
                    return (
                      <TouchableOpacity
                        key={versionKey}
                        onPress={() => handleVersionChoice(group, versionKey)}
                        style={styles.versionButton}>
                        <ImageBackground
                          source={blueBackground}
                          style={styles.buttonBackground}>
                          <Text style={styles.versionTitle}>
                            {version.title}
                          </Text>
                          <Image
                            resizeMode="contain"
                            style={styles.buttonIcon}
                            source={forwardArrow}
                          />
                        </ImageBackground>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  childContainer: {
    flex: 1,
    marginTop: 20,
  },
  childContainerTitle: {
    fontSize: height * 0.03,
    fontWeight: 'bold',
    color: 'white',
  },
  childContainerDescription: {
    marginVertical: 10,
    fontSize: height * 0.022,
    color: '#CAE0F5',
  },
  topBar: {
    flexDirection: 'row',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  topBarLeft: {
    position: 'absolute',
    left: 0,
    top: 5,
    width: width * 0.055,
    height: height * 0.03,
  },
  horizontalGroupViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width * 0.9,
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  verticalGroupViewContainer: {
    flexDirection: 'column',
    width: width * 0.9,
    backgroundColor: 'transparent',
    borderRadius: 5,
    marginBottom: 10,
  },
  groupTitle: {
    fontSize: width * 0.06,
    margin: 3,
    color: 'white',
    textAlign: 'left',
  },
  versionButton: {
    marginBottom: 10,
    borderRadius: 10,
    width: '100%',
  },
  buttonBackground: {
    resizeMode: 'cover',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonIcon: {
    width: 20,
    height: 20,
  },
  versionTitle: {
    color: '#fff',
  },
});
