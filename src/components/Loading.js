import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import LottieView from 'lottie-react-native';

import mainBackground from '../../assets/main-bg.png';
import animationID from '../../assets/animation_id.json';

const Loading = (props) => (
  <ImageBackground source={mainBackground} style={styles.container}>
    <StatusBar translucent backgroundColor="transparent" />
    {props.type === 'ID' ? (
      <LottieView source={animationID} autoPlay loop />
    ) : (
      <ActivityIndicator color="white" size="large" />
    )}
  </ImageBackground>
);

export default Loading;

Loading.defaultProps = {
  type: 'default',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
