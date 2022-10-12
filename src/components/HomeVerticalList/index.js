import {View, Text, FlatList} from 'react-native';
import React from 'react';
import styles from './styles';

const HomeVerticalList = props => {
  const {task} = props;

  const renderItem = ({item}) => {
    return <Text style={styles.mainCont}>fdrfffd {item.tname}</Text>;
  };
  return (
    <>
      <FlatList
        data={task}
        bounces={true}
        horizontal={false}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

export default HomeVerticalList;
