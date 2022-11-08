import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';

import {useTogglePasswordVisibility} from '../../../hooks/useTogglePasswordVisibility';
import Loader, {SpinLoader} from '../../../components/SpinLoader';
import {COLORS, icons} from '../../../constants';
import {ImageLoader} from '../../../components/ImageLoader';
import HeadingAuth from '../../../components/HeadingAuth';
import {InputFields} from '../../../components/InputFields';

import styles from './styles';
import {changeLogIn} from '../../../redux/reducers/authReducer';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();

  const passRef = useRef();

  const validateEmail = async text => {
    console.log(text);
    let reg = /\S+@\S+\.\S+/;

    if (reg.test(text) === false) {
      console.log('Email is Not Correct');
      Toast.show({
        type: 'error',
        text1: 'Email is Not Correct',
      });
    } else {
      console.log('Email is Correct');

      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account signed in!');
          dispatch(changeLogIn(email));
          setTimeout(() => {
            navigation.navigate('TabStack');
          }, 3000);
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

  const handleSubmit = () => {
    if (email === '' || password === '') {
      showToast();
    } else {
      // if (!isLogin) {
      //   <Loader isLoading={isLogin} />;
      // }
      validateEmail(email);
    }
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      visibilityTime: 2000,
      text1: 'Kindly fill all the fields',
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
            placeholder="Enter Email"
            value={email}
            onChangeText={value => setEmail(value)}
            onSubmitEditing={() => {
              passRef.current.focus();
            }}
          />
          {rightIcon == 'eye' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <InputFields
                ref={passRef}
                placeholder="Enter Password"
                value={password}
                onChangeText={value => setPassword(value)}
                isPassword={true}
                secureTextEntry={passwordVisibility}
                onSubmitEditing={handleSubmit}
              />
              <Pressable
                style={{
                  right: 40,
                }}
                onPress={handlePasswordVisibility}>
                <Image
                  source={icons.eye}
                  style={{
                    tintColor: COLORS.mainFg,
                    height: 25,
                    width: 25,
                    marginTop: 10,
                  }}
                />
              </Pressable>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <InputFields
                ref={passRef}
                placeholder="Enter Password"
                value={password}
                onChangeText={value => setPassword(value)}
                isPassword={true}
                secureTextEntry={passwordVisibility}
                enablesReturnKeyAutomatically
                onSubmitEditing={handleSubmit}
              />
              <Pressable
                style={{
                  right: 40,
                }}
                onPress={handlePasswordVisibility}>
                <Image
                  source={icons.hidden}
                  style={{
                    tintColor: COLORS.mainFg,
                    height: 25,
                    width: 25,
                    marginTop: 10,
                  }}
                />
              </Pressable>
            </View>
          )}
        </View>

        <View style={styles.scrollContainerTwo}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnTwo}
            onPress={handleSubmit}>
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
