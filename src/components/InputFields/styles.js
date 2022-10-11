import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

const styles = StyleSheet.create({
  textInputStyle: {
    color: COLORS.mainFg,
    paddingVertical: 0,
    outline: 'none',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 15,
    fontWeight: 'bold',
  },
  otherTextInputStyle: {
    color: COLORS.mainFg,
    paddingVertical: 0,
    outline: 'none',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
  },
});

export default styles;
