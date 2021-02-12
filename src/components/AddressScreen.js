import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  StyleSheet,
  BackHandler,
  Dimensions,
} from 'react-native';

// Local files
import api from '../services/api';
import TopBar from './TopBar';
import mainBackground from '../../assets/main-bg.png';
import backArrow from '../../assets/back-arrow.png';

import ModalPicker from './ModalPicker';
import { trCompare } from '../helpers';
const { height } = Dimensions.get('window');

const AddressScreen = (props) => {
  const { onGoBack, customer, onAddressVerified, onActivity } = props;
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
    setDistricts([]);
    setNeighborhoods([]);
    setStreets([]);
    setBuildings([]);
    setFlats([]);
    try {
      const response = await api.getCities();
      setCities(response.data.data);
    } catch (error) {}
  };

  const getDistricts = async (city) => {
    setNeighborhoods([]);
    setStreets([]);
    setBuildings([]);
    setFlats([]);
    try {
      const response = await api.getDistricts(city);
      setDistricts(response.data.data);
    } catch (error) {}
  };

  const getNeighborhoods = async (district) => {
    setStreets([]);
    setBuildings([]);
    setFlats([]);
    try {
      const response = await api.getNeighborhoods(district);
      setNeighborhoods(response.data.data);
    } catch (error) {}
  };

  const getStreets = async (neighborhood) => {
    setBuildings([]);
    setFlats([]);
    try {
      const response = await api.getStreets(
        formData.district.code,
        neighborhood,
      );
      setStreets(response.data.data);
    } catch (error) {}
  };

  const getBuildings = async (street) => {
    setFlats([]);
    try {
      const response = await api.getBuildings(street);
      setBuildings(response.data.data);
    } catch (error) {}
  };

  const getFlats = async (building) => {
    try {
      const {
        data: { data },
      } = await api.getFlats(building.code);

      if (data.length === 1 && data[0].address_no) {
        setFormData({
          ...formData,
          building,
          flat: data[0],
          addressNumber: data[0].address_no,
        });
      } else {
        setFormData({
          ...formData,
          building: building || null,
          flat: null,
          addressNumber: null,
        });
        setFlats(data);
      }
    } catch (error) {}
  };

  const verifyAddress = async () => {
    try {
      const { data } = await api.verifyAddress(
        customer.id,
        formData.addressNumber,
        formData.district.code,
        formData,
      );
      if (data?.data) {
        onAddressVerified();
      } else {
        Alert.alert(
          '',
          'Adresiniz doğrulanamadı. Lütfen gerekli alanları seçerek tekrar deneyin.',
          [{ text: 'Anladım' }],
          { cancelable: false },
        );
      }
    } catch (error) {
      Alert.alert(
        '',
        'Bir hata oluştu. Lütfen tekrar deneyin.',
        [{ text: 'Anladım' }],
        { cancelable: false },
      );
    }
  };

  const selectCityView = (disabled, selected, showModal) => (
    <TouchableOpacity
      disabled={disabled}
      onPress={showModal}
      style={{ width: '100%' }}>
      <View style={styles.contactFormInput}>
        <Text
          style={[
            styles.contactFormInputText,
            disabled ? { opacity: 0.5 } : '',
          ]}>
          {formData.city?.name || 'İl'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const selectDistrictView = (disabled, selected, showModal) => (
    <TouchableOpacity
      style={{ width: '100%' }}
      disabled={disabled}
      onPress={showModal}>
      <View style={styles.contactFormInput}>
        <Text
          style={[
            styles.contactFormInputText,
            disabled ? { opacity: 0.5 } : '',
          ]}>
          {formData.district?.name || 'İlçe'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const selectNeighborhoodView = (disabled, selected, showModal) => (
    <TouchableOpacity
      style={{ width: '100%' }}
      disabled={disabled}
      onPress={showModal}>
      <View style={styles.contactFormInput}>
        <Text
          style={[
            styles.contactFormInputText,
            disabled ? { opacity: 0.5 } : '',
          ]}>
          {formData.neighborhood?.name || 'Mahalle / Köy / Mezra / Mevki'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const selectStreetView = (disabled, selected, showModal) => (
    <TouchableOpacity
      style={{ width: '100%' }}
      disabled={disabled}
      onPress={showModal}>
      <View style={styles.contactFormInput}>
        <Text
          style={[
            styles.contactFormInputText,
            disabled ? { opacity: 0.5 } : '',
          ]}>
          {formData.street?.name || 'Cadde / Sokak'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const selectBuildingView = (disabled, selected, showModal) => (
    <TouchableOpacity
      style={{ width: '100%' }}
      disabled={disabled}
      onPress={showModal}>
      <View style={styles.contactFormInput}>
        <Text
          style={[
            styles.contactFormInputText,
            disabled ? { opacity: 0.5 } : '',
          ]}>
          {formData.building?.name || 'Bina Numarası'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const selectFlatView = (disabled, selected, showModal) => (
    <TouchableOpacity
      style={{ width: '100%' }}
      disabled={disabled}
      onPress={showModal}>
      <View style={styles.contactFormInput}>
        <Text
          style={[
            styles.contactFormInputText,
            disabled ? { opacity: 0.5 } : '',
          ]}>
          {formData.flat?.name || 'Kapı Numarası'}
        </Text>
      </View>
    </TouchableOpacity>
  );

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
    paddingBottom: 10,
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
  },
  inputError: {
    color: '#FF5C65',
  },
  contactFormInputText: {
    color: '#FFFFFF',
  },
  contactFormInputDisabled: {
    opacity: 0.5,
  },
  charCount: {
    color: '#76889B',
    fontSize: height * 0.02,
    marginTop: 3,
    alignSelf: 'flex-start',
  },
  customCheckboxOutline: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 50,
    width: height * 0.035,
    height: height * 0.035,
    marginLeft: 5,
  },
  customCheckboxInline: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxIOS: {
    width: height * 0.03,
    height: height * 0.03,
    marginRight: 10,
  },
  addressNote: {
    color: 'white',
  },
  addresNoteBackground: {
    margin: 20,
    padding: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bottomBar: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#263B5B',
  },
  approveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  approveButtonText: {
    color: 'white',
    paddingRight: 20,
  },
  bottomBarButton: {
    width: '100%',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  bottomBarButtonBackground: {
    paddingVertical: 20,
    resizeMode: 'cover',
    alignItems: 'center',
  },
});
