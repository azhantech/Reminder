import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import styles from './styles';

const Profile = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
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
