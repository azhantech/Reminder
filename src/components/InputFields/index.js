import {View, Text, TextInput, Pressable} from 'react-native';
import React from 'react';

import {COLORS} from '../../constants';
import styles from './styles';

export const InputFields = React.forwardRef((props, ref) => {
  return (
    <>
      {props.isPassword ? (
        <View>
          <TextInput
            ref={ref}
            style={styles.textInputStyle}
            blurOnSubmit={false}
            placeholderTextColor={COLORS.transparentBlack1}
            returnKeyType="next"
            {...props}
          />
        </View>
      ) : (
        <View>
          <TextInput
            ref={ref}
            style={styles.otherTextInputStyle}
            blurOnSubmit={false}
            placeholderTextColor={COLORS.transparentBlack1}
            returnKeyType="next"
            {...props}
          />
        </View>
      )}
    </>
  );
});
