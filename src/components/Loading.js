import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
// import LottieView from 'lottie-react-native';

// import animationID from '../../assets/animation_id.json';
// import animationSE from '../../assets/animation_se.json';

const Loading = (props) => {
  const animationType = () => {
    // const { type } = props;
    // if (type === 'ID') {
    //   return <LottieView source={animationID} autoPlay loop />;
    // }

    // if (type === 'SE') {
    //   return <LottieView source={animationSE} autoPlay loop />;
    // }

    return <ActivityIndicator color="white" size="large" />;
  };

  return <View style={styles.container}>{animationType()}</View>;
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
    backgroundColor: '#263B5B',
  },
});
