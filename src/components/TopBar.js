import React, { Fragment } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

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
    <View style={[styles.container, styles.withBackground, style]}>
      <SafeAreaView style={styles.container}>{topbarContent}</SafeAreaView>
    </View>
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
    marginTop: 20,
    width: '100%',
  },
  withBackground: {
    paddingHorizontal: 20,
    marginTop: 0,
    paddingBottom: 15,
    backgroundColor: '#13283d',
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
