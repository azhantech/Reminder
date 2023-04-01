import {View, Image, TouchableOpacity} from 'react-native';
import React, {useImperativeHandle, useRef, useEffect, useState} from 'react';
import PopupHOC from '../PopupHOC';
import styles from './styles';
import SoundPlayer from 'react-native-sound-player';
import CircularBold from '../Texts/CircularBold';
import {vh} from '../../utils/dimensions';
import {LocalNotification} from '../../services/LocalPushController';
import moment from 'moment';

const AlarmPopUp = props => {
  useEffect(() => {
    if (props?.visible) {
      startMusic();
    }
  }, [props?.visible]);
  const startMusic = () => {
    try {
      SoundPlayer.playSoundFile('alarm', 'mp3');
      SoundPlayer.onFinishedPlaying(success => {
        if (success) {
          SoundPlayer.playSoundFile('alarm', 'mp3');
        }
      });
    } catch (e) {
      showToast('File is not valid');
    }
  };

  const stopMusic = () => {
    try {
      SoundPlayer.stop('alarm', 'mp3');
    } catch (e) {
      showToast('File is not valid');
    }
  };
  const hanldeSnooze = async () => {
    const time = new Date();
    var newDateObj = moment(time).add(1, 'm').toDate();
    await LocalNotification(
      props?.notificationData?.id,
      newDateObj,
      true,
      true,
      'hour',
      props?.notificationData?.title,
    );
    hide();
  };
  const modalRef = useRef();
  useImperativeHandle(props?.reference, () => ({
    hide: hide,
    show: show,
  }));

  const hide = onHide => {
    stopMusic();
    props?.setVisible(false);
    modalRef?.current.hide();
  };
  const show = onShow => {
    modalRef?.current.show();
  };

  return (
    <PopupHOC
      style={[styles.container, props.style]}
      reference={modalRef}
      visible={props?.visible}>
      <View style={styles.contentContainer}>
        <CircularBold numberOfLines={4} style={styles.title}>
          {props?.notificationData?.title}
        </CircularBold>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.primaryButton} onPress={hanldeSnooze}>
            <CircularBold
              numberOfLines={4}
              style={[
                styles.title,
                {
                  color: '#fff',
                  fontSize: vh * 1.8,
                },
              ]}>
              {props.primaryButtonText}
            </CircularBold>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={hide}>
            <CircularBold
              numberOfLines={2}
              style={[
                styles.title,
                {
                  color: '#fff',
                  fontSize: vh * 1.8,
                },
              ]}>
              {props.secondaryButtonText}
            </CircularBold>
          </TouchableOpacity>
        </View>
      </View>
    </PopupHOC>
  );
};

export default AlarmPopUp;
