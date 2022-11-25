import {Platform, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.mainFg,
    height: Platform.OS === 'android' ? 350 : 400,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: COLORS.transparentWhite,
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },

  body: {
    marginTop: -40,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBg,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: COLORS.mainFg,
    fontWeight: '600',
    marginVertical: 30,
    position: 'absolute',
  },
  info: {
    fontSize: 16,
    marginVertical: 70,
    color: COLORS.mainFg,

    position: 'absolute',
  },
  description: {
    fontSize: 16,
    color: COLORS.white,
    position: 'absolute',
    textAlign: 'center',
    marginVertical: 100,
  },
  buttonContainer: {
    marginTop: 20,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: COLORS.mainFg,
  },
  buttonContainer2: {
    marginTop: 40,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: COLORS.mainFg,
  },
  btnStyle: {
    color: COLORS.white,
    fontSize: FONTS.body3.fontSize,
  },
});
export default styles;
