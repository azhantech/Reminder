import React from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import {COLORS} from '../../constants';

const AppStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={[styles.statusBar, backgroundColor]}>
      <StatusBar
        backgroundColor={backgroundColor}
        {...props}
        StatusBarStyle={'dark-content'}
      />
    </View>
  );
};

const BAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    color: COLORS.mainFg,
  },
});

export default AppStatusBar;
