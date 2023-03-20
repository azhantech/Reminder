import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { vh, vw } from '../../utils/dimensions';

const styles = StyleSheet.create({
  modalStyle: {
    height: 100 * vh,
    width: 100 * vh,
  },
  mainContainerStyle: {
    backgroundColor: 'rgba(108,124,142,0.4)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemViewStyle: {
    minHeight: 30 * vh,
    width: 80 * vw,
    borderRadius: 3 * vw,
    alignItems: 'center',
    backgroundColor: '#000',
  },

  textButtonStyle: {
    width: 70 * vw,
    marginTop: 2 * vh,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedButtonStyle: {
    width: 70 * vw,
    marginTop: 2 * vh,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1 * vw,
    backgroundColor: '#29A6DB',
  },

  textStyle: {
    fontSize: 1.8 * vh,
    color: '#949494',
  },

  selectedTextStyle: {
    fontSize: 1.8 * vh,
    color: '#fff',
    fontWeight: 'bold',
  },

  headingLabel: {
    textAlign: 'center',
    color: '#CCCCCC',
    fontSize: 2 * vh,
    width: 80 * vw,
  },

  closeBtn: {
    height: 3 * vh,
    width: 15 * vw,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    alignItems: 'center',
  },

  crossIconStyle: { width: 2 * vh, height: 2 * vw, resizeMode: 'contain' },

  contentContainerStyle: {
    width: 70 * vw,
    alignItems: 'center',
    marginTop: 0.8 * vh,
  },

  scrollViewStyle: {
    flex: 1,
    marginBottom: 2 * vh,
  },

  chooseCrossViewStyle: {
    flexDirection: 'row',
    width: 80 * vw,
    justifyContent: 'space-between',
    marginTop: 2 * vh,
  },
});

export default styles;
