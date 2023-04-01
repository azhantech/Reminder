/**
 * @format
 */
import React, {useRef} from 'react';
import moment from 'moment';
import {AppRegistry} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import App from './App';
import {name as appName} from './app.json';
import {LocalNotification} from './src/services/LocalPushController';
import {useDispatch} from 'react-redux';
PushNotification.configure({
  onRegister: token => console.log('Token', token),
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
  foreground: true,
  onAction: function (notification) {
    if (notification.action === 'Snooze') {
      console.log('snooze');
      const time = new Date();
      var newDateObj = moment(time).add(1, 'm').toDate();
      LocalNotification(
        notification?.notificationId,
        newDateObj,
        true,
        true,
        'Alarm',
        notification?.title,
      );
    } else if (notification.action === 'Cancel') {
      console.log('Alarm Stoped');
    } else {
      console.log('Notification opened');
    }
  },
  actions: ['Snooze', 'Cancel'],
});

PushNotification.createChannel({
  channelId: 'hello',
  channelName: 'my channel',
  channelDescription: 'A channel for Notification',
  playSound: true,
  soundName: 'alarm.mp3',
  importance: Importance.HIGH,
  vibrate: true,
});

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask(
  'RNPushNotificationActionHandlerTask', // you must use the same name
  () => {
    const popupRef = useRef();
    const dispatch = useDispatch();
    console.log('heloooooo');
    return function (notification) {
      if (notification.action === 'Snooze') {
        console.log('snooze');
        dispatch({type: useReferences, payload: popupRef});
        const time = new Date();
        var newDateObj = moment(time).add(1, 'm').toDate();
        LocalNotification(
          notification?.notificationId,
          newDateObj,
          true,
          true,
          'Alarm',
          notification?.title,
        );
      } else if (notification.action === 'Cancel') {
        console.log('Alarm Stoped');
      } else {
        console.log('Notification opened');
      }
    };
  },
);
