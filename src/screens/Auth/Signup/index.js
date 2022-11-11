import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from 'react-native';

import {Link, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';

import {ImageLoader} from '../../../components/ImageLoader';
import {InputFields} from '../../../components/InputFields';
import HeadingAuth from '../../../components/HeadingAuth';
import {HideKeyboard} from '../../../util/HideKeyboard';
import styles from './styles';
import {COLORS} from '../../../constants';

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef();
  const passRef = useRef();
  const conPassRef = useRef();

  const showToast = text => {
    Toast.show({
      type: 'error',
      visibilityTime: 2000,
      text1: text,
    });
  };

  const validateEmail = async text => {
    let reg = /\S+@\S+\.\S+/;

    if (reg.test(text) === false) {
      showToast('Email is Not Correct');
    } else {
      setIsLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          setIsLoading(false);
          navigation.navigate('Login');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            showToast('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            showToast('That email address is invalid!');
          }

          if (error.code === 'auth/weak-password') {
            showToast('Kindly enter atleast six characters password!');
          }

          setIsLoading(false);

          console.error(error);
        });
    }
  };

  const handleSubmit = () => {
    if (email === '' && password === '' && conPassword === '') {
      showToast('Kindly fill all the fields');
    } else if (email === '') {
      showToast('Kindly enter Email');
    } else if (password === '') {
      showToast('Kindly enter Password');
    } else if (conPassword === '') {
      showToast('Kindly confirm Password');
    } else {
      if (password == conPassword) {
        validateEmail(email);
      } else {
        showToast('Password & Confirm Password should be same!');
      }
    }
  };

  return (
    <HideKeyboard>
      <KeyboardAwareScrollView
        scrollEnabled={false}
        bounces={false}
        style={styles.mainContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.subContainerOne}>
            <ImageLoader
              source={require('../../../assets/icons/mention.png')}
              style={styles.imgOne}
            />
          </View>
          <HeadingAuth type="Sign Up" />
          <View style={styles.scrollContainer}>
            <InputFields
              placeholder="Enter Email"
              value={email}
              onChangeText={value => setEmail(value)}
              returnKeyType="next"
              keyboardType="email-address"
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
              returnKeyType="next"
              keyboardType="default"
              onSubmitEditing={() => {
                conPassRef.current.focus();
              }}
              enablesReturnKeyAutomatically
            />

            <InputFields
              ref={conPassRef}
              placeholder="Confirm Password"
              value={conPassword}
              onChangeText={value => setConPassword(value)}
              isPassword={true}
              keyboardType="default"
              returnKeyType="default"
              onSubmitEditing={() => {
                Keyboard.dismiss();
                handleSubmit();
              }}
              enablesReturnKeyAutomatically
            />
          </View>

          {/* <Text style={styles.addText}>
            Before joining us, you're agree to our Terms & Policies
            <Text style={styles.termsText}> </Text>
            <Text style={styles.policyText}> </Text>
          </Text> */}
        </View>

        <View style={styles.bottomContainer}>
          {isLoading ? (
            <View style={styles.btnTwo}>
              <ActivityIndicator color={COLORS.mainBg} size={'large'} />
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btnTwo}
              onPress={handleSubmit}>
              <Text style={styles.subTitleTwo}>Sign Up</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.bottomMostText}>
            Joined us before ?{' '}
            <Link to={{screen: 'Login'}}>
              <Text style={styles.linkText}>Login</Text>
            </Link>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </HideKeyboard>
  );
};

export default Signup;
