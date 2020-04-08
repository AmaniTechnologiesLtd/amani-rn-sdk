import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  Linking,
  TouchableOpacity,
} from 'react-native';

import TopBar from './TopBar';
import Button from 'amani-rn-sdk/src/components/Button';
import backArrow from '../../assets/back-arrow.png';
import mainBackground from '../../assets/main-bg.png';
import Number1 from '../../assets/number-1-icon.png';
import Number2 from '../../assets/number-2-icon.png';
import Number3 from '../../assets/number-3-icon.png';
import Number4 from '../../assets/number-4-icon.png';

const { width, height } = Dimensions.get('window');

const eDevletURL =
  'https://www.turkiye.gov.tr/nvi-yerlesim-yeri-ve-diger-adres-belgesi-sorgulama';

const EDevlet = (props) => {
  const { onGoBack } = props;
  return (
    <ImageBackground source={mainBackground} style={styles.container}>
      <TopBar onLeftButtonPressed={onGoBack} leftButtonIcon={backArrow} />
      <Text style={styles.header}>
        İkametgah Belgesini E-devlet’ten Almak İçin;
      </Text>
      <View style={styles.bullet}>
        <Image source={Number1} style={styles.bulletIcon} />
        <TouchableOpacity onPress={() => Linking.openURL(eDevletURL)}>
          <Text style={styles.bulletText}>
            <Text style={{ textDecorationLine: 'underline' }}>
              {eDevletURL}
            </Text>
            <Text> adresine git</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bullet}>
        <Image source={Number2} style={styles.bulletIcon} />
        <Text style={styles.bulletText}>
          <Text style={{ fontWeight: 'bold' }}>TCKN ve e-devlet şifren</Text>{' '}
          ile giriş yap
        </Text>
      </View>
      <View style={styles.bullet}>
        <Image source={Number3} style={styles.bulletIcon} />
        <Text style={styles.bulletText}>
          <Text>"Belgenin Kimin İçin Alınacağı" sorusuna </Text>
          <Text style={{ fontWeight: 'bold' }}>"Kendisi"</Text>
          <Text>
            {` seçeneğini,\n"Belgenin Neden Verileceği" sorusuna da `}
          </Text>
          <Text style={{ fontWeight: 'bold' }}>"Kişi Talebi"</Text>
          <Text> seçeneğini seç</Text>
        </Text>
      </View>
      <View style={styles.bullet}>
        <Image source={Number4} style={styles.bulletIcon} />
        <Text style={styles.bulletText}>
          Oluşturulan ikametgâh belgesini "dosyayı indir" butonuna basarak PDF
          olarak indirebilirsin
        </Text>
      </View>
      <View style={styles.darkBackground}>
        <Text style={styles.bulletText}>
          <Text>Ya da E-posta gönder seçeneğinden </Text>
          <Text style={{ textDecorationLine: 'underline', color: 'white' }}>
            kimlik@ininal.com{' '}
          </Text>
          <Text>
            adresine e-posta gönderebilirsin. E-posta gönderdiğin takdirde
            belgenin onaylanması 15 dakika sürebilir.
          </Text>
        </Text>
      </View>
      <Button
        text="E-DEVLET'TEN AL"
        onPress={() => Linking.openURL(eDevletURL)}
        style={{ marginTop: 20 }}
      />
    </ImageBackground>
  );
};

export default EDevlet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    fontSize: height * 0.035,
    fontWeight: 'bold',
    color: 'white',
  },
  bullet: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  bulletIcon: {
    resizeMode: 'contain',
    width: width * 0.1,
    marginRight: 5,
  },
  bulletText: {
    color: 'white',
    fontSize: height * 0.02,
    flexShrink: 1,
    opacity: 0.8,
  },
  darkBackground: {
    marginTop: 20,
    backgroundColor: 'rgba(14, 37, 70, 0.6)',
    borderRadius: 10,
    padding: 10,
  },
});
