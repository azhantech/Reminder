import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    backgroundColor: COLORS.mainBg,
  },
  upperCont: {
    justifyContent: 'space-around',
    marginTop: 10,
    flexDirection: 'row',
  },
  mainText: {
    marginVertical: 18,
    color: COLORS.black,
    left: -65,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    marginHorizontal: 40,
    ...FONTS.h1,
  },
  txtFt: {
    color: COLORS.mainBg,
    fontSize: FONTS.h2.fontSize,
    textAlign: 'center',
    marginVertical: 5,
  },
  txtFtd: {
    color: COLORS.mainBg,
    fontSize: FONTS.h3.fontSize,
    textAlign: 'center',

    marginVertical: 5,
  },
  timeTxt: {
    backgroundColor: COLORS.mainBg,
    color: COLORS.mainFg,
    fontWeight: '900',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 2,
    paddingVertical: 10,
    marginVertical: 10,
  },
  contUpStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flatStyle: {
    marginHorizontal: 20,
    marginBottom: 50,
  },
  renderMain: {
    marginVertical: 32,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 50,
    backgroundColor: COLORS.mainFg,
    elevation: 2,
    opacity: 0.85,
  },
});

export default styles;
