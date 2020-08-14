import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import PassportReader from 'react-native-passport-reader';

// Local files
import TopBar from './TopBar';
import Button from './Button';
import backArrow from '../../assets/back-arrow.png';
import Loading from './Loading';

const { width, height } = Dimensions.get('window');

const NFC = (props) => {
  const { onGoBack, mrzData, continueProcess, onActivity } = props;

  const [nfcData, setNFCData] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [attempts, setAttempts] = useState(1);

  useEffect(() => {
    startScan();

    return async function cancel() {
      await PassportReader.cancel();
    };
  }, []);

  useEffect(() => {
    if (nfcData !== false) {
      continueProcess(nfcData);
    }
  }, [nfcData]);

  const startScan = async () => {
    const { documentNumber, dateOfBirth, dateOfExpiry } = mrzData;
    console.log(mrzData);
    setErrorMessage(false);
    try {
      const response = await PassportReader.scan({
        documentNumber,
        dateOfBirth,
        dateOfExpiry,
      });

      setNFCData(response);
    } catch (error) {
      setAttempts(attempts + 1);
      console.log(error.code, error.message);
      // If NFC is not supported continue
      if (error.code === 'E_NOT_SUPPORTED') {
        continueProcess({ status: 'not_supported' });
      } else if (error.code === 'E_NOT_ENABLED') {
        setErrorMessage(
          'Lütfen telefonunuzun NFC özelliğinin açık olduğundan emin olun',
        );
      } else if (
        error.code === 'E_SCAN_FAILED_DISCONNECT' ||
        error.message.includes('Tag was lost')
      ) {
        setErrorMessage(
          'Lütfen ekranda okundu bilgisi çıkmadan kartınızı telefondan uzaklaştırmayın',
        );
      } else if (error.message.includes('Mutual authentication failed')) {
        setErrorMessage('Fotoğrafı çekilen kartla NFC bilgileri uyuşmuyor');
      } else {
        setErrorMessage('Lütfen tekrar deneyin');
      }

      if (error.code !== 'E_SCAN_CANCELED') {
        setNFCData(false);
      }
    }
  };

  return (
    <View
      style={styles.container}
      onTouchStart={() => onActivity('TouchEvent')}>
      <TopBar
        onLeftButtonPressed={onGoBack}
        leftButtonIcon={backArrow}
        title="NFC"
      />

      {!errorMessage && !nfcData && (
        <>
          <View style={styles.messageView}>
            <Text
              style={[
                styles.messageText,
                { fontSize: width * 0.06, fontWeight: 'bold' },
              ]}>
              NFC Doğrulama
            </Text>
            <Text style={styles.messageText}>
              Kimlik kartınızı telefonun arkasına yaklaştırın
            </Text>

            <Text style={styles.messageText}>
              Okuma işlemi birkaç saniye sürebilir. Okuma sırasında lütfen
              hareket etmeyin
            </Text>

            <Text style={styles.messageText}>
              Okuma işlemi tamamlanınca bir sonraki ekran açılacaktır
            </Text>
          </View>
        </>
      )}

      {nfcData && <Loading />}

      {errorMessage && (
        <>
          <View style={styles.messageView}>
            <Text
              style={[
                styles.messageText,
                { fontSize: width * 0.06, fontWeight: 'bold' },
              ]}>
              Dikkat!
            </Text>
            <Text style={styles.messageText}>{errorMessage}</Text>
          </View>
          <View style={styles.bottomBar}>
            <Button
              text="Tekrar Dene"
              noBackground
              onPress={startScan}
              style={styles.bottomButtons}
            />
          </View>
          {attempts > 3 && (
            <View style={styles.bottomBar}>
              <Button
                text="DEVAM ET"
                onPress={() =>
                  continueProcess({
                    status: 'read_failed',
                    attempts: attempts - 1,
                  })
                }
                style={styles.bottomButtons}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default NFC;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263B5B',
    alignItems: 'center',
  },
  messageView: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 70,
    justifyContent: 'center',
  },
  messageText: {
    color: 'white',
    fontSize: width * 0.05,
    paddingVertical: 20,
    textAlign: 'center',
  },
  errorMessageText: {
    color: 'white',
    fontSize: width * 0.04,
    textAlign: 'center',
  },
  bottomBar: {
    height: height * 0.07,
    width: width * 0.85,
    flexDirection: 'row',
    marginBottom: 20,
  },
  bottomButtons: {
    flex: 1,
  },
});
