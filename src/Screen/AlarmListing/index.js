import React from 'react';
import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import CircularBold from '../../Component/Texts/CircularBold';
import {colors} from '../../utils/appTheme';
import {vh, vw} from '../../utils/dimensions';

const AlarmList = () => {
  const data = [
    {id: 1, name: '5:00 am', day: 'Mon, 13 Mar'},
    {id: 2, name: '5:00 am', day: 'Mon, 13 Mar'},
    {id: 3, name: '5:00 am', day: 'Mon, 13 Mar'},
    {id: 4, name: '5:00 am', day: 'Mon, 13 Mar'},
    {id: 5, name: '5:00 am', day: 'Mon, 13 Mar'},
    {id: 6, name: '5:00 am', day: 'Mon, 13 Mar'},
    {id: 7, name: '5:00 am', day: 'Mon, 13 Mar'},
    {id: 8, name: '5:00 am', day: 'Mon, 13 Mar'},
    {id: 9, name: '5:00 am', day: 'Mon, 13 Mar'},
    {id: 10, name: '5:00 am', day: 'Mon, 13 Mar'},
  ];
  const renderItem = ({item}) => {
    console.log('Id =====================<', item);
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
            width: '40%',
            alignItems: 'center',
          }}>
          <CircularBold>{item?.name}</CircularBold>
        </View>
        <View
          style={{
            width: '60%',
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <View style={{justifyContent: 'center'}}>
            <CircularBold>{item?.day}</CircularBold>
          </View>
          <View
            style={{
              backgroundColor: 'grey',
              height: vh * 2,
              width: vw * 10,
              borderRadius: vw * 4,
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.white,
                height: vh * 2,
                width: vh * 2,

                borderRadius: vw * 4,
              }}></TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{flex: 1, backgroundColor: colors.black, alignItems: 'center'}}>
      <FlatList data={data} style={{flex: 1}} renderItem={renderItem} />
    </View>
  );
};

export default AlarmList;
