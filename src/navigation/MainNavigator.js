import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AlarmList from '../Screen/AlarmListing';
function MainNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="AlarmList"
        component={AlarmList}
      />
    </Stack.Navigator>
  );
}

export default MainNavigator;
