import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

const styles = StyleSheet.create({
  textInputStyle: {
    color: COLORS.mainFg,
    paddingVertical: 0,
    outline: 'none',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 12,
    fontWeight: 'bold',
    width: '202%',
  },
  otherTextInputStyle: {
    color: COLORS.mainFg,
    paddingVertical: 0,
    outline: 'none',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 12,
    width: '90%',
    fontWeight: 'bold',
  },
  slopStyle: {top: 20, bottom: 20, left: 25, right: 25},
});

export default styles;
