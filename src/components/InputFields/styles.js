import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

const styles = StyleSheet.create({
  textInputStyle: {
    color: COLORS.mainFg,
    paddingVertical: 0,
    outline: 'none',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 12,
    fontWeight: 'bold',
    width: '202%',
  },
  otherTextInputStyle: {
    color: COLORS.mainFg,
    paddingVertical: 0,
    outline: 'none',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: Platform.OS === 'android' ? 12 : 20,
    width: '90%',
    fontWeight: 'bold',
  },
  slopStyle: {top: 20, bottom: 20, left: 25, right: 25},
  imgStyle: {
    tintColor: COLORS.mainFg,
    marginTop: Platform.OS === 'android' ? 12 : 4,
    height: 25,
    width: 25,
    marginRight: 20,
    resizeMode: 'contain',
  },
});

export default styles;
