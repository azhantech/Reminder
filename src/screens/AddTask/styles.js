import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    backgroundColor: COLORS.mainBg,
  },
  upperCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  mainText: {
    marginVertical: 20,
    color: COLORS.black,
    alignSelf: 'center',
    fontWeight: 'bold',
    ...FONTS.h1,
  },
  lowerCont: {
    backgroundColor: COLORS.mainBg,
    marginHorizontal: 10,
    paddingBottom: 150,
  },
  labelStyle: {
    color: COLORS.transparentText,
    fontSize: FONTS.body3.fontSize,
    marginHorizontal: 20,
    marginBottom: 15,
    marginTop: 8,
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
  timeInpStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 5,
  },
  datePickerTxt: {
    width: 110,
    height: 100,
  },
  subTitleTwo: {fontWeight: 'bold', color: COLORS.mainBg},
  btnTwo: {
    backgroundColor: COLORS.mainFg,
    width: '80%',
    height: 50,
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    borderRadius: 12,
  },
  addCatOpac: {
    backgroundColor: COLORS.mainBg,
    borderWidth: 2,
    borderColor: COLORS.mainFg,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 50,
    borderRadius: 20,
  },
  addTextOpac: {
    color: COLORS.mainFg,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default styles;
