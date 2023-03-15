import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AlarmList from '../Screen/AlarmListing';
import AddAlarm from '../Screen/AddAlarm';
function MainNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="AlarmList"
        component={AlarmList}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AddAlarm"
        component={AddAlarm}
      />
    </Stack.Navigator>
  );
}

export default MainNavigator;
