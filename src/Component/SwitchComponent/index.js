import moment from 'moment';
import React, {useState} from 'react';
import {Switch, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../utils/appTheme';
import {vh, vw} from '../../utils/dimensions';
import CircularBold from '../Texts/CircularBold';

const SwitchComponent = props => {
  const item = props?.data;
  const date = moment(item).format('DD MM YYYY A');
  const [isEnabled, setIsEnabled] = useState(
    item?.snooze ? item?.snooze : false,
  );

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View
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
          alignItems: 'center',
        }}>
        <CircularBold>{item?.name}</CircularBold>
      </View>
      <View
        style={{
          width: '70%',
          height: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View style={{justifyContent: 'center'}}>
          <CircularBold style={{fontSize: vh * 1.5}}>{date}</CircularBold>
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
  );
};

export default SwitchComponent;
