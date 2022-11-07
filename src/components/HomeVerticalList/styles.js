import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: COLORS.mainBg,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 12,
    marginHorizontal: 25,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slideOpac: {
    backgroundColor: 'red',
    justifyContent: 'center',
    marginLeft: 20,
    marginVertical: 10,
    borderRadius: 40,
  },
  txtStyle: {
    color: COLORS.black,
    fontWeight: '400',
    fontSize: FONTS.h3.fontSize,
    textAlign: 'center',
  },
  listCont: {
    height: 200,
  },
  imgStyle: {
    resizeMode: 'contain',
    height: 40,
    width: 40,
    tintColor: COLORS.mainBg,
  },
  img2Style: {
    height: 45,
    width: 45,
    tintColor: COLORS.mainFg,
    transform: [{rotateY: '145deg'}, {rotateZ: '145deg'}],
  },
  mainCont2: {
    position: 'absolute',
    borderRadius: 10,
    backgroundColor: COLORS.mainBg,
    marginVertical: 10,
    marginVertical: 12,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  emptyText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: FONTS.body2.fontSize,
    color: COLORS.lightGray,
  },
});

export default styles;
