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
  console.log('PROVIDED TEXT =====> ', updatedVal);

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

// export const LocalEndNotification = (id, endTime, date, text) => {
//   const dateVal = moment(date, 'LL');
//   const startVal = moment(endTime, 'LT');

//   let updatedVal = dateVal
//     ?.hour(startVal ? startVal.hours() : dateVal.hours())
//     .minute(startVal ? startVal.minutes() : dateVal.minutes());

//   console.log(updatedVal?.toDate()); // Javascript DateTime object

//   PushNotification.localNotificationSchedule({
//     id: `${id}`,
//     channelId: 'hello',
//     channelName: 'my channel',
//     autoCancel: true,
//     message: `Two minutes left in ending ${text}`,
//     title: ` ${text} Ending soon!`,
//     date: updatedVal?.toDate(),
//     playSound: true,
//     soundName: 'default',
//     importance: Importance.HIGH,
//     vibrate: true,
//     vibration: 300,
//     repeatTime: 1,
//   });
// };

PushNotification.getScheduledLocalNotifications(nots => {
  console.log('nots', nots);
});

export const shown = () => {
  PushNotification.localNotification({
    channelId: 'channel-id',
    channelName: 'my channel',
    autoCancel: true,
    title: `Start doing`,
    playSound: true,
    soundName: 'default',
    importance: Importance.HIGH,
    vibrate: true,
    vibration: 300,
  });
};
