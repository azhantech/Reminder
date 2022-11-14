import {View, Text, TextInput, Pressable, Image} from 'react-native';
import React from 'react';

import {COLORS, icons} from '../../constants';
import styles from './styles';
import {useTogglePasswordVisibility} from '../../hooks/useTogglePasswordVisibility';

export const InputFields = React.forwardRef((props, ref) => {
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();

  if (props.isPassword) {
    return (
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TextInput
          ref={ref}
          style={styles.otherTextInputStyle}
          blurOnSubmit={false}
          placeholderTextColor={COLORS.transparentBlack1}
          secureTextEntry={passwordVisibility}
          {...props}
        />
        {rightIcon == 'eye' ? (
          <Pressable
            style={{
              right: 45,
            }}
            hitSlop={styles.slopStyle}
            onPress={handlePasswordVisibility}>
            <Image
              source={icons.eye}
              style={{
                tintColor: COLORS.mainFg,
                marginTop: 12,
                height: 25,
                width: 25,
                marginRight: 20,
                resizeMode: 'contain',
              }}
            />
          </Pressable>
        ) : (
          <Pressable
            style={{
              right: 45,
            }}
            onPress={handlePasswordVisibility}>
            <Image
              source={icons.hidden}
              style={{
                tintColor: COLORS.mainFg,
                marginTop: 12,
                height: 25,
                width: 25,
                marginRight: 20,
                resizeMode: 'contain',
              }}
            />
          </Pressable>
        )}
      </View>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TextInput
          ref={ref}
          style={styles.otherTextInputStyle}
          blurOnSubmit={false}
          placeholderTextColor={COLORS.transparentBlack1}
          {...props}
        />
      </View>
    );
  }
});
