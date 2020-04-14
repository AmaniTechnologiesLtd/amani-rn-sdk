import React, { useState, useEffect, Fragment } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  Modal,
  TextInput,
} from 'react-native';

import { strNormalize } from '../helpers';
import TopBar from 'amani-rn-sdk/src/components/TopBar';
import mainBackground from '../../assets/main-bg.png';
import backArrow from '../../assets/back-arrow.png';
import searchIcon from '../../assets/search-icon.png';
import itemBackground from '../../assets/select-bg.png';
import forwardArrrow from '../../assets/forward-arrow.png';

const ModalPicker = (props) => {
  const {
    onClose,
    onSelected,
    items,
    selectView,
    disabled,
    selected,
    animation,
    title,
    searchable,
  } = props;

  const [show, setShow] = useState(selected);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPressPicker', () => {
      closeModal();
      return true;
    });
    return () => BackHandler.removeEventListener('hardwareBackPressPicker');
  }, []);

  const closeModal = () => {
    setShow(false);
    setFilter('');
    onClose();
  };

  const selectItem = (value) => {
    onSelected(value);
    setFilter('');
    setShow(false);
    onClose();
  };

  const showModal = () => {
    if (!disabled) {
      setShow(true);
    }
  };

  return (
    <Fragment>
      <Modal
        transparent
        statusBarTranslucent
        animationType={animation}
        visible={show}
        onRequestClose={closeModal}
        onDismiss={closeModal}>
        <ImageBackground source={mainBackground} style={styles.container}>
          <TopBar
            onLeftButtonPressed={closeModal}
            leftButtonIcon={backArrow}
            style={styles.topbar}
            title={title}
          />

          {searchable && (
            <View style={styles.searchArea}>
              <TextInput
                style={styles.searchInput}
                onChangeText={(value) =>
                  setFilter(strNormalize(value.toLowerCase('tr')))
                }
                placeholder="Ara"
                placeholderTextColor="#CAE0F5"
              />
              <Image
                resizeMode="contain"
                style={styles.searchIcon}
                source={searchIcon}
              />
            </View>
          )}

          <ScrollView>
            {items
              .filter((item) => {
                return strNormalize(item.name).toLowerCase().includes(filter);
              })
              .map((item) => {
                return (
                  <TouchableOpacity
                    key={item.name}
                    onPress={() => selectItem(item)}>
                    <ImageBackground
                      style={styles.item}
                      source={itemBackground}>
                      <Text style={styles.itemText}>{item.name}</Text>
                      <Image source={forwardArrrow} style={styles.itemArrow} />
                    </ImageBackground>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </ImageBackground>
      </Modal>

      {selectView(disabled, selected, showModal)}
    </Fragment>
  );
};

export default ModalPicker;

ModalPicker.defaultProps = {
  animation: 'slide',
  items: [],
  selected: false,
  searchable: true,
  onClose: () => {
    return null;
  },
  onSelected: () => {
    return null;
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topbar: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    marginBottom: 10,
  },
  item: {
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },
  itemText: {
    color: '#ffffff',
    paddingVertical: 15,
  },
  itemArrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  searchArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderColor: 'rgba(255, 255, 255, .3)',
    paddingBottom: 5,
  },
  searchInput: {
    color: '#ffffff',
    flex: 1,
    paddingVertical: 0,
  },
  searchIcon: {
    width: 30,
    height: 30,
  },
});
