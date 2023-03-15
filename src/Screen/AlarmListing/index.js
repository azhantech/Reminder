import React from 'react';
import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import SwitchComponent from '../../Component/SwitchComponent';
import CircularBold from '../../Component/Texts/CircularBold';
import { colors } from '../../utils/appTheme';
import { vh, vw } from '../../utils/dimensions';

const AlarmList = ({ navigation }) => {
  const datas = useSelector(state => state?.AlarmReducer?.alarms);
  console.log('Datasasdas ==========>', datas);
  const data = [
    { id: 1, name: '5:00 am', day: 'Mon, 13 Mar' },
    { id: 2, name: '5:00 am', day: 'Mon, 13 Mar' },
    { id: 3, name: '5:00 am', day: 'Mon, 13 Mar' },
    { id: 4, name: '5:00 am', day: 'Mon, 13 Mar' },
    { id: 5, name: '5:00 am', day: 'Mon, 13 Mar' },
    { id: 6, name: '5:00 am', day: 'Mon, 13 Mar' },
    { id: 7, name: '5:00 am', day: 'Mon, 13 Mar' },
    { id: 8, name: '5:00 am', day: 'Mon, 13 Mar' },
    { id: 9, name: '5:00 am', day: 'Mon, 13 Mar' },
    { id: 10, name: '5:00 am', day: 'Mon, 13 Mar' },
  ];
  const renderItem = ({ item }) => {
    return <SwitchComponent data={item} onPress={() => navigation.navigate('EditAlarm', {
      item: item,
    })} />;
  };

  const renderAddAlarm = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('AddAlarm')}
        style={{
          backgroundColor: colors.themeColor,
          height: vw * 20,
          width: vw * 20,
          marginBottom: vh,
          elevation: 7,
          borderRadius: vw * 10,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 5 * vh,
          right: 10 * vw,
        }}>
        <CircularBold style={{ fontSize: vh * 5, color: colors.white }}>
          +
        </CircularBold>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{ flex: 1, backgroundColor: colors.black, alignItems: 'center' }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={datas}
        style={{ flex: 1, marginTop: 5 * vh, marginBottom: 5 * vh }}
        renderItem={renderItem}
      />
      {renderAddAlarm()}
    </View>
  );
};

export default AlarmList;
