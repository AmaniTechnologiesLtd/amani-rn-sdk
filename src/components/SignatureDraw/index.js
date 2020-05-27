import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import { content } from './View/html';
import { SignaturePad } from './View/js/signature_pad';
import { AppContent } from './View/js/app';

const SignatureView = (props) => {
  const { onOK, onEmpty } = props;
  const html = content(SignaturePad + AppContent);

  const getSignature = (e) => {
    if (e.nativeEvent.data === 'EMPTY') {
      onEmpty();
    } else {
      onOK(e.nativeEvent.data);
    }
  };

  return (
    <View style={styles.webBg}>
      <WebView
        useWebKit={true}
        source={{ html }}
        onMessage={getSignature}
        javaScriptEnabled={true}
      />
    </View>
  );
};

export default SignatureView;

SignatureView.defaultProps = {
  onOK: () => {},
  onEmpty: () => {},
};

const styles = StyleSheet.create({
  webBg: {
    width: '100%',
    backgroundColor: '#FFF',
    flex: 1,
  },
});
