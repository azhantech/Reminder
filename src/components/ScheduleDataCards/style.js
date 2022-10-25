import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const styles = StyleSheet.create({
  mainCont: {
    marginVertical: 10,
    marginHorizontal: 5,
    paddingLeft: 5,
    paddingVertical: 20,
    borderRadius: 10,
    elevation: 5,
    width: '50%',
  },
  imgStyle: {
    height: 25,
    width: 25,
    tintColor: COLORS.mainBg,
  },
  upperCont: {flexDirection: 'row', paddingBottom: 5},
  lowerCont: {},
  progTxt: {
    paddingLeft: 10,

    color: COLORS.mainBg,
    fontSize: FONTS.h3.fontSize,
  },
  titleTxt: {
    fontSize: FONTS.h5.fontSize,
    paddingLeft: 25,
    color: COLORS.mainBg,
  },
});

export default styles;
