import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import TopBar from './TopBar';
import backArrow from '../../assets/back-arrow.png';
import Button from 'amani-rn-sdk/src/components/Button';
import mainBackground from '../../assets/main-bg.png';
import blueBackground from '../../assets/btn-blue.png';
import successIcon from '../../assets/success-icon.png';

const { height } = Dimensions.get('window');

const AppliedScreen = props => {
  const { goBack, allApproved } = props;
  return (
    <ImageBackground source={mainBackground} style={styles.container}>
      <ScrollView>
        <TopBar
          onLeftButtonPressed={goBack}
          leftButtonIcon={backArrow}
          style={{ paddingHorizontal: 20 }}
        />
        <View style={styles.messageContainer}>
          <Image
            resizeMode="contain"
            style={styles.successIcon}
            source={successIcon}
          />
          {allApproved ? (
            <>
              <Text style={[styles.header, { marginBottom: 0 }]}>
                Tebrikler! Başvurun Onaylandı
              </Text>
              <Text style={[styles.header, { marginTop: 0 }]}>
                Limitin artık 20.000 TL
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.header}>Tebrikler! Başvurun Alındı</Text>
              <Text style={styles.message}>
                Belgelerini kontrol edip limitini en geç 48 saat içinde
                artıracağız.
              </Text>
            </>
          )}

          <Text style={styles.message}>
            Limit artışının kalıcı olması için ininal kullanıcı sözleşmesini
            yazdırıp, imzalayın ve
            <Text style={{ fontWeight: 'bold' }}>
              {` en geç iki hafta içerisinde `}
            </Text>
            bize kargolaman gerekiyor. Aksi durumda limitn tekrar 750 TL'ye
            düşecek.
          </Text>

          <Text style={styles.message}>
            Kayıtlı e-posta adresine sözleşmenin bir kopyasını gönderdik. Farklı
            bir e-posta adresine yollamak istersen "e-posta ile gönder"
            seçeneğini seçebilirsin.
          </Text>
        </View>

        <View style={styles.bottomBar}>
          <Button
            onPress={null}
            text="Anlaşmalı kargo firması için tıkla"
            style={styles.buttonStyle}
            backgroundImage={blueBackground}
          />
          <Button
            onPress={null}
            noBackground={true}
            text="Sözleşmeyi İndir"
            style={styles.buttonStyle}
            backgroundImage={blueBackground}
          />
          <Button
            onPress={null}
            noBackground={true}
            text="E-posta ile gönder"
            style={styles.buttonStyle}
            backgroundImage={blueBackground}
          />
          <Button
            onPress={null}
            noBackground={true}
            text="SMS ile gönder"
            style={styles.buttonStyle}
            backgroundImage={blueBackground}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default AppliedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    marginVertical: 10,
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: height * 0.035,
  },
  message: {
    color: 'white',
    marginVertical: 10,
    marginHorizontal: 10,
    fontSize: height * 0.022,
    textAlign: 'center',
    opacity: 0.8,
  },
  bottomBar: {},
  buttonStyle: {
    marginBottom: 10,
    marginHorizontal: 20,
  },
});
