import {View, Text, FlatList} from 'react-native';
import React from 'react';
import styles from './style';

const ScheduleVerticalList = props => {
  const {category} = props;
  console.log('dshjdsujd', category);
  const renderItem = ({item}) => {
    return (
      <View style={styles.listCont}>
        <Text>DSSD</Text>
      </View>
    );
  };

  return (
    <View style={styles.mainCont}>
      <FlatList
        data={category}
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

export default ScheduleVerticalList;
