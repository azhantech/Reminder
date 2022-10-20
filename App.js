import React from 'react';
import {configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';

import AppStatusBar from './src/components/AppStatusBar';
import {COLORS} from './src/constants';
import RootNavigation from './src/navigation';
import {persistedReducer} from './src/redux/store';

const App = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  let persistor = persistStore(store);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppStatusBar
            backgroundColor={COLORS.mainBg}
            barStyle="light-content"
          />
          <RootNavigation />
        </PersistGate>
      </Provider>
      <Toast />
    </>
  );
};

export default App;
