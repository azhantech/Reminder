import React from 'react';
import {Platform, StatusBar, StyleSheet, UIManager, View} from 'react-native';
import Navigator from './src/navigation/index';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/src/integration/react';
import {store, persistor} from './src/redux/store';
import {
  initiateNotification,
  LocalNotification,
} from './src/services/LocalPushController';

const App = props => {
  React.useEffect(() => {
    initiateNotification();

    // LocalNotification();
  }, []);
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
