import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

const styles = StyleSheet.create({
  touchStyle: {
    top: -40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  containerStyle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.mainFg,
  },
});

export default styles;
