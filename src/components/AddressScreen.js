import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
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
import Button from './Button';

import ModalPicker from './ModalPicker';
import citiesJSON from '../store/cities.json';
import { trCompare } from '../helpers';
const { height } = Dimensions.get('window');

const AddressScreen = (props) => {
  const {
    onGoBack,
    customer,
    onAddressSaved,
    onUploadDocument,
    onActivity,
  } = props;
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(null);
  const [cityError, setCityError] = useState(false);
  const [districtError, setDistrictError] = useState(false);
  const [neighborhoodError, setNeighborhoodError] = useState(false);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [formData, setFormData] = useState({
    city: customer?.address?.city || null,
    district: customer?.address?.province || null,
    neighborhood: null,
    street: null,
    building: null,
    flat: null,
  });

  const sortCities = (toBeSorted) => {
    if (toBeSorted) {
      return toBeSorted.sort((a, b) => {
        const topCities = ['İstanbul', 'Ankara', 'İzmir'];

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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPressContractScreen', () => {
      onGoBack(false);
      return true;
    });

    getCities();

    return () =>
      BackHandler.removeEventListener('hardwareBackPressContractScreen');
  }, []);

  const getCities = async () => {
    setCities([]);
    setDistricts([]);

    setCities(citiesJSON);
    if (formData.city) {
      getDistricts(citiesJSON.find((city) => city.name === formData.city));
    }
  };

  const getDistricts = async (city) => {
    setDistricts([]);
    try {
      setDistricts(city.district);
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
      <View
        style={[
          styles.contactFormInput,
          disabled ? { opacity: 0.5 } : '',
          cityError ? { borderColor: '#FF5C65' } : '',
        ]}>
        <Text
          style={[
            styles.contactFormInputText,
            cityError ? { color: '#FF5C65' } : '',
          ]}>
          {formData.city || 'İl'}
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
      <View
        style={[
          styles.contactFormInput,
          disabled ? { opacity: 0.5 } : '',
          districtError ? { borderColor: '#FF5C65' } : '',
        ]}>
        <Text
          style={[
            styles.contactFormInputText,
            districtError ? { color: '#FF5C65' } : '',
          ]}>
          {formData.district || 'İlçe'}
        </Text>
        <Image
          style={styles.contactFormInputImage}
          resizeMode="contain"
          source={downArrow}
        />
      </View>
    </TouchableOpacity>
  );

  const handleFormSubmit = async () => {
    if (!formData.city) {
      setCityError(true);
      return;
    }

    if (!formData.district) {
      setDistrictError(true);
      return;
    }

    if (!formData.neighborhood) {
      setNeighborhoodError(true);
      return;
    }

    const compositeAddress = {
      city: formData.city,
      province: formData.district,
      neighborhood: formData.neighborhood ? formData.neighborhood : '',
      street: formData.street ? formData.street : '',
      buildingNumber: formData.building ? formData.building : '',
      flatNumber: formData.flat ? formData.flat : '',
      address: '',
    };

    compositeAddress.address += compositeAddress.neighborhood
      ? compositeAddress.neighborhood
      : '';
    compositeAddress.address += compositeAddress.street
      ? ` ${compositeAddress.street}`
      : '';
    compositeAddress.address += compositeAddress.buildingNumber
      ? ` Bina No: ${compositeAddress.buildingNumber}`
      : '';
    compositeAddress.address += compositeAddress.flatNumber
      ? ` İç Kapı No: ${compositeAddress.flatNumber}`
      : '';
    // compositeAddress.address += ` ${compositeAddress.province} / ${compositeAddress.city}`;

    try {
      const response = await api.createCustomer({
        id: customer.id,
        address: compositeAddress,
      });
      if (response.status === 200) {
        onAddressSaved(compositeAddress);
      }
    } catch (error) {
      setShowError('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

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
        <Text style={styles.contactFormTitle}>
          Aşağıdaki alanları doldurarak adresini doğrula veya ikametgah belgeni
          yükle
        </Text>

        <View style={styles.contactFormView}>
          <ModalPicker
            selectView={selectCityView}
            items={sortCities(cities)}
            title="İl Seç"
            onSelected={(city) => {
              setFormData({
                ...formData,
                city: city.name || null,
                district: null,
              });
              setCityError(false);
              onActivity('Adres_1');
              getDistricts(city);
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
                district: district.name || null,
              });
              setDistrictError(false);
              onActivity('Adres_2');
            }}
          />
        </View>

        <View style={styles.contactFormView}>
          <View
            style={[
              styles.contactFormInput,
              formData.district === null ? { opacity: 0.5 } : '',
              neighborhoodError ? { borderColor: '#FF5C65' } : '',
            ]}>
            <TextInput
              style={styles.contactFormInputText}
              onChangeText={(text) => {
                setFormData({ ...formData, neighborhood: text });
                setNeighborhoodError(false);
              }}
              placeholder="Mahalle / Köy / Mezra / Mevkii"
              placeholderTextColor={neighborhoodError ? '#FF5C65' : '#FFF'}
              value={formData.neighborhood}
            />
          </View>
        </View>

        <View style={styles.contactFormView}>
          <View
            style={[
              styles.contactFormInput,
              formData.district === null ? { opacity: 0.5 } : '',
            ]}>
            <TextInput
              style={styles.contactFormInputText}
              onChangeText={(text) =>
                setFormData({ ...formData, street: text })
              }
              placeholder="Cadde / Sokak"
              placeholderTextColor="#FFF"
              value={formData.street}
            />
          </View>
        </View>

        <View style={styles.contactFormView}>
          <View
            style={[
              styles.contactFormInput,
              formData.district === null ? { opacity: 0.5 } : '',
            ]}>
            <TextInput
              style={styles.contactFormInputText}
              onChangeText={(text) =>
                setFormData({ ...formData, building: text })
              }
              placeholder="Bina Numarası"
              placeholderTextColor="#FFF"
              value={formData.building}
            />
          </View>
        </View>

        <View style={styles.contactFormView}>
          <View
            style={[
              styles.contactFormInput,
              formData.district === null ? { opacity: 0.5 } : '',
            ]}>
            <TextInput
              style={styles.contactFormInputText}
              onChangeText={(text) => setFormData({ ...formData, flat: text })}
              placeholder="Kapı Numarası"
              placeholderTextColor="#FFF"
              value={formData.flat}
            />
          </View>
        </View>

        <View style={styles.bottomBar}>
          <Button
            onPress={onUploadDocument}
            text="İKAMETGAH YÜKLE"
            style={{ marginLeft: 20, flex: 1 }}
            noBackground
          />
          <Button
            onPress={handleFormSubmit}
            text="DEVAM"
            style={{ marginLeft: 10, marginRight: 20, flex: 1 }}
          />
        </View>
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
    fontSize: height * 0.023,
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
    padding: 0,
  },
  contactFormInputDisabled: {
    opacity: 0.5,
  },
  bottomBar: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
