import React from 'react';
import { Modal, View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import styles from './styles';
// import { icons } from '../../../Assets';

const CustomPicker = props => {
  const { visible, data, onHide, onPress, selectedItem, label } = props;

  return (
    <Modal
      animationType="slide"
      style={styles.modalStyle}
      transparent={true}
      visible={visible}>
      <View style={styles.mainContainerStyle}>
        <View style={[styles.itemViewStyle, props.pickerStyle]}>
          <View style={styles.chooseCrossViewStyle}>
            <Text style={styles.headingLabel}>
              Select
            </Text>
            {/* <TouchableOpacity onPress={() => onHide()} style={styles.closeBtn}>
              <Image source={icons.close} style={styles.crossIconStyle} />
            </TouchableOpacity> */}
          </View>

          <ScrollView
            style={styles.scrollViewStyle}
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}>
            {data?.map((item, index) => (
              <TouchableOpacity onPress={() => onPress(item)} style={[
                styles.textButtonStyle,
                selectedItem == item && styles.selectedButtonStyle,
              ]}>
                <Text style={[
                  styles.textStyle,
                  selectedItem == item && styles.selectedTextStyle,
                ]}>{item}</Text>
              </TouchableOpacity>
              // <TextButton
              //   key={index + Date.now()}
              //   text={item}
              //   style={[
              //     styles.textButtonStyle,
              //     selectedItem == item && styles.selectedButtonStyle,
              //   ]}
              //   textStyle={[
              //     styles.textStyle,
              //     selectedItem == item && styles.selectedTextStyle,
              //   ]}
              //   onPress={() => onPress(item)}
              // />
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CustomPicker;
