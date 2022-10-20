import React, {useState} from 'react';
import {View, Text, ToastAndroid, TouchableOpacity} from 'react-native';

import {Link, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';

import {ImageLoader} from '../../../components/ImageLoader';
import InputFields from '../../../components/InputFields';
import HeadingAuth from '../../../components/HeadingAuth';
import styles from './styles';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = async text => {
    let reg = /\S+@\S+\.\S+/;

    if (reg.test(text) === false) {
      console.log('Email is Not Correct');

      Toast.show({
        type: 'error',
        visibilityTime: 2000,
        text1: 'Email is Not Correct',
      });
    } else {
      console.log('Email is Correct');

      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          navigation.navigate('Login');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    }
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      visibilityTime: 2000,

      text1: 'Kindly fill all the fields 👋',
    });
  };

  const handleSubmit = () => {
    if (name === '' || email === '' || password === '') {
      showToast();
    } else {
      validateEmail(email);
    }
  };

  return (
    <KeyboardAwareScrollView bounces={false} style={styles.mainContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.subContainerOne}>
          <ImageLoader
            source={require('../../../assets/icons/register.png')}
            style={styles.imgOne}
          />
        </View>
        <HeadingAuth type="Sign Up" />
        <View style={styles.scrollContainer}>
          <InputFields
            placeholder="Enter name"
            value={name}
            onChangeText={val => setName(val)}
          />
          <InputFields
            placeholder="Enter email"
            value={email}
            onChangeText={value => setEmail(value)}
            isEmail={true}
          />
          <InputFields
            placeholder="Enter password"
            value={password}
            onChangeText={value => setPassword(value)}
            isPassword={true}
          />
          <Text style={styles.addText}>
            Before joining us, you're agree to our
            <Link to={{screen: 'Login'}}>
              <Text style={styles.termsText}> Terms </Text>
            </Link>
            &{' '}
            <Link to={{screen: 'Login'}}>
              <Text style={styles.policyText}>Policies</Text>
            </Link>
          </Text>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnTwo}
            onPress={handleSubmit}>
            <Text style={styles.subTitleTwo}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.bottomMostText}>
            Joined us before ?{' '}
            <Link to={{screen: 'Login'}}>
              <Text style={styles.linkText}>Login</Text>
            </Link>
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
