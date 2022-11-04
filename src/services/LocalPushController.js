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

export const LocalNotification = (id, date, start_time, text) => {
  const dateVal = moment(date, 'LL');
  const startVal = moment(start_time, 'LT');
  const testDate = moment('03:48 PM', 'hh:mm A');
  console.log(date);
  console.log(start_time);
  console.log(typeof id);
  console.log(text);

  let updatedVal = dateVal
    ?.hour(startVal ? startVal.hours() : dateVal.hours())
    .minute(startVal ? startVal.minutes() : dateVal.minutes());

  console.log(updatedVal?.toDate()); // Javascript DateTime object

  console.log('entered here', testDate.toDate());

  PushNotification.localNotificationSchedule({
    id: `${id}`,
    channelId: 'hello',
    channelName: 'my channel',
    autoCancel: true,
    message: `Time to do ${text}`,
    title: `Start doing ${text}!`,
    date: new Date(Date.now() + 60 * 1000),
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
