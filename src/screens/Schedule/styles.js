import {Platform, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import {vh, vw} from '../../util/Dimensions';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginVertical: Platform.OS === 'android' ? 20 : 50,
  },
  upperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {},
  upperText: {
    color: COLORS.black,
    fontSize: FONTS.h2.fontSize,
    fontWeight: '700',
  },
  calendarHeaderStyle: {
    color: 'black',
    fontSize: FONTS.h3.fontSize,
  },
  dateNumberStyle: {
    borderWidth: 1,
    color: COLORS.black,
    borderColor: COLORS.mainBg,
    backgroundColor: COLORS.mainBg,
    borderRadius: 10,
  },
  dateNameStyle: {
    color: COLORS.black,
    borderColor: COLORS.mainBg,
    backgroundColor: COLORS.mainBg,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 2,
  },

  highlightDateNameStyle: {
    color: COLORS.mainBg,
    borderColor: COLORS.mainFg,
    backgroundColor: COLORS.mainFg,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 2,
  },

  highlightDateNumberStyle: {
    color: COLORS.mainFg,
    borderRadius: 10,
  },
  bottomUpContainer: {
    backgroundColor: COLORS.mainBg,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    height: 60,
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: 10,

    alignItems: 'center',
  },
  bottomUpTxt: {
    color: COLORS.mainBg,
    alignSelf: 'center',
    fontWeight: '600',
  },
  offBottomUpTxt: {
    color: COLORS.black,
    alignSelf: 'center',
    fontWeight: '600',
  },
  TouchViewStyle: {
    marginHorizontal: 2,
    backgroundColor: COLORS.mainFg,
    paddingVertical: 10,
    borderRadius: 10,
    width: '30%',
    height: '80%',
    justifyContent: 'center',
  },
  offTouchViewStyle: {
    marginHorizontal: 2,
    backgroundColor: COLORS.mainBg,
    paddingVertical: 10,
    borderRadius: 10,
    width: '30%',
    height: '80%',
    justifyContent: 'center',
  },

  calendarStripStyle: {
    height: vh * 2,
    width: vw * 80,
    paddingBottom: 30,
    marginTop: vh * 0.3,
    backgroundColor: COLORS.lightGray3,
    borderRadius: 200,
  },

  iconContainer: {},
  upperTopContainer: {},
  upperBottomContainer: {},
  bottomTopContainer: {},
});

export default styles;
