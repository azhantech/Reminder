import {ActivityIndicator, View} from 'react-native';
import React, {Component} from 'react';
import {COLORS} from '../../constants';

export class SpinLoader extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: '#4c4949cf',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator
          style={{
            alignSelf: 'center',
          }}
          color={COLORS.mainFg}
          size="large"
        />
      </View>
    );
  }
}

export default SpinLoader;
