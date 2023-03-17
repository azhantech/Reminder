import React from 'react';
import {StyleSheet} from 'react-native';
import {fonts} from '../../../assets/fonts';
// fonts
import TextWrapper from '../TextWrapper';

const RubikRegular = props => {
  return (
    <TextWrapper {...props} style={[styles.text, props.style]}>
      {props.children}
    </TextWrapper>
  );
};
const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.rubik.regular,
  },
});
export default RubikRegular;
