import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AnimatedSplash from 'react-native-animated-splash';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {useSelector} from 'react-redux';

const RootNavigation = () => {
  const isSignedIn = useSelector(state => state.auth.isLogedIn);

  useEffect(() => {
    AnimatedSplash.hide();
  }, []);

  if (isSignedIn) {
    return (
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  }
};

export default RootNavigation;
