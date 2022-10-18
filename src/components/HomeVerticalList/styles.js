import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: COLORS.mainBg,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 12,
    marginHorizontal: 25,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtStyle: {
    color: COLORS.black,
    fontWeight: '800',
    fontSize: FONTS.h2.fontSize,
    textAlign: 'center',
  },
  listCont: {
    height: 200,
  },
  imgStyle: {
    height: 45,
    width: 45,
    tintColor: COLORS.mainFg,
  },
});

export default styles;
