import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Schedule from '../../screens/Schedule';
import styles from '../AuthStack/styles';
import EditTask from '../../screens/EditTask';

const Stack = createNativeStackNavigator();

const ScheduleStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        showLabel: false,
        style: styles.authStyles,
      }}>
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="EditTask" component={EditTask} />
    </Stack.Navigator>
  );
};

export default ScheduleStack;
