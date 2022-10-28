import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.mainMg,
  },
  upContainer: {
    backgroundColor: COLORS.mainBg,
    borderBottomRightRadius: 45,
    borderBottomLeftRadius: 45,
    paddingVertical: 20,
  },

  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  upperLevelImgContainer: {},
  profileImgStyle: {
    width: 95,
    height: 60,
  },
  upperLevelTxtContainer: {},
  helloTxtStyle: {
    color: COLORS.black,
    fontSize: FONTS.h1.fontSize,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  numTxtStyle: {
    color: COLORS.lightGray3,
    fontWeight: '700',
  },
  middleContainer: {
    marginVertical: 20,
  },
  middleTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  catTxtStyle: {
    color: COLORS.black,
    fontSize: FONTS.h2.fontSize,
    fontWeight: '500',
  },
  bottomContainer: {
    paddingVertical: 10,
  },
  bottomTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  catOneTxtStyle: {
    color: COLORS.black,
    fontSize: FONTS.h2.fontSize,
    fontWeight: '500',
  },
  catTwoTxtStyle: {
    color: COLORS.transparentText,
    fontWeight: '300',
    ...FONTS.h3,
  },
  linkTaskStyle: {
    color: COLORS.lightGray3,
    fontSize: FONTS.h3.fontSize,
  },
  opacView: {},
  opacTxt: {
    color: COLORS.mainFg,
    fontSize: FONTS.h3.fontSize,
    fontWeight: '800',
  },
});

export default styles;
