import {View, Text, FlatList, Alert, Animated} from 'react-native';
import React, {useRef, useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useFocusEffect} from '@react-navigation/native';

import {COLORS} from '../../constants';
import styles from './styles';
import {DATA} from '../../constants/data';

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const HomeVerticalList = props => {
  const {task} = props;
  const [check, setCheck] = useState(true);

  const renderItem = ({item}) => {
    return (
      <View style={styles.mainCont}>
        <BouncyCheckbox
          size={25}
          fillColor={COLORS.lightGreen}
          text={item.tname}
          unfillColor={COLORS.mainBg}
          iconStyle={COLORS.mainGrey}
          innerIconStyle={{borderWidth: 2}}
          textStyle={styles.txtStyle}
          onPress={isChecked => {
            console.log(isChecked);
            // setCheck(isChecked);

            // Alert.alert('', 'You want to delete this task?', [
            //   {
            //     text: 'Cancel',
            //     onPress: () => {
            //       setCheck(false);
            //       console.log('Cancel Pressed');
            //     },
            //     style: 'cancel',
            //   },
            //   {
            //     text: 'OK',
            //     onPress: () => {
            //       const value = DATA.filter(val => val.tname === item.tname);
            //       setTasks(value);
            //       console.log('OK Pressed');
            //     },
            //   },
            // ]);
          }}
          bouncinessIn={40}
          bounceVelocityIn={0.6}
          bounceEffectIn={0.9}
        />
      </View>
    );
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log('Updated');
  //   }, [task]),
  // );

  return (
    <View style={styles.listCont}>
      <AnimatedFlatlist
        scrollEventThrottle={16}
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
