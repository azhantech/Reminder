import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import ViewTasks from '../../screens/ViewTasks';
import ViewCategories from '../../screens/ViewCategories';
import styles from '../AuthStack/styles';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        showLabel: false,
        style: styles.authStyles,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ViewTasks" component={ViewTasks} />
      <Stack.Screen name="ViewCategories" component={ViewCategories} />
    </Stack.Navigator>
  );
};

export default HomeStack;
