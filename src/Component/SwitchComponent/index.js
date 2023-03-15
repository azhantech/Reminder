import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { UpdateAlarm } from '../../redux/actions/AlarmAction';
import { store } from '../../redux/store';
import { colors } from '../../utils/appTheme';
import { vh, vw } from '../../utils/dimensions';
import CircularBold from '../Texts/CircularBold';
import RubikRegular from '../Texts/RubikRegular';
import { useDispatch } from 'react-redux';

const SwitchComponent = props => {
  const dispatch = useDispatch();
  const item = props?.data;
  const date = moment(item?.time).format('LT');
  const [isEnabled, setIsEnabled] = useState(
    false
  );


  const handleLatestWishList = () => {
    const current = store
      .getState().AlarmReducer.alarms.find((t) => t?.id === item?.id)
    if (current?.snooze) {
      setIsEnabled(true)
    } else {
      setIsEnabled(false)
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleLatestWishList();
    }, [])
  );

  const handleAddWishList = async (value) => {
    setIsEnabled(previousState => !previousState)
    const data = {
      id: item?.id,
      name: item?.name,
      time: item?.time,
      vibrate: item?.vibrate,
      snooze: value,
      ring: item?.ring,
      ringOnce: item?.ringOnce,
      custom: item?.custom,
    };
    await dispatch(UpdateAlarm(data));
  };

  return (
    <TouchableOpacity
      onPress={props?.onPress}
      style={{
        backgroundColor: '#fffA',
        height: vh * 10,
        width: vw * 90,
        marginBottom: vh,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 7,
        borderRadius: vw * 2,
      }}>
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
          width: '30%',
          marginLeft: vw * 4,
        }}>
        <CircularBold>{item?.name}</CircularBold>
        <RubikRegular
          style={{
            fontSize: 1.5 * vh,
            color: colors.borderBtn,
            textTransform: 'capitalize',
          }}>
          {item?.ring}
        </RubikRegular>
      </View>
      <View
        style={{
          width: '70%',
          height: '100%',
          flexDirection: 'row',
          // alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View style={{ justifyContent: 'center' }}>
          <CircularBold style={{ fontSize: vh * 1.5 }}>{date}</CircularBold>
        </View>

        <View
          style={{
            marginTop: vh * 2,
          }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <CircularBold>{item?.day}</CircularBold>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(value) => handleAddWishList(value)}
            value={isEnabled}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SwitchComponent;
