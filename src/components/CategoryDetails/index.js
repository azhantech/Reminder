import {View, Text, Animated, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import styles from './styles';
import BackButon from '../BackButon';
import {vh} from '../../util/Dimensions';
import ProgressCircle from 'react-native-progress/Circle';
import AnimatedTyping from '../../util/AnimatedTyping';

const CategoryDetails = ({route, navigation}) => {
  let animatedValue = new Animated.Value(0);
  let currentValue = 0;

  const {data, progress} = route.params;

  console.log('progress', progress);
  console.log('data', data);

  animatedValue.addListener(({value}) => {
    currentValue = value;
  });

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{rotateY: frontInterpolate}],
  };
  const backAnimatedStyle = {
    transform: [{rotateY: backInterpolate}],
  };

  const frontOpacity = animatedValue.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
  });
  const backOpacity = animatedValue.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
  });

  const onFlip = () => {
    if (currentValue >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        tension: 8,
        friction: 10,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        tension: 8,
        friction: 10,
        useNativeDriver: false,
      }).start();
    }
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyStyle}>
        <AnimatedTyping text={['No Data to present !']} />
      </View>
    );
  };
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 25,
          justifyContent: 'space-between',
          marginHorizontal: 10,
        }}>
        <Text style={styles.txtFt}>{item.tname}</Text>

        <View
          style={{
            marginHorizontal: 2,
          }}>
          <Text style={styles.trySty}>{item.date}</Text>
          <Text style={styles.trySty}>
            {item.completed ? 'Finished' : 'Ongoing'}
          </Text>
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.timeTxt}>{item.start_time}</Text>
          <Text style={styles.timeTxt}>{item.end_time}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainCont}>
      <View style={styles.topCont}>
        <BackButon />
      </View>

      <View style={{height: vh * 4}}>
        <Animated.View
          style={[
            styles.cardStyle,
            frontAnimatedStyle,
            {opacity: frontOpacity},
          ]}>
          <Text style={styles.nameTxt}>{data?.name}</Text>
          <Text style={styles.descTxt}>{data?.desc}</Text>
          <View style={styles.progCont}>
            <ProgressCircle
              size={150}
              color="white"
              showsText={true}
              animated={true}
              thickness={5}
              strokeCap="round"
              progress={Number(progress / 100)}
              formatText={() => {
                return Math.floor(progress) + '%';
              }}
              textStyle={styles.progressTxt}
              borderWidth={0.4}
            />
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.cardStyle,
            backAnimatedStyle,
            {opacity: backOpacity, position: 'absolute'},
          ]}>
          <FlatList
            data={data && data.task}
            renderItem={renderItem}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyComponent}
            keyExtractor={(item, index) => index.toString()}
          />
        </Animated.View>
      </View>

      <TouchableOpacity
        activeOpacity={1}
        onPress={onFlip}
        style={styles.touchOpac}>
        <Text style={styles.opcTxt}>See more details</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EditCategory', {
            data: data,
          });
        }}
        style={styles.btnTwo}>
        <Text style={styles.subTitleTwo}>Edit Category</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryDetails;
