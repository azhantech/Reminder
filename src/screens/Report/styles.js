import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,

    backgroundColor: COLORS.mainBg,
  },
  upperContainer: {
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
  projTxt: {
    color: COLORS.black,
    fontWeight: '800',
    fontSize: FONTS.h2.fontSize,
  },
});

export default styles;
