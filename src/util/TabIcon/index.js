import {View, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import {COLORS} from '../../constants';

const TabIcon = ({focused, icon, iconStyle}) => {
  return (
    <View style={styles.containerStyle}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 25,
          height: 25,
          tintColor: focused ? COLORS.mainFg : COLORS.transparentBlack1,
          ...iconStyle,
        }}
      />
    </View>
  );
};

export default TabIcon;
