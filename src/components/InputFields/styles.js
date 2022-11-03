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
    width: 285,
  },
  otherTextInputStyle: {
    color: COLORS.mainFg,
    paddingVertical: 0,
    outline: 'none',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 12,
    fontWeight: 'bold',
  },
});

export default styles;
