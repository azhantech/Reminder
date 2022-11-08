import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import ViewTasks from '../../screens/ViewTasks';
import AddCategory from '../../screens/AddCategory';
import styles from '../AuthStack/styles';
import EditTask from '../../screens/EditTask';
import CategoryDetails from '../../components/CategoryDetails';
import EditCategory from '../../screens/EditCategory';

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
      <Stack.Screen name="AddCategories" component={AddCategory} />

      {/* ----------------------------- */}
      <Stack.Screen name="EditTask" component={EditTask} />

      {/* new flow */}
      <Stack.Screen name="CategoryDetail" component={CategoryDetails} />
      <Stack.Screen name="EditCategory" component={EditCategory} />
    </Stack.Navigator>
  );
};

export default HomeStack;
