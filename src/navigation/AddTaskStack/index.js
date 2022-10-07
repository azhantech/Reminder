import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddTask from '../../screens/AddTask';
import styles from '../AuthStack/styles';

const Stack = createNativeStackNavigator();

const AddTaskStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        showLabel: false,
        style: styles.authStyles,
      }}>
      <Stack.Screen name="AddTask" component={AddTask} />
    </Stack.Navigator>
  );
};

export default AddTaskStack;
