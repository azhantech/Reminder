import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.mainBg,
    flex: 1,
    paddingVertical: 20,
  },
  upperContainer: {
    marginBottom: 5,
  },
  middleContainer: {
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerContainer: {
    alignItems: 'center',
  },
  textThree: {
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  upperMiddleText: {
    fontSize: FONTS.h1.fontSize,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  btnContainer: {
    backgroundColor: COLORS.mainFg,
    width: '50%',
    height: '28%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  btnText: {
    color: COLORS.mainBg,
    fontWeight: 'bold',
  },
});

export default styles;
