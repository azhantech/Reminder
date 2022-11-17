import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    backgroundColor: COLORS.mainBg,
  },
  upMainCont: {
    marginHorizontal: 15,
    marginBottom: 150,
  },
  upperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  contView: {
    flexDirection: 'row',
    marginRight: 16,
    justifyContent: 'space-between',
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
