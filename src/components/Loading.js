import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import mainBackground from '../../assets/main-bg.png';

export const Loading = () => (
  <ImageBackground source={mainBackground} style={styles.container}>
    <StatusBar hidden />
    <ActivityIndicator color="white" size="large" />
  </ImageBackground>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
