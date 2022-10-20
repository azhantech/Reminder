import React from 'react';
import {useSelector} from 'react-redux';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../screens/Auth/Login';
import Signup from '../../screens/Auth/Signup';
import Onboarding from '../../screens/Onboarding';
import styles from './styles';

const AuthStack = () => {
  const checkOnboarding = useSelector(state => state.auth.checkOnboarding);
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        showLabel: false,
        style: styles.authStyles,
      }}
      {...{initialRouteName: checkOnboarding ? 'Login' : 'Onboarding'}}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Signup} />
    </Stack.Navigator>
  );
};

export default AuthStack;

// C:\Program Files\OpenSSL-Win64
