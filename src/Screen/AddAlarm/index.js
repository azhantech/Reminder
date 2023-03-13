import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CircularBold from '../../Component/Texts/CircularBold';
import {colors} from '../../utils/appTheme';
import {vh, vw} from '../../utils/dimensions';

const AddAlarm = () => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: vh * 30,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: vw * 1,
          borderColor: colors.white,
        }}>
        <CircularBold style={{fontSize: vh * 7, color: colors.white}}>
          5:00 PM
        </CircularBold>
      </View>
      <View
        style={{
          height: vh * 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          style={{
            width: vw * 40,
            height: vh * 6,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: vw * 2,
            shadowColor: colors.white,
            elevation: 5,
          }}>
          <CircularBold>Select Time</CircularBold>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: vw * 40,
            height: vh * 6,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: vw * 2,
            shadowColor: colors.white,
            elevation: 5,
          }}>
          <CircularBold>Select Sound</CircularBold>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddAlarm;
