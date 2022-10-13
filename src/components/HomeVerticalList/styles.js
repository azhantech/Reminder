import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

const styles = StyleSheet.create({
  mainCont: {
    backgroundColor: COLORS.mainBg,
    marginVertical: 10,
    textAlign: 'left',
    paddingLeft: 10,
    marginVertical: 12,
    marginHorizontal: 25,
    paddingVertical: 20,
  },
  txtStyle: {
    color: COLORS.black,
    fontWeight: '800',
  },
  listCont: {
    height: 200,
  },
});

export default styles;
