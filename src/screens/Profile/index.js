import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import {COLORS} from '../../constants';

const Profile = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4b51d7', COLORS.mainFg, '#b6b9f3']}
        style={styles.header}></LinearGradient>
      <Image
        style={styles.avatar}
        source={require('../../assets/icons/avatar.jpg')}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>username</Text>
          <Text style={styles.info}>email</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonContainer}
            onPress={() => {
              // dispatch(changeLogOut());
              // dispatch(onLogout());

              setTimeout(() => {
                // navigation.navigate('Login');
              }, 3000);
            }}>
            <Text style={styles.btnStyle}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;
