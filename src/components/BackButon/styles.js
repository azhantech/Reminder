import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: COLORS.mainBg,
    borderRadius: 25,
    width: 50,
  },
  backBtnImg: {
    tintColor: COLORS.transparentText,
    height: 50,
    width: 50,
  },
});

export default styles;
