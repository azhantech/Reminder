import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AlarmList from '../Screen/AlarmListing';
import AddAlarm from '../Screen/AddAlarm';
import EditAlarm from '../Screen/EditAlarm';
function MainNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="AlarmList"
        component={AlarmList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddAlarm"
        component={AddAlarm}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EditAlarm"
        component={EditAlarm}
      />
    </Stack.Navigator>
  );
}

export default MainNavigator;
