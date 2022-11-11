import {StyleSheet, Platform} from 'react-native';
import {COLORS} from '../../constants';
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
    marginBottom: 50,
  },
  bottomContainer: {
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 200,
  },
  btnTwo: {
    backgroundColor: COLORS.mainFg,
    width: '50%',
    height: '20%',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  btnThree: {
    backgroundColor: COLORS.red,
    width: '50%',
    height: '20%',
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
    marginTop: 10,
    marginBottom: 20,
    color: COLORS.gray,
  },
  imgPressable: {
    tintColor: COLORS.mainFg,
    height: 25,
    width: 25,
    marginTop: 10,
  },
});

export default styles;
