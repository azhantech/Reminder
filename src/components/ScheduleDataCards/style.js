import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const styles = StyleSheet.create({
  mainCont: {
    marginVertical: 10,
    flexWrap: 'wrap',
    marginHorizontal: 5,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    elevation: 5,
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
  },
});

export default styles;
