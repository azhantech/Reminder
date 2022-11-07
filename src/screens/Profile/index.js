import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';

import {changeLogOut} from '../../redux/reducers/authReducer';
import {onLoggingOut} from '../../redux/reducers/taskReducer';
import {ImageLoader} from '../../components/ImageLoader';
import {
  shown,
  LocalNotification,
  getNotification,
} from '../../services/LocalPushController';
import {COLORS} from '../../constants';
import styles from './styles';

const Profile = () => {
  const emailAdd = useSelector(state => state.auth.emailId);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleButtonPress = () => {
    console.log('dshhsdhjsd');
    shown();
  };

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
          <Text style={styles.info}>{emailAdd && emailAdd}</Text>

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
