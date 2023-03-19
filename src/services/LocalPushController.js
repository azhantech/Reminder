import moment from 'moment';
import { Platform } from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification';

export const initiateNotification = () => {
  PushNotification.configure({
    onRegister: token => console.log('Token', token),
    onNotification: notification => console.log('NOTIFICATION', notification),
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
    onAction: function (notification) {
      console.log(notification, 'notificationnotification')
      if (notification.action === 'Snooze') {
        console.log('Alarm Snoozed');
      }
      else if (notification.action === 'Cancel') {
        console.log('Alarm Stoped');
        //PushNotification.cancelAllLocalNotifications();
      }
      else {
        console.log('Notification opened');
      }
    },
    actions: ["Snooze", "Cancel"],
    // requestPermissions: true,
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
};



export const LocalNotification = (id, updatedVal, message, text) => {
  console.log('PROVIDED TEXT ', updatedVal);
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
    vibrate: data?.isVibrateEnabled,
    vibration: 300,
    repeatTime: 1,
    actions: ["Snooze", "Cancel"],
    allowWhileIdle: true,
    invokeApp: false,
  });
};

PushNotification.getScheduledLocalNotifications(nots => {
  console.log('nots', nots);
});
