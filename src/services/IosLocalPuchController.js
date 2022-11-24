import PushNotificationIOS from '@react-native-community/push-notification-ios';

export const iosLocalNotification = (id, updatedVal, message, text) => {
  console.log('PROVIDED TEXT =====> ', updatedVal);

  PushNotificationIOS.addNotificationRequest({
    id: `${id}`,
    title: text,
    subtitle: message,
    fireDate: updatedVal?.toDate(),
    sound: 'default',
    isCritical: true,
  });
};
