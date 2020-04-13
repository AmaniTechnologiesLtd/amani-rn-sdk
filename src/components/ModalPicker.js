import React, { useState, useEffect, Fragment } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  Modal,
  TextInput,
} from 'react-native';

import TopBar from 'amani-rn-sdk/src/components/TopBar';
import mainBackground from '../../assets/main-bg.png';
import backArrow from '../../assets/back-arrow.png';

const ModalPicker = (props) => {
  const {
    onClose,
    onSelected,
    items,
    selectView,
    disabled,
    selected,
    animation,
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

  const topbarMiddle = (
    <TextInput
      style={styles.searchInput}
      onChangeText={setFilter}
      placeholder="Ara"
      placeholderTextColor="#CAE0F5"
    />
  );

  return (
    <Fragment>
      <Modal
        transparent
        animationType={animation}
        visible={show}
        onRequestClose={closeModal}
        onDismiss={closeModal}
        statusBarTranslucent={true}>
        <ImageBackground source={mainBackground} style={styles.container}>
          <TopBar
            onLeftButtonPressed={closeModal}
            leftButtonIcon={backArrow}
            style={styles.topbar}
            middleComponent={topbarMiddle}
          />
          <ScrollView>
            {items
              .filter((item) =>
                item.name.toLowerCase().includes(filter.toLowerCase()),
              )
              .map((item) => {
                return (
                  <View style={styles.item} key={item.name}>
                    <TouchableOpacity
                      style={styles.itemTouch}
                      onPress={() => selectItem(item)}>
                      <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
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
    justifyContent: 'center',
    alignContent: 'center',
  },
  topbar: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  item: {
    marginHorizontal: 20,
    borderColor: 'rgba(255, 255, 255, .3)',
    borderBottomWidth: 2,
  },
  itemTouch: {
    paddingVertical: 15,
  },
  itemText: {
    color: '#ffffff',
  },
  searchInput: {
    color: '#ffffff',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, .3)',
    flex: 1,
    borderRadius: 10,
    padding: 10,
    paddingVertical: 5,
  },
});
