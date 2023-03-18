import React, { useRef, useState } from 'react';
import { Platform, StatusBar, StyleSheet, UIManager, View } from 'react-native';
import Navigator from './src/navigation/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/src/integration/react';
import { store, persistor } from './src/redux/store';
import { initiateNotification } from './src/services/LocalPushController';
import ReactnativeSplash from 'react-native-animated-splash';
import AlarmPopUp from './src/Component/AlarmPopUp';
import PushNotification from 'react-native-push-notification';
import { generalImages } from './src/assets/images';
const App = props => {
  const [notificationData, setNotificationData] = useState(null);
  const confirmationRef = useRef();
  React.useEffect(() => {
    initiateNotification();
    ReactnativeSplash.hide();

  }, []);

  PushNotification.configure({
    onNotification: notification => {
      setNotificationData(notification);
      confirmationRef?.current?.show()
    },
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />

          <Navigator />

          <AlarmPopUp
            reference={confirmationRef}
            icon={generalImages.joggingPerson}
            title="Go Jogging"
            primaryButtonText="Snooze"
            secondaryButtonText="I'm Going"
            notificationData={notificationData}
          />
        </View>
      </PersistGate>
    </Provider>
  );
};


export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
