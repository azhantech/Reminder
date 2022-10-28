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
    marginVertical: 20,
    color: COLORS.black,
    left: -50,
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
    marginVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    borderRadius: 12,
  },
  touchableCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otherTextInputStyle: {
    color: 'black',
    borderColor: COLORS.mainFg,
    paddingVertical: 2,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 15,
    paddingRight: 70,
    fontWeight: 'bold',
    fontSize: 20,
  },
  otherTwoTextInputStyle: {
    borderColor: COLORS.mainBg,
    paddingVertical: 2,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 15,
    paddingRight: 70,
  },
  opacStyle: {
    paddingTop: 20,
    marginRight: 20,
  },
  imgStyle: {
    height: 25,
    width: 25,
    tintColor: COLORS.mainFg,
  },
});

export default styles;
