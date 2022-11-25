import {Platform, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    backgroundColor: COLORS.mainBg,
  },
  upperCont: {
    justifyContent: 'space-around',
    marginTop: Platform.OS === 'android' ? 10 : 35,
    flexDirection: 'row',
  },
  mainText: {
    marginVertical: 20,
    color: COLORS.black,
    textAlign: 'center',
    fontWeight: 'bold',
    ...FONTS.h1,
  },
  lowerCont: {
    backgroundColor: COLORS.mainBg,
    marginHorizontal: 10,
    marginTop: 20,
    paddingBottom: 150,
  },
  labelStyle: {
    color: COLORS.transparentText,
    fontSize: FONTS.body3.fontSize,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  colorSel: {
    borderRadius: 30,
    borderWidth: 1,
    height: 60,
    width: 60,
    marginHorizontal: 2,
  },
  imgSty: {
    tintColor: 'white',
    marginTop: 12,
    width: 30,
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  subTitleTwo: {fontWeight: 'bold', color: COLORS.mainBg},
  btnTwo: {
    backgroundColor: COLORS.mainFg,
    width: '80%',
    height: 50,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    borderRadius: 12,
  },
  btnThree: {
    backgroundColor: COLORS.red,
    width: '80%',
    height: 50,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    borderRadius: 12,
  },
});

export default styles;
