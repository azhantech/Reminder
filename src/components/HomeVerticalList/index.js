import {View, Text, FlatList} from 'react-native';
import React from 'react';
import styles from './styles';
import {DATA} from '../../constants/data';
const HomeVerticalList = props => {
  const {task} = props;

  const renderItem = ({item}) => {
    return <Text style={styles.mainCont}>{item.tname}</Text>;
  };

  return (
    <View style={styles.listCont}>
      <FlatList
        data={task ? task : DATA[0].tasks}
        bounces={true}
        horizontal={false}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 150,
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default HomeVerticalList;
