import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';

import {changeLogOut} from '../../redux/reducers/authReducer';
import {onLoggingOut} from '../../redux/reducers/taskReducer';
import {ImageLoader} from '../../components/ImageLoader';
import {COLORS} from '../../constants';
import styles from './styles';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4b51d7', COLORS.mainFg, '#b6b9f3']}
        style={styles.header}></LinearGradient>
      <ImageLoader
        style={styles.avatar}
        source={require('../../assets/icons/avatar.jpg')}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonContainer2}
            onPress={() => {
              navigation.navigate('EditProfile');
            }}>
            <Text style={styles.btnStyle}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonContainer}
            onPress={() => {
              dispatch(changeLogOut());
              dispatch(onLoggingOut());
              setTimeout(() => {
                navigation.navigate('Login');
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
