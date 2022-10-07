import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../../constants';
import HomeStack from '../HomeStack';
import ScheduleStack from '../ScheduleStack';
import AddTaskStack from '../AddTaskStack';
import ReportStack from '../ReportStack';
import ProfileStack from '../ProfileStack';

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="SearchStack"
      screenOptions={{
        showLabel: false,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopColor: 'transparent',
          height: 60,
          backgroundColor: COLORS.mainBg,
        },
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => {
            return <TabIcon focused={focused} icon={icons.home} />;
          },
        }}
      />

      <Tab.Screen
        name="ScheduleStack"
        component={ScheduleStack}
        options={{
          tabBarIcon: ({focused}) => {
            return <TabIcon focused={focused} icon={icons.home} />;
          },
        }}
      />

      <Tab.Screen
        name="AddTaskStack"
        component={AddTaskStack}
        options={{
          tabBarIcon: ({focused}) => {
            return <TabIcon focused={focused} icon={icons.home} />;
          },
        }}
      />

      <Tab.Screen
        name="ReportStack"
        component={ReportStack}
        options={{
          tabBarIcon: ({focused}) => {
            return <TabIcon focused={focused} icon={icons.home} />;
          },
        }}
      />

      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) => {
            return <TabIcon focused={focused} icon={icons.home} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
