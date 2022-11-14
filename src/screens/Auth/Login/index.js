import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';

import HeadingAuth from '../../../components/HeadingAuth';
import {COLORS} from '../../../constants';
import {ImageLoader} from '../../../components/ImageLoader';
import {InputFields} from '../../../components/InputFields';
import {changeLogIn} from '../../../redux/reducers/authReducer';
import {HideKeyboard} from '../../../util/HideKeyboard';
import styles from './styles';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const passRef = useRef();

  const showToast = text => {
    Toast.show({
      type: 'error',
      visibilityTime: 2000,
      text1: text,
    });
  };

  const validateEmail = async text => {
    console.log(text);
    let reg = /\S+@\S+\.\S+/;

    if (reg.test(text) === false) {
      showToast('Email is Not Correct');
    } else {
      setIsLoading(true);

      auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          console.log(
            'userCredential.user',
            JSON.stringify(userCredential.user),
          );
          const user = {
            email,
            password,
          };
          dispatch(changeLogIn(user));
          setTimeout(() => {
            navigation.navigate('TabStack');
          }, 3000);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            showToast('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            showToast('That email address is invalid!');
          }

          if (error.code === 'auth/user-not-found') {
            showToast('The user does not exist!');
          }

          if (error.code === 'auth/wrong-password') {
            showToast('Please enter correct password');
          }
          setIsLoading(false);

          console.error(error);
        });
    }
  };

  const handleSubmit = () => {
    if (email === '' && password === '') {
      showToast('Kindly fill all the fields');
    } else if (email === '') {
      showToast('Kindly enter Email');
    } else if (password === '') {
      showToast('Kindly enter Password');
    } else {
      validateEmail(email);
    }
  };

  return (
    <HideKeyboard>
      <KeyboardAwareScrollView bounces={false} style={styles.mainContainer}>
        <View style={styles.oneContainer}>
          <ImageLoader
            source={require('../../../assets/icons/bro.png')}
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
              returnKeyType="next"
              keyboardType="email-address"
              onSubmitEditing={() => {
                passRef.current.focus();
              }}
            />

            <InputFields
              ref={passRef}
              placeholder="Enter Password"
              value={password}
              onChangeText={value => setPassword(value)}
              returnKeyType="default"
              isPassword={true}
              onSubmitEditing={() => {
                Keyboard.dismiss();
                handleSubmit();
              }}
              enablesReturnKeyAutomatically
            />
          </View>
          <View style={styles.scrollContainerTwo}>
            {isLoading ? (
              <View style={styles.btnTwo}>
                <ActivityIndicator color={COLORS.mainBg} size={'large'} />
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btnTwo}
                onPress={handleSubmit}>
                <Text style={styles.subTitleTwo}>Log In</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.bottomText}>
              New to Application ?{' '}
              <Link to={{screen: 'Register'}}>
                <Text style={{color: COLORS.mainFg}}>Register</Text>
              </Link>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </HideKeyboard>
  );
};

export default Login;
