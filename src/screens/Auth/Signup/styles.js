import {Platform, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.mainBg,
    flex: 1,
  },
  subContainerOne: {
    backgroundColor: 'white',
  },
  imgOne: {
    marginTop: Platform.OS === 'ios' ? 15 : 18,
    width: '100%',
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  scrollContainer: {
    marginHorizontal: 20,
  },
  termsText: {color: COLORS.mainFg},
  policyText: {color: COLORS.mainFg},
  bottomContainer: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  bottomButtonOne: {
    backgroundColor: COLORS.mainFg,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
  },
  bottomContainerOne: {
    width: 350,
    marginHorizontal: 50,
  },
  bottomText: {fontWeight: 'bold'},
  bottomMostText: {
    marginTop: 10,
    color: COLORS.transparentContainer,
    paddingBottom: 100,
  },
  linkText: {color: COLORS.mainFg},
  addText: {
    color: COLORS.gray,
    textAlign: 'center',
  },

  btnTwo: {
    backgroundColor: COLORS.mainFg,
    width: '50%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  subTitleTwo: {
    fontWeight: 'bold',
    color: COLORS.mainBg,
  },
});

export default styles;
