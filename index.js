/**
 * @format
 */
import React, { useRef } from 'react';
import moment from 'moment';
import { AppRegistry } from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification';
import App from './App';
import { name as appName } from './app.json';
import { LocalNotification } from './src/services/LocalPushController';
import { useDispatch } from 'react-redux';
import { dispatch, getNextMonday, nextFridayComing, nextMondayComing, nextSaturdayComing, nextSundayComing, nextThursdayComing, nextTuesdayComing, nextWednesdayComing } from './src/utils/helpers';
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
    console.log(notification, 'notificationnotificationnotification')
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
      if (notification?.repeatType?.length > 0) {
        for (let i = 0; i < notification?.repeatType?.length; i++) {
          if (notification?.repeatType[i] == 'Monday') {
            LocalNotification(
              notification?.notificationId,
              nextMondayComing,
              true,
              true,
              'Alarm',
              notification?.title,
            )
          }

          if (notification?.repeatType[i] == 'Tuesday') {
            LocalNotification(
              notification?.notificationId,
              nextTuesdayComing,
              true,
              true,
              'Alarm',
              notification?.title,
            )
          }


          if (notification?.repeatType[i] == 'Wednesday') {
            LocalNotification(
              notification?.notificationId,
              nextWednesdayComing,
              true,
              true,
              'Alarm',
              notification?.title,
            )
          }


          if (notification?.repeatType[i] == 'Thursday') {
            LocalNotification(
              notification?.notificationId,
              nextThursdayComing,
              true,
              true,
              'Alarm',
              notification?.title,
            )
          }


          if (notification?.repeatType[i] == 'Friday') {
            LocalNotification(
              notification?.notificationId,
              nextFridayComing,
              true,
              true,
              'Alarm',
              notification?.title,
            )
          }

          if (notification?.repeatType[i] == 'Saturday') {
            LocalNotification(
              notification?.notificationId,
              nextSaturdayComing,
              true,
              true,
              'Alarm',
              notification?.title,
            )
          }

          if (notification?.repeatType[i] == 'Sunday') {
            LocalNotification(
              notification?.notificationId,
              nextSundayComing,
              true,
              true,
              'Alarm',
              notification?.title,
            )
          }
        }
      }
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
        dispatch({ type: useReferences, payload: popupRef });
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
