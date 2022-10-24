import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AnimatedSplash from 'react-native-animated-splash';
import auth from '@react-native-firebase/auth';

import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {useSelector} from 'react-redux';

const RootNavigation = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const isSignedIn = useSelector(state => state.auth.isLogedIn);

  // Handle user state changes
  function onAuthStateChanged(user) {
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    AnimatedSplash.hide();
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

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
