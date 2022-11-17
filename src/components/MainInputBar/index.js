import {View, TextInput} from 'react-native';
import React from 'react';
import styles from './styles';

export const MainInputBar = React.forwardRef((props, ref) => {
  return (
    <>
      <View>
        <TextInput
          ref={ref}
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
});
