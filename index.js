/**
 * @format
 */

import moment from 'moment';
import { AppRegistry } from 'react-native';
import PushNotification from 'react-native-push-notification';
import App from './App';
import { name as appName } from './app.json';
import { LocalNotification } from './src/services/LocalPushController';
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
            console.log('snooze')
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


AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask(
    'RNPushNotificationActionHandlerTask', // you must use the same name
    () => {
        console.log('heloooooo')
        return function (notification) {
            if (notification.action === 'Snooze') {
                console.log('snooze')
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
        }
    }
);
