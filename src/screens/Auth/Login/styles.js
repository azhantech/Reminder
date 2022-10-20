import {StyleSheet, Platform} from 'react-native';
import {COLORS} from '../../../constants';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.mainBg,
    flex: 1,
  },
  oneContainer: {
    backgroundColor: 'white',
  },
  imgOne: {
    marginTop: Platform.OS === 'ios' ? 60 : 30,
    width: 380,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  scrollContainer: {
    marginHorizontal: 20,
  },
  scrollContainerTwo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  btnTwo: {
    backgroundColor: COLORS.mainFg,
    width: '50%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  subContainerTwo: {
    width: 350,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  subTitleTwo: {fontWeight: 'bold', color: COLORS.mainBg},
  bottomText: {
    marginVertical: 10,
    color: COLORS.gray,
  },
});

export default styles;
