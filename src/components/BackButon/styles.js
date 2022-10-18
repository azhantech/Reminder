import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: COLORS.mainFg,
    borderRadius: 25,
    width: 50,
  },
  backBtnImg: {
    tintColor: COLORS.mainBg,
    height: 30,
    width: 30,
    alignSelf: 'center',
  },
});

export default styles;
