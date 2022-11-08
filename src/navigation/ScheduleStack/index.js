import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Schedule from '../../screens/Schedule';
import styles from '../AuthStack/styles';
import CategoryDetails from '../../components/CategoryDetails';
import EditCategory from '../../screens/EditCategory';

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
      <Stack.Screen name="CategoryDetail" component={CategoryDetails} />
    </Stack.Navigator>
  );
};

export default ScheduleStack;
