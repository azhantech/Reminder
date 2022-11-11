import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';

import HeadingAuth from '../../components/HeadingAuth';
import {COLORS, icons} from '../../constants';
import {ImageLoader} from '../../components/ImageLoader';
import {InputFields} from '../../components/InputFields';
import {HideKeyboard} from '../../util/HideKeyboard';
import styles from './styles';
import {changeLogIn} from '../../redux/reducers/authReducer';
const EditProfile = () => {
  const getPassword = useSelector(state => state.auth.passwordId);
  const getEmail = useSelector(state => state.auth.emailId);
  const navigation = useNavigation();

  const [password, setPassword] = useState(getPassword);
  const [conPassword, setConPassword] = useState(getPassword);

  const [isLoading, setIsLoading] = useState(false);

  const conPassRef = useRef();

  const showToast = text => {
    Toast.show({
      type: 'error',
      visibilityTime: 2000,
      text1: text,
    });
  };

  const validatePassword = async passwordKey => {
    setIsLoading(true);
    auth()
      .currentUser.updatePassword(passwordKey)

      .then(() => {
        setIsLoading(false);

        const data = {
          isLogedIn: true,
          emailId: getEmail,
          passwordId: passwordKey,
        };
        changeLogIn(data);

        navigation.navigate('Profile');
      })
      .catch(error => {
        if (error.code === 'auth/weak-password') {
          showToast('Kindly enter atleast six characters password!');
        }

        if (error.code === 'auth/requires-recent-login') {
          auth()
            .signInWithEmailAndPassword(getEmail, getPassword)
            .then(userCredential => {
              console.log(
                'userCredential.user',
                JSON.stringify(userCredential.user),
              );
            })
            .catch(error => {
              console.log('error', error);
            });

          validatePassword(password);
        }

        if (error.code === 'auth/email-already-in-use') {
          showToast('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          showToast('That email address is invalid!');
        }

        setIsLoading(false);

        console.error(error);
      });
  };

  const handleSubmit = () => {
    if (password === '' && conPassword === '') {
      showToast('Kindly fill all the fields');
    } else if (password === '') {
      showToast('Kindly enter Password');
    } else if (conPassword === '') {
      showToast('Kindly confirm Password');
    } else {
      if (password == conPassword) {
        validatePassword(password);
      } else {
        showToast('Password & Confirm Password should be same!');
      }
    }
  };

  return (
    <ScrollView>
      <HideKeyboard>
        <KeyboardAwareScrollView bounces={false} style={styles.mainContainer}>
          <View>
            <View style={styles.subContainerOne}>
              <ImageLoader source={icons.onBoarding} style={styles.imgOne} />
            </View>
            <HeadingAuth type="Change Password" />
            <View style={styles.scrollContainer}>
              <InputFields
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
                <Text style={styles.subTitleTwo}>Submit</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btnThree}
              onPress={() => {
                navigation.goBack();
              }}>
              <Text style={styles.subTitleTwo}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </HideKeyboard>
    </ScrollView>
  );
};

export default EditProfile;
