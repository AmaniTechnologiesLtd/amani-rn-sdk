import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const Loading = props => {
  const {
    title,
    onLeftButtonPressed,
    leftButtonIcon,
    onRightButtonPressed,
    rightButtonIcon,
  } = props;
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      {onLeftButtonPressed && leftButtonIcon && (
        <TouchableOpacity
          style={styles.topBarLeft}
          onPress={onLeftButtonPressed}
          hitSlop={{top: 25, left: 25, bottom: 25, right: 25}}>
          <Image
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
            source={leftButtonIcon}
          />
        </TouchableOpacity>
      )}

      <Text style={styles.topBarCenter}>{title}</Text>

      {onRightButtonPressed && rightButtonIcon && (
        <TouchableOpacity
          style={styles.topBarRight}
          onPress={onLeftButtonPressed}
          hitSlop={{top: 25, left: 25, bottom: 25, right: 25}}>
          <Image
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
            source={rightButtonIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
  },
  topBarLeft: {
    width: width * 0.055,
    height: height * 0.03,
  },
  topBarCenter: {
    color: 'white',
  },
  topBarRight: {
    width: width * 0.055,
    height: height * 0.03,
  },
});
