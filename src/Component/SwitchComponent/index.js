import moment from 'moment';
import React, {useState} from 'react';
import {Switch, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../utils/appTheme';
import {vh, vw} from '../../utils/dimensions';
import CircularBold from '../Texts/CircularBold';
import RubikRegular from '../Texts/RubikRegular';

const SwitchComponent = props => {
  const item = props?.data;
  const date = moment(item?.time).format('LT');
  const [isEnabled, setIsEnabled] = useState(
    item?.snooze ? item?.snooze : false,
  );

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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
        <View style={{justifyContent: 'center'}}>
          <CircularBold style={{fontSize: vh * 1.5}}>{date}</CircularBold>
        </View>

        <View
          style={{
            marginTop: vh * 2,
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <CircularBold>{item?.day}</CircularBold>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SwitchComponent;
