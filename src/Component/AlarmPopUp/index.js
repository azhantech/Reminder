import { View, Image } from 'react-native';
import React, { useImperativeHandle, useRef, useEffect, useState } from 'react';
import PopupHOC from '../PopupHOC';
import styles from './styles';
// import IconButton from '../../Buttons/IconButton';
import { icons } from '../../../Assets';
// import MainButton from '../../Buttons/MainButton';
import SoundPlayer from 'react-native-sound-player';
// import {
//   postSnoozeReminder,
// } from '../../../redux/actions/generalActions';
import { useDispatch } from 'react-redux';
import CircularBold from '../Texts/CircularBold';

const AlarmPopUp = props => {
  const dispatch = useDispatch();
  const [reminderDetails, setReminderDetails] = useState(null);
  // useEffect(() => {
  //   handleReminderDetails();
  // }, [props?.notificationData?.id]);

  // const handleReminderDetails = async () => {
  //   try {
  //     const response = await dispatch(
  //       getOtherReminderDetails(
  //         props?.notificationData?.id,
  //         'Jogging Reminder',
  //       ),
  //     );
  //     if (response) {
  //       setReminderDetails(response?.response?.message);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const handleJoggingNotification = async mode => {
  //   const data = {
  //     id: props?.notificationData?.id,
  //     type: props?.notificationData?.type,
  //     going: mode == 'going' ? 1 : 0,
  //     snooze: mode == 'snooze' ? 1 : 0,
  //   };

  //   try {
  //     const response = await dispatch(postJoggingNotification(data));
  //     if (response) {
  //       hide();
  //     }
  //   } catch (e) {
  //     showToast(e);
  //   }
  // };

  // const handleSnooze = async status => {
  //   const data = {
  //     reminder_id: props?.notificationData?.id,
  //     status: status,
  //     type: props?.notificationData?.type,
  //     time_id: null,
  //   };

  //   try {
  //     const response = await dispatch(postSnoozeReminder(data));
  //     if (response) {
  //       hide();
  //     }
  //   } catch (e) {
  //     // showToast(e);
  //   }
  // };
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

  const modalRef = useRef();
  useImperativeHandle(props?.reference, () => ({
    hide: hide,
    show: show,
  }));

  const hide = onHide => {
    stopMusic();
    modalRef?.current.hide();
  };
  const show = onShow => {
    modalRef?.current.show();
    if (props?.notificationData?.alarm) {
      startMusic();
    }
  };

  return (
    <PopupHOC style={[styles.container, props.style]} reference={modalRef}>
      {/* <IconButton
        // onPress={() => handleJoggingNotification('snooze')}
        icon={icons.close}
        style={styles.IconButton}
        iconStyle={styles.iconStyle}
      /> */}
      <View style={styles.contentContainer}>
        <Image source={props.icon} style={[styles.icon, props.iconStyle]} />
        <CircularBold numberOfLines={4} style={styles.title}>
          {props.title}
        </CircularBold>
        {props.subText ? (
          <CircularBold numberOfLines={6} style={styles.subText}>
            {props.subText}
          </CircularBold>
        ) : null}

        <View style={styles.buttonRow}>
          {/* <MainButton
            text={props.primaryButtonText}
            style={styles.primaryButton}
            onPress={() => handleSnooze('snooze')}
          /> */}

          {/* <MainButton
            onPress={() => handleJoggingNotification('going')}
            text={props.secondaryButtonText}
            style={styles.secondaryButton}
          /> */}
        </View>
      </View>
    </PopupHOC>
  );
};

export default AlarmPopUp;
