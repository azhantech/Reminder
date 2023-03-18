import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
// import {BlurView} from '@react-native-community/blur';
import { vh, vw } from '../../utils/dimensions';
// const BottomSheetWrapperComponent =
const PopupHOC = props => {
  useImperativeHandle(props?.reference, () => ({
    hide: hide,
    show: show,
  }));
  const [visible, setVisible] = useState(false);
  const hide = onCancel => {
    setVisible(false);
    if (typeof onCancel === 'function') {
      onCancel();
    } else {
      if (props.onCancel) {
        props.onCancel();
      }
    }
  };
  const show = onShow => {
    setVisible(true);
    if (onShow) {
      onShow();
    } else {
      if (props.onShow) {
        props.onShow();
      }
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      style={styles.modal}>
      <View style={[styles.mainContainer, props.mainContainerStyle]}>
        <TouchableOpacity
          // onPress={hide}
          activeOpacity={0.9}
          style={styles.backdropContainer}>
          {/* <BlurView blurType="light" style={styles.blur} /> */}
        </TouchableOpacity>
        <View style={[styles.contentContainer, props.style]}>
          {props.children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdropContainer: {
    height: 100 * vh,
    width: 100 * vw,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  blur: {
    height: 100 * vh,
    width: 100 * vw,
  },
  contentContainer: {
    borderRadius: vh * 3,
    elevation: 10,
    width: 80 * vw,
    backgroundColor: 'white',
  },
  buttonContainer: {
    width: 100 * vw,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  button: {
    marginRight: vw * 2,
    marginVertical: vw * 2,
  },
  closeIcon: {
    width: 2.5 * vw,
    height: 2.5 * vw,
  },
});
export default PopupHOC;
