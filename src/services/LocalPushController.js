import moment from 'moment';
import PushNotification, {Importance} from 'react-native-push-notification';

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
    requestPermissions: true,
  });

  PushNotification.createChannel({
    channelId: 'hello',
    channelName: 'my channel',
    channelDescription: 'A channel for Notification',
    playSound: true,
    soundName: 'default',
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
    date: updatedVal?.toDate(),
    playSound: true,
    soundName: 'default',
    importance: Importance.HIGH,
    vibrate: true,
    vibration: 300,
    repeatTime: 1,
  });
};

PushNotification.getScheduledLocalNotifications(nots => {
  console.log('nots', nots);
});
