import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { BlurView } from '@react-native-community/blur';
import DatePicker from 'react-native-date-picker';
import { vw, vh } from '../../utils/dimensions';

class DatePickerPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: '',
      dateSelected: new Date(),
    };
  }
  setNewDate = newDate => {
    this.setState({
      dateSelected: new Date(newDate),
    });
  };
  show = () => {
    this.setState(prev => {
      return {
        ...prev,
        visible: true,
      };
    });
  };

  hide = () => {
    this.setState(prev => {
      return {
        ...prev,
        visible: false,
      };
    });

    // if (this.props.onCancel) {
    //   this.props.onCancel();
    // }
  };

  // _onYes = () => {
  //   this.hide();

  //   // if (this.props.onYes) {
  //   //   this.props.onYes();
  //   // }
  // };
  confirmDate = () => {
    this.hide();
    if (this.props.onYes) {
      this.props.onYes(this.state.dateSelected);
    }
  };

  render() {
    return (
      <Modal
        key="DatePickerPopUp"
        visible={this.state.visible}
        style={styles.container}
        animationType={'slide'}
        transparent={true}>
        <TouchableOpacity onPress={this.hide}>
          {/* <BlurView
            style={styles.backDrop}
            blurType="dark"
            blurAmount={8}
            reducedTransparencyFallbackColor="white"
          /> */}
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          {/* <TouchableOpacity onPress={this.hide} style={styles.crossContainer}> */}
          {/* <Image source={icons.cross} /> */}
          <View
            style={{
              width: vw * 86,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: vh * 2,

            }}>
            <TouchableOpacity onPress={() => this.hide()}>
              <Text style={{ color: '#fff' }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.confirmDate()}>
              <Text style={{ color: '#fff' }}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
          <DatePicker
            {...this.props}
            date={this.state.dateSelected}
            onDateChange={date => this.setNewDate(date)}
            textColor={'#fff'}
            fadeToColor={'none'}
            mode={this.props?.date ? 'date' : 'time'}
            maximumDate={this?.props?.maximumDate}
            minimumDate={this?.props?.minimumDate}
          />
        </View>
      </Modal>
    );
  }
}
export default DatePickerPopUp;
