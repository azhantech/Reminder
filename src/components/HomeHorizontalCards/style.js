import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 20,
    paddingHorizontal: 30,
    marginVertical: 10,
    paddingVertical: 40,
    transform: [
      {
        rotateX: '20deg',
      },
    ],
    borderRadius: 14,
  },
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    top: -30,
  },
  upContText: {
    color: COLORS.mainBg,
    fontSize: FONTS.h2.fontSize,
    fontWeight: '500',
  },
  upContOneText: {
    color: COLORS.mainBg,
    fontSize: FONTS.h3.fontSize,
  },
  upContInnerView: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  upContOneImg: {
    width: 18,
    height: 22,
    marginRight: 2,
  },
  bottomBelowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  progressText: {
    color: COLORS.mainBg,
  },
});

export default styles;
