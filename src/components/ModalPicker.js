import React, { useState, useEffect, Fragment } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
  Modal,
  TextInput,
} from 'react-native';

import { strNormalize } from '../helpers';
import TopBar from './TopBar';
import backArrow from '../../assets/back-arrow.png';
import searchIcon from '../../assets/search-icon.png';
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
        animationType={animation}
        visible={show}
        onRequestClose={closeModal}
        onDismiss={closeModal}>
        <View style={styles.container}>
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
                    <View style={styles.item}>
                      <Text style={styles.itemText}>{item.name}</Text>
                      <Image source={forwardArrrow} style={styles.itemArrow} />
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
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
    backgroundColor: '#263B5B',
  },
  topbar: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  item: {
    paddingHorizontal: 20,
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
    flexDirection: 'row',
    backgroundColor: '#13283D',
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
    marginHorizontal: 10,
    marginBottom: 20,
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
