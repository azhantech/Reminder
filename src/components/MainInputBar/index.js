import {View, TextInput} from 'react-native';
import React from 'react';

import styles from './styles';

const MainInputBar = ({placeholder, value, onChangeText}) => {
  return (
    <>
      <View>
        <TextInput
          autoCapitalize="sentences"
          multiline={true}
          style={styles.otherTextInputStyle}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          // placeholderTextColor={COLORS.t}
        />
      </View>
    </>
  );
};

export default MainInputBar;
