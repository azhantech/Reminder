import React from 'react';
import Toast from 'react-native-toast-message';
import AppStatusBar from './src/components/AppStatusBar';
import {COLORS} from './src/constants';
import RootNavigation from './src/navigation';

const App = () => {
  return (
    <>
      <AppStatusBar backgroundColor={COLORS.mainBg} barStyle="light-content" />
      <RootNavigation />
      <Toast />
    </>
  );
};

export default App;
