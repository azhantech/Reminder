import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, Pressable, Image} from 'react-native';

import {Link, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';

import {SpinLoader} from '../../../components/SpinLoader';
import {useTogglePasswordVisibility} from '../../../hooks/useTogglePasswordVisibility';
import {ImageLoader} from '../../../components/ImageLoader';
import {InputFields} from '../../../components/InputFields';
import HeadingAuth from '../../../components/HeadingAuth';
import styles from './styles';
import {COLORS, icons} from '../../../constants';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef();
  const passRef = useRef();

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();

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
            Toast.show({
              type: 'error',
              visibilityTime: 2000,
              text1: 'That email address is already in use!',
            });
          }

          if (error.code === 'auth/invalid-email') {
            Toast.show({
              type: 'error',
              visibilityTime: 2000,
              text1: 'That email address is invalid!',
            });
          }

          console.error(error);
        });
    }
  };

  const showToast = () => {
    Toast.show({
      type: 'error',
      visibilityTime: 2000,

      text1: 'Kindly fill all the fields',
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
            placeholder="Enter Name"
            value={name}
            onChangeText={val => setName(val)}
            onSubmitEditing={() => {
              emailRef.current.focus();
            }}
          />
          <InputFields
            ref={emailRef}
            placeholder="Enter Email"
            value={email}
            onChangeText={value => setEmail(value)}
            isEmail={true}
            onSubmitEditing={() => {
              passRef.current.focus();
            }}
          />

          <InputFields
            ref={passRef}
            placeholder="Enter Password"
            value={password}
            onChangeText={value => setPassword(value)}
            isPassword={true}
            secureTextEntry={passwordVisibility}
            onSubmitEditing={handleSubmit}
            enablesReturnKeyAutomatically
          />
        </View>

        <Text style={styles.addText}>
          Before joining us, you're agree to our Terms & Policies
          <Text style={styles.termsText}> </Text>
          <Text style={styles.policyText}> </Text>
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
    </KeyboardAwareScrollView>
  );
};

export default Signup;
