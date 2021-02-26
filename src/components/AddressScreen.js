import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  BackHandler,
  Dimensions,
} from 'react-native';

// Local files
import api from '../services/api';
import TopBar from './TopBar';
import mainBackground from '../../assets/main-bg.png';
import backArrow from '../../assets/back-arrow.png';
import downArrow from '../../assets/down-arrow.png';
import Loading from './Loading';
import MessageScreen from './MessageScreen';

import ModalPicker from './ModalPicker';
import { trCompare } from '../helpers';
const { height } = Dimensions.get('window');

const AddressScreen = (props) => {
  const { onGoBack, customer, onAddressVerified, onActivity } = props;
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(null);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [streets, setStreets] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [flats, setFlats] = useState([]);
  const [formData, setFormData] = useState({
    city: null,
    district: null,
    neighborhood: null,
    street: null,
    building: null,
    flat: null,
    addressNumber: null,
  });

  const sortCities = (toBeSorted) => {
    if (toBeSorted) {
      return toBeSorted.sort((a, b) => {
        const topCities = ['İSTANBUL', 'ANKARA', 'İZMİR'];

        if (topCities.includes(a.name) && topCities.includes(b.name)) {
          return topCities.indexOf(a.name) - topCities.indexOf(b.name);
        } else if (topCities.includes(a.name)) {
          return -1;
        } else if (topCities.includes(b.name)) {
          return 1;
        } else {
          return trCompare(a.name, b.name);
        }
      });
    }

    return toBeSorted;
  };

  const sortNames = (items) => {
    return items.sort((a, b) => trCompare(a.name, b.name));
  };

  const sortNumbers = (items) => {
    return items.sort((a, b) => parseInt(a.name, 10) - parseInt(b.name, 10));
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPressContractScreen', () => {
      onGoBack(false);
      return true;
    });

    getCities();

    return () =>
      BackHandler.removeEventListener('hardwareBackPressContractScreen');
  }, []);

  useEffect(() => {
    if (formData.addressNumber) {
      verifyAddress();
    }
  }, [formData]);

  const getCities = async () => {
    setCities([]);
    setDistricts([]);
    setNeighborhoods([]);
    setStreets([]);
    setBuildings([]);
    setFlats([]);
    try {
      const response = await api.getCities();
      setCities(response.data.data);
    } catch (error) {
      setLoading(false);
      setShowError('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const getDistricts = async (city) => {
    setDistricts([]);
    setNeighborhoods([]);
    setStreets([]);
    setBuildings([]);
    setFlats([]);
    try {
      const response = await api.getDistricts(city);
      setDistricts(response.data.data);
    } catch (error) {
      setLoading(false);
      setShowError('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const getNeighborhoods = async (district) => {
    setNeighborhoods([]);
    setStreets([]);
    setBuildings([]);
    setFlats([]);
    try {
      const response = await api.getNeighborhoods(district);
      setNeighborhoods(response.data.data);
    } catch (error) {
      setLoading(false);
      setShowError('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const getStreets = async (neighborhood) => {
    setStreets([]);
    setBuildings([]);
    setFlats([]);
    try {
      const response = await api.getStreets(
        formData.district.code,
        neighborhood,
      );
      setStreets(response.data.data);
    } catch (error) {
      setLoading(false);
      setShowError('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const getBuildings = async (street) => {
    setBuildings([]);
    setFlats([]);
    try {
      const response = await api.getBuildings(street);
      setBuildings(response.data.data);
    } catch (error) {
      setLoading(false);
      setShowError('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const getFlats = async (building) => {
    setFlats([]);
    try {
      const {
        data: { data },
      } = await api.getFlats(building.code);

      if (data.length === 0) {
        setShowError(
          'Bu binada mesken olarak kullanılabilir bir daire bulunamadı.',
        );
      } else if (data.length === 1 && data[0].address_no) {
        setFormData({
          ...formData,
          building,
          flat: data[0],
          addressNumber: data[0].address_no,
        });
      } else {
        setFlats(data);
      }
    } catch (error) {
      setLoading(false);
      setShowError('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const verifyAddress = async () => {
    setLoading(true);
    try {
      const { data } = await api.verifyAddress(
        customer.id,
        formData.addressNumber,
        formData.district.code,
        formData,
      );
      setLoading(false);

      if (data?.data) {
        onActivity('Adres_Succ');
        onAddressVerified();
      } else {
        onActivity('Adres_Fail', 'TCKN adress uyumsuzlugu');
        setShowError(
          'Adresiniz doğrulanamadı. Lütfen gerekli alanları seçerek tekrar deneyin.',
        );
      }
    } catch (error) {
      setLoading(false);
      setShowError('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const selectCityView = (disabled, selected, showModal) => (
    <TouchableOpacity
      disabled={disabled}
      onPress={showModal}
      style={{ width: '100%' }}>
      <View style={[styles.contactFormInput, disabled ? { opacity: 0.5 } : '']}>
        <Text style={styles.contactFormInputText}>
          {formData.city?.name || 'İl'}
        </Text>
        <Image
          style={styles.contactFormInputImage}
          resizeMode="contain"
          source={downArrow}
        />
      </View>
    </TouchableOpacity>
  );

  const selectDistrictView = (disabled, selected, showModal) => (
    <TouchableOpacity
      style={{ width: '100%' }}
      disabled={disabled}
      onPress={showModal}>
      <View style={[styles.contactFormInput, disabled ? { opacity: 0.5 } : '']}>
        <Text style={styles.contactFormInputText}>
          {formData.district?.name || 'İlçe'}
        </Text>
        <Image
          style={styles.contactFormInputImage}
          resizeMode="contain"
          source={downArrow}
        />
      </View>
    </TouchableOpacity>
  );

  const selectNeighborhoodView = (disabled, selected, showModal) => (
    <TouchableOpacity
      style={{ width: '100%' }}
      disabled={disabled}
      onPress={showModal}>
      <View style={[styles.contactFormInput, disabled ? { opacity: 0.5 } : '']}>
        <Text style={styles.contactFormInputText}>
          {formData.neighborhood?.name || 'Mahalle / Köy / Mezra / Mevki'}
        </Text>
        <Image
          style={styles.contactFormInputImage}
          resizeMode="contain"
          source={downArrow}
        />
      </View>
    </TouchableOpacity>
  );

  const selectStreetView = (disabled, selected, showModal) => (
    <TouchableOpacity
      style={{ width: '100%' }}
      disabled={disabled}
      onPress={showModal}>
      <View style={[styles.contactFormInput, disabled ? { opacity: 0.5 } : '']}>
        <Text style={styles.contactFormInputText}>
          {formData.street?.name || 'Cadde / Sokak'}
        </Text>
        <Image
          style={styles.contactFormInputImage}
          resizeMode="contain"
          source={downArrow}
        />
      </View>
    </TouchableOpacity>
  );

  const selectBuildingView = (disabled, selected, showModal) => (
    <TouchableOpacity
      style={{ width: '100%' }}
      disabled={disabled}
      onPress={showModal}>
      <View style={[styles.contactFormInput, disabled ? { opacity: 0.5 } : '']}>
        <Text style={styles.contactFormInputText}>
          {formData.building?.name || 'Bina Numarası'}
        </Text>
        <Image
          style={styles.contactFormInputImage}
          resizeMode="contain"
          source={downArrow}
        />
      </View>
    </TouchableOpacity>
  );

  const selectFlatView = (disabled, selected, showModal) => (
    <TouchableOpacity
      style={{ width: '100%' }}
      disabled={disabled}
      onPress={showModal}>
      <View style={[styles.contactFormInput, disabled ? { opacity: 0.5 } : '']}>
        <Text style={styles.contactFormInputText}>
          {formData.flat?.name || 'Kapı Numarası'}
        </Text>
        <Image
          style={styles.contactFormInputImage}
          resizeMode="contain"
          source={downArrow}
        />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <Loading />;
  }

  if (showError) {
    return (
      <MessageScreen
        type="error"
        header="Dikkat!"
        title={showError}
        buttonText="DEVAM"
        onClick={() => setShowError(null)}
      />
    );
  }

  return (
    <ImageBackground source={mainBackground} style={styles.container}>
      <TopBar
        onLeftButtonPressed={onGoBack}
        leftButtonIcon={backArrow}
        title="Adresini Doğrula"
      />
      <ScrollView
        style={styles.contactForm}
        onTouchStart={() => onActivity('TouchEvent')}>
        {/* <Text style={styles.contactFormTitle}>
          Adres numaranızı biliyorsanız aşağıdaki alanı doldurarak devam tuşuna
          basabilirsiniz.
        </Text>

        <View style={styles.contactFormView}>
          <TextInput
            style={[
              styles.contactFormInput,
              {
                color: formData.addressNumber ? 'white' : '#CAE0F5',
              },
              formErrors && !formData.addressNumber ? styles.inputError : {},
            ]}
            onChangeText={(value) => {
              setFormData({
                ...formData,
                addressNumber: value.replace(/[^0-9]/g, ''),
              });
            }}
            value={formData.addressNumber}
            keyboardType="numeric"
            placeholder="Adres No"
            placeholderTextColor="#CAE0F5"
          />
        </View>
        <Text style={styles.contactFormTitle}>
          Bilmiyorsanız aşağıdaki alanları doldurarak adresininizi
          doğrulayabilirsiniz.
        </Text>
        */}
        <Text style={styles.contactFormTitle}>
          Aşağıdaki alanları doldurarak adresini doğrula
        </Text>

        <View style={styles.contactFormView}>
          <ModalPicker
            selectView={selectCityView}
            items={sortCities(cities)}
            title="İl Seç"
            onSelected={(city) => {
              setFormData({
                ...formData,
                city: city || null,
                district: null,
                neighborhood: null,
                street: null,
                building: null,
                flat: null,
                addressNumber: null,
              });
              onActivity('Adres_1');
              getDistricts(city.code);
            }}
          />
        </View>

        <View style={styles.contactFormView}>
          <ModalPicker
            disabled={!formData.city}
            selectView={selectDistrictView}
            title="İlçe Seç"
            items={sortNames(districts)}
            onSelected={(district) => {
              setFormData({
                ...formData,
                district: district || null,
                neighborhood: null,
                street: null,
                building: null,
                flat: null,
                addressNumber: null,
              });
              onActivity('Adres_2');
              getNeighborhoods(district.code);
            }}
          />
        </View>

        <View style={styles.contactFormView}>
          <ModalPicker
            disabled={!formData.district || districts.length === 0}
            selectView={selectNeighborhoodView}
            title="Mahalle Seç"
            items={sortNames(neighborhoods)}
            onSelected={(neighborhood) => {
              setFormData({
                ...formData,
                neighborhood: neighborhood || null,
                street: null,
                building: null,
                flat: null,
                addressNumber: null,
              });
              onActivity('Adres_3');
              getStreets(neighborhood.code);
            }}
          />
        </View>

        <View style={styles.contactFormView}>
          <ModalPicker
            disabled={!formData.neighborhood || neighborhoods.length === 0}
            selectView={selectStreetView}
            title="Cadde/Sokak Seç"
            items={sortNames(streets)}
            onSelected={(street) => {
              setFormData({
                ...formData,
                street: street || null,
                building: null,
                flat: null,
                addressNumber: null,
              });
              onActivity('Adres_4');
              getBuildings(street.code);
            }}
          />
        </View>

        <View style={styles.contactFormView}>
          <ModalPicker
            disabled={!formData.street || buildings.length === 0}
            selectView={selectBuildingView}
            title="Bina Numarası"
            items={sortNames(buildings)}
            onSelected={(building) => {
              setFormData({
                ...formData,
                building: building || null,
                flat: null,
                addressNumber: null,
              });
              onActivity('Adres_5');
              getFlats(building);
            }}
          />
        </View>

        <View style={styles.contactFormView}>
          <ModalPicker
            disabled={!formData.building || flats.length === 0}
            selectView={selectFlatView}
            title="Kapı Numarası"
            items={sortNumbers(flats)}
            onSelected={(flat) => {
              onActivity('Adres_6');
              setFormData({
                ...formData,
                flat: flat || null,
                addressNumber: flat?.address_no || null,
              });
            }}
          />
        </View>

        {/* <Button
          onPress={handleFormSubmit}
          text="DEVAM"
          style={{ marginHorizontal: 20, marginBottom: 10 }}
        /> */}
      </ScrollView>
    </ImageBackground>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contactForm: {
    flex: 1,
    paddingBottom: 20,
  },
  contactFormView: {
    alignItems: 'center',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  contactFormTitle: {
    fontSize: height * 0.025,
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  contactFormInput: {
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: 'rgba(255, 255, 255, .3)',
    color: '#FFFFFF',
    flexDirection: 'row',
  },
  inputError: {
    color: '#FF5C65',
  },
  contactFormInputImage: {
    width: 20,
    height: 20,
  },
  contactFormInputText: {
    color: '#FFFFFF',
    flex: 1,
  },
  contactFormInputDisabled: {
    opacity: 0.5,
  },
});
