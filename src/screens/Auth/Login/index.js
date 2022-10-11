import {
  View,
  Text,
  ScrollView,
  Platform,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
// import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';

import {COLORS} from '../../../constants';

import {ImageLoader} from '../../../components/ImageLoader';
import HeadingAuth from '../../../components/HeadingAuth';
import InputFields from '../../../components/InputFields';

import styles from './styles';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = async text => {
    console.log(text);
    let reg = /\S+@\S+\.\S+/;

    if (reg.test(text) === false) {
      console.log('Email is Not Correct');
      if (Platform.OS === 'ios') {
        Toast.show({
          type: 'success',
          text1: 'Email is Not Correct',
        });
      } else if (Platform.OS === 'android') {
        ToastAndroid.show('Email is not correct', ToastAndroid.SHORT);
      }
    } else {
      console.log('Email is Correct');
      const user = {
        email,
        password,
      };
    }
  };

  const handleSubmit = () => {
    if (email === '' || password === '') {
      showToast();
    } else {
      validateEmail(email);
    }
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Kindly fill all the fields 👋',
    });
  };

  return (
    <KeyboardAwareScrollView bounces={false} style={styles.mainContainer}>
      <View style={styles.oneContainer}>
        <ImageLoader
          source={require('../../../assets/icons/edit.png')}
          style={styles.imgOne}
        />
      </View>
      <HeadingAuth type="Login" />
      <ScrollView>
        <View style={styles.scrollContainer}>
          <InputFields
            placeholder="Enter email"
            value={email}
            onChangeText={value => setEmail(value)}
          />
          <InputFields
            placeholder="Enter password"
            value={password}
            onChangeText={value => setPassword(value)}
            isPassword={true}
          />
        </View>

        <View style={styles.scrollContainerTwo}>
          <TouchableOpacity style={styles.btnTwo} onPress={handleSubmit}>
            <Text style={styles.subTitleTwo}>Log In</Text>
          </TouchableOpacity>

          <Text style={styles.bottomText}>
            New to Application ?{' '}
            <Link to={{screen: 'Register'}}>
              <Text style={{color: COLORS.mainFg}}>Register</Text>
            </Link>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default Login;
