import moment from 'moment';
import React, { useState, useRef } from 'react';
import {
  View,
  Switch,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { icons } from '../../assets/images';
import CustomPicker from '../../Component/CustomerPicker';
import DatePickerPopUp from '../../Component/DatePickerPopUp';
import CircularBold from '../../Component/Texts/CircularBold';
import {
  AddAlarmAction,
  removeAlaramAction,
  UpdateAlarm,
} from '../../redux/actions/AlarmAction';
import { colors } from '../../utils/appTheme';
import { vh, vw } from '../../utils/dimensions';

const EditAlarm = ({ navigation, route }) => {
  const itemDetails = route?.params?.item;
  console.log(itemDetails, 'itemDetailsitemDetails');
  const dispatch = useDispatch();
  const repeatData = [
    'Every Sunday',
    'Every Monday',
    'Every Tuesday',
    'Every Wednesday',
    'Every Thursday',
    'Every Friday',
    'Every Saturday',
  ];
  const dateRef = useRef(null);
  const [time, setTime] = useState(itemDetails?.time);
  const [name, setName] = useState(itemDetails?.name);
  const [ringOnce, setRingOnce] = useState(itemDetails?.ringOnce);
  const [custom, setCustom] = useState(itemDetails?.custom);
  const [isVibrateEnabled, setIsVibrateEnabled] = useState(
    itemDetails?.vibrate,
  );
  const [isSnoozeEnabled, setIsSnoozeEnabled] = useState(itemDetails?.snooze);
  const formattedToDate = moment(new Date(time)).format('hh:mm A');
  const [repeatPicker, setRepeatPicker] = useState(false);
  const [selectedRepeatValue, setSelectedRepeatValue] = useState(
    itemDetails?.ring,
  );

  const toggleVibrateSwitch = () =>
    setIsVibrateEnabled(previousState => !previousState);
  const toggleSnoozeSwitch = () =>
    setIsSnoozeEnabled(previousState => !previousState);
  const toggleRingOnce = () => {
    setRingOnce(!ringOnce);
    setCustom(!custom);
  };

  const handleItem = item => {
    setSelectedRepeatValue(item);
    setTimeout(() => {
      setRepeatPicker(false);
    }, 500);
  };


  const handleOnSubmit = async () => {
    const data = {
      id: itemDetails?.id,
      name,
      time,
      vibrate: isVibrateEnabled,
      snooze: isSnoozeEnabled,
      ring: custom ? selectedRepeatValue : 'ring once',
      ringOnce: ringOnce,
      custom: custom,
    };
    console.log(data, 'dataaaaa')
    await dispatch(UpdateAlarm(data));
    navigation.goBack();
  };

  const handleDeleteReminder = async () => {
    await dispatch(removeAlaramAction(itemDetails?.id));
    navigation.goBack();
  };

  const renderTime = () => {
    return (
      <TouchableOpacity
        onPress={() => dateRef.current.show()}
        style={{
          height: vh * 30,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: vw * 1,
          borderColor: colors.white,
        }}>
        <CircularBold style={{ fontSize: vh * 7, color: colors.white }}>
          {formattedToDate}
        </CircularBold>
      </TouchableOpacity>
    );
  };

  const renderButtons = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 85 * vw,
          marginTop: 2 * vh,
          marginBottom: 4 * vh,
        }}>
        <TouchableOpacity
          onPress={toggleRingOnce}
          style={{
            backgroundColor: ringOnce ? colors.white : colors.drawerBlack,
            padding: 1 * vh,
            borderRadius: 4 * vh,
            width: 40 * vw,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: ringOnce ? colors.drawerBlack : colors.white }}>
            Ring Once
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleRingOnce}
          style={{
            backgroundColor: custom ? colors.white : colors.drawerBlack,
            padding: 1 * vh,
            borderRadius: 4 * vh,
            width: 40 * vw,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: custom ? colors.drawerBlack : colors.white }}>
            Custom
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderRepat = () => {
    return (
      <TouchableOpacity
        onPress={setRepeatPicker}
        style={{
          justifyContent: 'center',
          width: 85 * vw,
        }}>
        <Text
          style={{
            color: colors.white,
            marginTop: 2 * vh,
            marginBottom: 1 * vh,
            fontSize: 1.8 * vh,
          }}>
          Repeat
        </Text>
        <Text
          style={{
            color: colors.grey,
            fontSize: vh * 1.5,
            marginBottom: 2 * vh,
          }}>
          {' '}
          {selectedRepeatValue ? selectedRepeatValue : 'Select'}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderAlarmTitle = () => {
    return (
      <View>
        <Text style={{ color: colors.white }}>Alarm Name</Text>
        <TextInput
          value={name}
          onChangeText={text => setName(text)}
          style={{
            width: 85 * vw,
            borderBottomWidth: 1,
            borderBottomColor: '#ffffff',
            marginTop: 1 * vh,
            color: colors.white,
            fontSize: vh * 2.5,
          }}
        />
      </View>
    );
  };

  const renderSwitches = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 85 * vw,
            justifyContent: 'space-between',
            marginTop: 2 * vh,
          }}>
          <Text style={{ color: colors.white }}> Virabte</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isVibrateEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleVibrateSwitch}
            value={isVibrateEnabled}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 85 * vw,
            justifyContent: 'space-between',
            marginTop: 2 * vh,
          }}>
          <Text style={{ color: colors.white }}> Snooze</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isSnoozeEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSnoozeSwitch}
            value={isSnoozeEnabled}
          />
        </View>
      </View>
    );
  };

  const renderDeleteAlarm = () => {
    return (
      <TouchableOpacity
        onPress={handleDeleteReminder}
        style={{
          backgroundColor: colors.white,
          height: vw * 20,
          width: vw * 20,
          marginBottom: vh,
          elevation: 7,
          borderRadius: vw * 10,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 8 * vh,
          right: 0,
          marginRight: vw * 5,
        }}>
        <Image source={icons.delete} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <DatePickerPopUp
        ref={e => (dateRef.current = e)}
        onYes={date => setTime(date)}
      // minimumDate={moment().toDate()}
      />

      <CustomPicker
        data={repeatData}
        visible={repeatPicker}
        onHide={() => setRepeatPicker(false)}
        onPress={item => handleItem(item)}
        selectedItem={selectedRepeatValue}
      // pickerStyle={styles.pickerStyle}
      />
      {renderTime()}
      <View
        style={{
          width: 80 * vw,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 2 * vh,
        }}>
        {renderButtons()}
        {custom && renderRepat()}
        {renderAlarmTitle()}
        {renderSwitches()}
      </View>
      <View
        style={{
          height: vh * 10,
          width: vw * 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.drawerBlack,
            width: vw * 30,
            height: vw * 10,
            borderRadius: vw * 2,
            shadowColor: 'white',
            elevation: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleOnSubmit}>
          <CircularBold style={{ color: colors.white }}>UPDATE</CircularBold>
        </TouchableOpacity>
      </View>
      {renderDeleteAlarm()}
    </View>
  );
};

export default EditAlarm;
