import {View, TextInput} from 'react-native';
import React from 'react';

import {COLORS} from '../../constants';
import styles from './styles';

const InputFields = ({placeholder, value, onChangeText, isPassword}) => {
  return (
    <>
      {isPassword ? (
        <View>
          <TextInput
            style={styles.textInputStyle}
            placeholder={placeholder}
            secureTextEntry={true}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor={COLORS.transparentBlack1}
          />
        </View>
      ) : (
        <View>
          <TextInput
            style={styles.otherTextInputStyle}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor={COLORS.transparentBlack1}
          />
        </View>
      )}
    </>
  );
};

export default InputFields;
