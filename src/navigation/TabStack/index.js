import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {COLORS, icons} from '../../constants';
import HomeStack from '../HomeStack';
import ScheduleStack from '../ScheduleStack';
import AddTaskStack from '../AddTaskStack';
import ReportStack from '../ReportStack';
import ProfileStack from '../ProfileStack';
import TabIcon from '../../util/TabIcon';
import styles from './styles';
import {Image} from 'react-native';
import {CustomTabBarButton} from '../../util/CustomTabBarButton';

const Tab = createBottomTabNavigator();

class TabStack extends React.PureComponent {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="HomeStack"
        screenOptions={{
          tabBarHideOnKeyboard: true,
          showLabel: false,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            borderRadius: 15,
            height: 90,
            ...styles.shadow,
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
              return <TabIcon focused={focused} icon={icons.verified} />;
            },
          }}
        />

        <Tab.Screen
          name="AddTaskStack"
          component={AddTaskStack}
          options={{
            tabBarIcon: ({focused}) => (
              // <Image
              //   source={icons.plus}
              //   resizeMode="contain"
              //   style={{
              //     width: 70,
              //     height: 70,
              //     // tintColor: focused ? '' : COLORS.mainFg,
              //   }}
              // />

              <Image
                source={require('../../assets/icons/cross.png')}
                style={{
                  tintColor: focused ? COLORS.mainMg : COLORS.mainBg,
                  height: '40%',
                  width: '40%',
                }}
              />
            ),
            tabBarButton: props => <CustomTabBarButton {...props} />,
          }}
        />

        <Tab.Screen
          name="ReportStack"
          component={ReportStack}
          options={{
            tabBarIcon: ({focused}) => {
              return <TabIcon focused={focused} icon={icons.market} />;
            },
          }}
        />

        <Tab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            tabBarIcon: ({focused}) => {
              return <TabIcon focused={focused} icon={icons.profile} />;
            },
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default TabStack;
