import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import {vw} from '../../util/Dimensions';

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    backgroundColor: COLORS.mainBg,
  },
  cardStyle: {
    marginTop: 20,
    marginHorizontal: 20,
    height: 300,
    width: vw * 9,
    borderRadius: 22,
    position: 'absolute',
    elevation: 3,
    backgroundColor: COLORS.mainFg,
    shadowColor: '#7F5DF0',
    shadowOffset: {
      height: 20,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },

  topCont: {marginHorizontal: 20},
  opcTxt: {
    color: COLORS.mainFg,
    fontSize: FONTS.h3.fontSize,
  },
  touchOpac: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  nameTxt: {
    marginTop: 20,
    alignSelf: 'center',
    color: COLORS.mainBg,
    fontSize: FONTS.h1.fontSize,
  },
  descTxt: {
    alignSelf: 'center',
    paddingTop: 10,
    color: COLORS.mainBg,
    fontSize: FONTS.h3.fontSize,
  },
  nameProg: {
    marginTop: 20,
    alignSelf: 'center',
    color: COLORS.mainBg,
    fontSize: FONTS.largeTitle,
  },
  progressTxt: {
    fontWeight: 'bold',
  },
  progCont: {
    alignSelf: 'center',
    bottom: -30,
  },
  txtFt: {
    color: COLORS.mainBg,
    fontSize: FONTS.h3.fontSize,
    textAlign: 'center',
    paddingTop: 10,
  },
  timeTxt: {
    backgroundColor: COLORS.mainBg,
    color: COLORS.mainFg,
    fontWeight: '900',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 8,
    marginHorizontal: 8,
    marginVertical: 5,
  },
  contUpStyle: {
    flexDirection: 'row',
    paddingHorizontal: 120,
  },
  subTitleTwo: {fontWeight: 'bold', color: COLORS.mainBg},
  btnTwo: {
    backgroundColor: COLORS.mainFg,
    width: '80%',
    height: 50,
    marginVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    borderRadius: 12,
  },
});

export default styles;
