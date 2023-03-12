import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import Navigation from './src/navigation';
import {colors} from './src/utils/appTheme';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <Navigation />
    </View>
  );
};

export default App;
