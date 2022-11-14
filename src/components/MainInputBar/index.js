import {View, TextInput} from 'react-native';
import React from 'react';
import styles from './styles';
import {COLORS} from '../../constants';

const MainInputBar = props => {
  return (
    <>
      <View>
        <TextInput
          autoCapitalize="sentences"
          // multiline={true}
          style={styles.otherTextInputStyle}
          value={props.value}
          onChangeText={props.onChangeText}
          placeholderTextColor={'gray'}
          {...props}
        />
      </View>
    </>
  );
};

export default MainInputBar;
