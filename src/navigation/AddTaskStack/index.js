import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddTask from '../../screens/AddTask';
import styles from '../AuthStack/styles';
import AddCategory from '../../screens/AddCategory';

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
      <Stack.Screen name="AddCategories" component={AddCategory} />
    </Stack.Navigator>
  );
};

export default AddTaskStack;
