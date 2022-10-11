import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {CustomPagination} from '../../util/CustomPagination/index';
import icons from '../../constants/icons';
import styles from './styles';

const newImage = [icons.onBoarding, icons.onBoarding];
const image = index => ({image: newImage[index % newImage.length]});
const items = Array.from(Array(3)).map((_, index) => image(index));

const Onboarding = () => {
  const navigation = useNavigation();

  const handleStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.upperContainer}>
        <SwiperFlatList
          autoplay
          autoplayDelay={3}
          autoplayLoop
          showPagination
          PaginationComponent={CustomPagination}
          removeClippedSubviews={false}
          data={items}
          renderItem={({item, index}) => (
            <Image
              source={item.image}
              testID={`container_swiper_renderItem_screen_${index}`}></Image>
          )}
        />
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.upperMiddleText}>Task Management</Text>
        <Text style={styles.upperMiddleText}>Made Simple</Text>
        <Text style={styles.textThree}>
          The smart tool is designed to help you better manage your task
        </Text>
      </View>
      <View style={styles.lowerContainer}>
        <TouchableOpacity style={styles.btnContainer} onPress={handleStarted}>
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;
