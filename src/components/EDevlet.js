import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Linking,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import TopBar from './TopBar';
import Button from './Button';
import backArrow from '../../assets/back-arrow.png';
import Number1 from '../../assets/number-1-icon.png';
import Number2 from '../../assets/number-2-icon.png';
import Number3 from '../../assets/number-3-icon.png';
import Number4 from '../../assets/number-4-icon.png';

const { width, height } = Dimensions.get('window');

const eDevletURL =
  'https://www.turkiye.gov.tr/nvi-yerlesim-yeri-ve-diger-adres-belgesi-sorgulama';

const EDevlet = (props) => {
  const { onGoBack, onActivity } = props;
  useEffect(() => {
    BackHandler.addEventListener('eDevletBackPress', () => {
      onGoBack();
      return true;
    });
    return () => BackHandler.removeEventListener('eDevletBackPress');
  }, []);

  return (
    <View style={styles.container}>
      <TopBar
        onLeftButtonPressed={onGoBack}
        leftButtonIcon={backArrow}
        noBackground
        style={styles.topBar}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        onTouchStart={() => onActivity('TouchEvent')}>
        <Text style={styles.header}>
          İkametgah Belgesini E-devlet’ten Almak İçin;
        </Text>
        <View style={styles.bullet}>
          <Image source={Number1} style={styles.bulletIcon} />
          <TouchableOpacity onPress={() => Linking.openURL(eDevletURL)}>
            <Text style={styles.bulletText}>
              <Text style={{ textDecorationLine: 'underline' }}>
                https://www.turkiye.gov.tr
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
            <Text style={{ fontWeight: 'bold' }}>"Kuruma İbraz"</Text>
            <Text> seçeneğini seç. Kurum adı olarak </Text>
            <Text style={{ fontWeight: 'bold' }}>"İninal"</Text>
            <Text> yaz</Text>
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
            <Text>adresine e-posta gönderebilirsin.</Text>
          </Text>
        </View>
        <Button
          text="E-DEVLET'TEN AL"
          onPress={() => {
            onActivity('Ikm_Edev_Al');
            Linking.openURL(eDevletURL);
          }}
          style={{ marginVertical: 20 }}
        />
      </ScrollView>
    </View>
  );
};

export default EDevlet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263B5B',
  },
  topBar: {
    paddingTop: height * 0.03,
    paddingBottom: height * 0.02,
    paddingHorizontal: width * 0.04,
  },
  scrollContainer: {
    paddingHorizontal: width * 0.04,
  },
  header: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: 'white',
  },
  bullet: {
    flexDirection: 'row',
    marginTop: height * 0.01,
    alignItems: 'center',
    overflow: 'hidden',
  },
  bulletIcon: {
    resizeMode: 'contain',
    width: width * 0.1,
    marginRight: 5,
  },
  bulletText: {
    color: 'white',
    fontSize: height * 0.022,
    flexShrink: 1,
    opacity: 0.8,
  },
  darkBackground: {
    marginTop: height * 0.03,
    backgroundColor: 'rgba(14, 37, 70, 0.6)',
    borderRadius: 10,
    padding: 10,
  },
});
