import {StyleSheet} from 'react-native';
import {vh, vw} from '../../utils/dimensions';
// import themeColors from '../../../Utils/themeColors';
// import {vh, vw} from '../../../Utils/Untis';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70 * vw,
    height: 30 * vh,
    backgroundColor: '#000c',
    elevation: 10,
    shadowColor: '#ffff',
  },
  contentContainer: {
    padding: vw * 6,
    paddingTop: vw * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: vh * 6,
    width: vh * 6,
    position: 'absolute',
    top: (-vh * 6) / 2,
  },
  icon: {
    height: vh * 6.25,
    width: vh * 6.25,
    marginBottom: vh * 2,
  },
  title: {
    color: '#ffff',
    fontSize: vh * 2,
    marginBottom: vh * 1.8,
    textAlign: 'center',
  },
  subText: {
    color: '#000',
    fontSize: vh * 1.6,
    textAlign: 'center',
  },
  subText: {
    color: '#000',
    fontSize: vh * 1.6,
    textAlign: 'center',
    width: vw * 60,
  },
  primaryButton: {
    backgroundColor: 'black',
    height: vh * 6,
    width: vw * 25,
    paddingVertical: 1 * vh,
    marginTop: vh * 1.8,
    marginRight: vh * 0.6,
    elevation: 5,
    shadowColor: 'white',
    borderColor: '#ffff',
    borderRadius: 1,
    borderWidth: 0.2,
  },
  secondaryButton: {
    backgroundColor: 'black',
    height: vh * 6,
    width: vw * 25,
    paddingVertical: 1 * vh,
    marginTop: vh * 1.8,
    marginRight: vh * 0.6,
    elevation: 5,
    shadowColor: 'white',
    borderColor: '#ffff',
    borderRadius: 1,
    borderWidth: 0.2,
    justifyContent: 'center',
  },
  iconStyle: {
    tintColor: 'grey',
  },
  IconButton: {
    alignSelf: 'flex-end',
    padding: vw * 1,
    width: 10 * vw,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
export default styles;
