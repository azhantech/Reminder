import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const styles = StyleSheet.create({
  listCont: {
    backgroundColor: COLORS.mainFg,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 30,
    borderRadius: 10,
    elevation: 5,
    opacity: 0.93,
  },
  mainCont: {
    height: '100%',
  },
  absoluteView: {
    flexDirection: 'row',
    width: '5%',
    height: 50,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 2,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 2,
  },
  progressStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressTxt: {
    fontWeight: '800',
  },
  circleStyle: {
    marginTop: -10,
    marginBottom: 14,
  },
  nameStyle: {
    color: COLORS.mainBg,
    fontSize: FONTS.h3.fontSize,
    fontWeight: 'bold',
    marginTop: -15,
  },

  descStyle: {
    fontWeight: '400',
    paddingTop: 6,
    color: COLORS.white,
  },
  calendarMain: {
    flexDirection: 'row',
  },
  calendarIconView: {
    flexDirection: 'row',
  },
  calendarStyle: {
    tintColor: 'white',
    height: 15,
    width: 15,
    marginRight: 10,
    marginTop: 2,
  },
  checkMain: {
    flexDirection: 'row',
    paddingLeft: 60,
  },
  subView: {
    paddingHorizontal: 30,
    marginTop: -30,
  },
  extraTxt: {color: COLORS.white},
});

export default styles;
