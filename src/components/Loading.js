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
import animationSE from '../../assets/animation_se.json';

const Loading = (props) => {
  const animationType = () => {
    const { type } = props;
    if (type === 'ID') {
      return <LottieView source={animationID} autoPlay loop />;
    }

    if (type === 'SE') {
      return <LottieView source={animationSE} autoPlay loop />;
    }

    return <ActivityIndicator color="white" size="large" />;
  };

  return (
    <ImageBackground source={mainBackground} style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      {animationType()}
    </ImageBackground>
  );
};

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
