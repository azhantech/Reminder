import moment from 'moment';
import PushNotification, {Importance} from 'react-native-push-notification';

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

PushNotification.createChannel(
  {
    channelId: 'channel-id',
    channelName: 'my channel',
    channelDescription: 'A channel for Notification',
    playSound: true,
    soundName: 'default',
    importance: Importance.HIGH,
    vibrate: true,
  },
  created => console.log(`channel created ${created}`),
);

PushNotification.getChannels(function (channel_ids) {
  console.log(channel_ids); // ['channel_id_1']
});

export const LocalNotification = (id, date, start_time) => {
  const dateVal = moment(date, 'LL');
  const startVal = moment(start_time, 'LT');

  let updatedVal = dateVal
    ?.hour(startVal ? startVal.hours() : dateVal.hours())
    .minute(startVal ? startVal.minutes() : dateVal.minutes());

  console.log(updatedVal?.toDate()); // Javascript DateTime object

  PushNotification.localNotificationSchedule({
    channelId: 'channel-id',
    channelNameL: 'my channel',
    autoCancel: true,
    bigText: 'This is Local Demo Notification',
    subText: 'Local Notification demo',
    title: 'Local Notification Title',
    message: 'hey, expand me!!',
    date: updatedVal?.toDate(),
    playSound: true,
    soundName: 'default',
    importance: 10,
    vibrate: true,
    vibration: 300,
  });
};
