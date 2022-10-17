import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const styles = StyleSheet.create({
  otherTextInputStyle: {
    color: 'black',
    paddingVertical: 2,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 15,
    fontWeight: 'bold',
    borderColor: COLORS.mainFg,
    fontSize: 20,
    textAlignVertical: 'top',
  },
});

export default styles;
