import moment from 'moment';
import { AppRegistry, Platform } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import PushNotification, { Importance } from 'react-native-push-notification';
import { name as appName } from '../../app.json';
import App from '../../App';
export const initiateNotification = () => {
  // PushNotification.configure({
  //   onRegister: token => console.log('Token', token),
  //   permissions: {
  //     alert: true,
  //     badge: true,
  //     sound: true,

  //   },
  //   popInitialNotification: true,
  //   requestPermissions: Platform.OS === 'ios',
  //   foreground: true,
  //   onAction: function (notification) {
  //     console.log(notification, 'notificationnotification');
  //     if (notification.action === 'Snooze') {
  //       console.log('snooze')
  //       const time = new Date();
  //       var newDateObj = moment(time).add(1, 'm').toDate();
  //       LocalNotification(
  //         notification?.notificationId,
  //         newDateObj,
  //         true,
  //         true,
  //         'Alarm',
  //         notification?.title,
  //       );
  //     } else if (notification.action === 'Cancel') {
  //       console.log('Alarm Stoped');
  //     } else {
  //       console.log('Notification opened');
  //     }
  //   },
  //   actions: ['Snooze', 'Cancel'],
  // });

  PushNotification.createChannel({
    channelId: 'hello',
    channelName: 'my channel',
    channelDescription: 'A channel for Notification',
    playSound: true,
    soundName: 'alarm.mp3',
    importance: Importance.HIGH,
    vibrate: true,

  });
};

export const LocalNotification = (
  id,
  updatedVal,
  vibrate,
  snooze,
  repeatType,
  message,
  text,
) => {
  PushNotification.localNotificationSchedule({
    id: `${id}`,
    channelId: 'hello',
    channelName: 'my channel',
    autoCancel: true,
    message: message,
    title: text,
    date: updatedVal,
    playSound: true,
    soundName: 'alarm.mp3',
    importance: Importance.HIGH,
    vibrate: vibrate,
    vibration: 300,
    repeatType: repeatType ? repeatType : 'hour',
    repeatTime: snooze ? 1 : 0,
    actions: ['Snooze', 'Cancel'],
    allowWhileIdle: true,
    invokeApp: false,
    ignoreInForeground: false,
  });
};

export const DeleteLocalNotification = id => {
  PushNotification.cancelLocalNotification(`${id}`);
};

PushNotification.getScheduledLocalNotifications(nots => {
  console.log('nots', nots);
});
