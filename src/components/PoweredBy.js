import React from 'react';
import { StyleSheet, Image } from 'react-native';

const PoweredBy = () => (
  <Image
    style={styles.poweredBy}
    source={require('../../assets/powered-by.png')}
  />
);

export default PoweredBy;

const styles = StyleSheet.create({
  poweredBy: {
    position: 'absolute',
    bottom: 15,
    height: 12,
    width: 104,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
