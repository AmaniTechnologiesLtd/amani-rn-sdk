import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

// Local files
import { content } from './View/html';
import { SignaturePad } from './View/js/signature_pad';
import { AppContent } from './View/js/app';

class SignatureView extends Component {
  static defaultProps = {
    webStyle: '',
    onOK: () => {},
    onEmpty: () => {},
    clearText: 'Clear',
    confirmText: 'Confirm',
  };

  constructor(props) {
    super(props);
    const { clearText, confirmText, webStyle } = props;
    this.state = {
      base64DataUrl: props.dataURL || null,
      isLoading: true,
    };

    const injectedJavaScript = SignaturePad + AppContent;
    let html = content(injectedJavaScript);
    html = html.replace('<%style%>', webStyle);
    html = html.replace('<%confirm%>', confirmText);
    html = html.replace('<%clear%>', clearText);

    this.source = { html };
  }

  getSignature = (e) => {
    const { onOK, onEmpty } = this.props;
    if (e.nativeEvent.data === 'EMPTY') {
      onEmpty();
    } else {
      onOK(e.nativeEvent.data);
    }
  };

  render() {
    return (
      <View style={styles.webBg}>
        <WebView
          useWebKit={true}
          source={this.source}
          onMessage={this.getSignature}
          javaScriptEnabled={true}
          onLoadEnd={() => this.setState({ isLoading: false })}
        />
      </View>
    );
  }
}

export default SignatureView;

const styles = StyleSheet.create({
  webBg: {
    width: '100%',
    backgroundColor: '#FFF',
    flex: 1,
  },
});
