import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/theme';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.mainBg,
    flex: 1,
  },
  upperContainer: {
    marginVertical: 10,
  },
  middleContainer: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textThree: {
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default styles;
