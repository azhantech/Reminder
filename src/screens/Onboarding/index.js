import {View, Text, Image, Button} from 'react-native';
import React from 'react';
import styles from './styles';
import icons from '../../constants/icons';

const Onboarding = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.upperContainer}>
        <Image source={icons.onBoarding} />
      </View>
      <View style={styles.middleContainer}>
        <Text>Task Management</Text>
        <Text>Made Simple</Text>
        <Text style={styles.textThree}>
          The smart tool is designed to help you better manage your task
        </Text>
      </View>
      <View style={styles.lowerContainer}>
        <Button
          title="Get Started"
          // buttonStyle={styles.btnTwo}
          // containerStyle={styles.subContainerTwo}
          // titleStyle={styles.subTitleTwo}
          // onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default Onboarding;
