import {ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';

export const SpinLoader = () => {
  return (
    <ActivityIndicator animating={true} color={COLORS.mainFg} size="large" />
  );
};
