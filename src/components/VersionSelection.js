import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  BackHandler,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Button from './Button';
import blueBackground from '../../assets/btn-blue.png';
import darkTransparentBackground from '../../assets/btn-dark-transparent.png';
import backArrow from '../../assets/back-arrow.png';
import forwardArrow from '../../assets/forward-arrow.png';
import TopBar from './TopBar';

const { width, height } = Dimensions.get('window');

const VersionSelection = (props) => {
  const {
    document,
    versionGroup,
    groupIndex,
    closeVersionSelected,
    menuMode,
    goBack,
    onActivity,
  } = props;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      goBack();
    });
    return () => BackHandler.removeEventListener('hardwareBackPress');
  }, []);

  const handleVersionChoice = (group, versionKey) => {
    onActivity(
      document.versions[group][versionKey].eventName,
      document.id === 'UB' ? document.versions[group][versionKey].title : '', // Send value for only UB
    );
    groupIndex(versionKey);
    versionGroup(group);
    closeVersionSelected();
  };

  return (
    <View style={styles.container}>
      <TopBar
        onLeftButtonPressed={goBack}
        leftButtonIcon={backArrow}
        style={{ paddingHorizontal: 20 }}
        noBackground
      />

      <ScrollView
        style={styles.childContainer}
        onTouchStart={() => onActivity('TouchEvent')}>
        <Text style={styles.childContainerTitle}>{document.versionTitle}</Text>

        <Text style={styles.childContainerDescription}>
          {document.versionDescription}
        </Text>

        {Object.keys(document.versions).map((group, groupKey) => {
          return (
            <View key={groupKey}>
              <Text style={styles.groupTitle}>{group}</Text>
              <View
                style={
                  menuMode === 'horizontal'
                    ? styles.horizontalGroupViewContainer
                    : styles.verticalGroupViewContainer
                }>
                {document.versions[group].map((version, versionKey) => {
                  return (
                    <Button
                      key={versionKey}
                      onPress={() => handleVersionChoice(group, versionKey)}
                      backgroundImage={
                        menuMode === 'horizontal'
                          ? darkTransparentBackground
                          : blueBackground
                      }
                      style={
                        menuMode === 'horizontal'
                          ? styles.versionButtonHorizontal
                          : styles.versionButtonVertical
                      }
                      backgroundStyle={
                        menuMode === 'horizontal'
                          ? styles.horizontalButtonBackground
                          : styles.verticalButtonBackground
                      }>
                      <Text style={styles.versionTitle}>{version.title}</Text>
                      {menuMode !== 'horizontal' && (
                        <Image
                          resizeMode="contain"
                          style={styles.buttonIcon}
                          source={forwardArrow}
                        />
                      )}
                    </Button>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default VersionSelection;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#263B5B',
  },
  container: {
    flex: 1,
    paddingTop: 10,
  },
  childContainer: {
    paddingHorizontal: 20,
  },
  childContainerTitle: {
    fontSize: height * 0.03,
    fontWeight: 'bold',
    color: 'white',
  },
  childContainerDescription: {
    marginBottom: 10,
    fontSize: height * 0.021,
    color: '#CAE0F5',
  },
  horizontalGroupViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
    alignItems: 'center',
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
    fontSize: width * 0.05,
    fontWeight: 'bold',
    margin: 3,
    color: 'white',
    textAlign: 'left',
  },
  versionButtonVertical: {
    marginBottom: 10,
    width: '99%',
    overflow: 'hidden',
  },
  versionButtonHorizontal: {
    marginBottom: 10,
    marginRight: 10,
    height: 40,
  },
  horizontalButtonBackground: {
    resizeMode: 'cover',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verticalButtonBackground: {
    resizeMode: 'cover',
    paddingVertical: 20,
    paddingHorizontal: 15,
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
