import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Report from '../../screens/Report';
import styles from '../AuthStack/styles';

const Stack = createNativeStackNavigator();

const ReportStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        showLabel: false,
        style: styles.authStyles,
      }}>
      <Stack.Screen name="Report" component={Report} />
    </Stack.Navigator>
  );
};

export default ReportStack;
