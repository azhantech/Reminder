import PushNotificationIOS from '@react-native-community/push-notification-ios';

export const iosInitiateNotification = () => {
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

  PushNotificationIOS.createChannel({
    channelId: 'hello',
    channelName: 'my channel',
    channelDescription: 'A channel for Notification',
    playSound: true,
    soundName: 'default',
    vibrate: true,
  });
};

export const iosLocalNotification = (id, updatedVal, message, text) => {
  console.log('PROVIDED TEXT =====> ', updatedVal);

  PushNotificationIOS.addNotificationRequest({
    id: `${id}`,
    channelId: 'hello',
    channelName: 'my channel',
    title: text,
    subtitle: message,
    fireDate: updatedVal?.toDate(),
    sound: 'default',
    isCritical: true,
  });
};
