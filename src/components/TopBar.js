import React, { Fragment } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';

import topbarBackground from '../../assets/topbar-bg.png';

const { width, height } = Dimensions.get('window');

const TopBar = (props) => {
  const {
    title,
    style,
    middleComponent,
    onLeftButtonPressed,
    leftButtonIcon,
    onRightButtonPressed,
    rightButtonIcon,
    noBackground,
  } = props;

  const topbarContent = (
    <Fragment>
      {onLeftButtonPressed && leftButtonIcon && (
        <TouchableOpacity
          style={[styles.topBarLeft, styles.topBarIcon]}
          onPress={onLeftButtonPressed}
          hitSlop={{ top: 25, left: 25, bottom: 25, right: 25 }}>
          <Image
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
            source={leftButtonIcon}
          />
        </TouchableOpacity>
      )}

      {middleComponent ? (
        middleComponent
      ) : (
        <Text style={styles.topBarCenter}>{title}</Text>
      )}

      {onRightButtonPressed && rightButtonIcon ? (
        <TouchableOpacity
          style={[styles.topBarRight, styles.topBarIcon]}
          onPress={onRightButtonPressed}
          hitSlop={{ top: 25, left: 25, bottom: 25, right: 25 }}>
          <Image
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
            source={rightButtonIcon}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.topBarIcon} />
      )}
    </Fragment>
  );

  if (noBackground) {
    return (
      <SafeAreaView style={[styles.container, style]}>
        {topbarContent}
      </SafeAreaView>
    );
  }

  return (
    <ImageBackground
      source={topbarBackground}
      style={[styles.container, styles.withBackground, style]}>
      <SafeAreaView style={styles.container}>{topbarContent}</SafeAreaView>
    </ImageBackground>
  );
};

export default TopBar;

TopBar.defaultProps = {
  noBackground: false,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 20 : 30,
    width: '100%',
  },
  withBackground: {
    paddingHorizontal: 20,
    marginTop: 0,
    paddingBottom: 15,
  },
  topBarIcon: {
    width: width * 0.055,
    height: height * 0.03,
  },
  topBarLeft: {},
  topBarCenter: {
    color: 'white',
  },
  topBarRight: {},
});
