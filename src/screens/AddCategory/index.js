import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';

import styles from './styles';
import BackButon from '../../components/BackButon';
import MainInputBar from '../../components/MainInputBar';
import {COLOR_SELECTOR} from '../../constants/data';
import {icons} from '../../constants';

const AddCategory = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [selectColor, setSelectColor] = useState();

  const handleSubmit = () => {
    const category = {
      name: title,
      progress: '0',
      desc: description,
      color: selectColor,
      task: [],
    };

    if (
      category.name == undefined ||
      category.desc == undefined ||
      category.color == undefined
    ) {
      Toast.show({
        type: 'error',
        visibilityTime: 2000,
        text1: 'Kindly fill all the fields 👋',
      });
    }
    console.log('category', category);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setSelectColor(item.item)}
        style={[
          styles.colorSel,
          item?.item == selectColor && {
            borderWidth: 1,
            borderColor: selectColor,
            backgroundColor: selectColor,
          },
          {backgroundColor: item?.item, borderColor: item?.item},
        ]}>
        {selectColor == item?.item ? (
          <Image source={icons.checked} style={styles.imgSty} />
        ) : (
          <Text></Text>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <KeyboardAwareScrollView bounces={false} style={styles.mainCont}>
      <View style={styles.upperCont}>
        <BackButon />

        <Text style={styles.mainText}>Add Category</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.lowerCont}>
        <View>
          <Text style={styles.labelStyle}>Title</Text>
          <MainInputBar
            placeholder="Enter Title"
            value={title}
            onChangeText={value => setTitle(value)}
          />
        </View>

        <View>
          <Text style={styles.labelStyle}>Description</Text>
          <MainInputBar
            placeholder="Enter Description"
            value={description}
            onChangeText={value => setDescription(value)}
          />
        </View>
        <View>
          <Text style={styles.labelStyle}></Text>
          <FlatList
            bounces={false}
            data={COLOR_SELECTOR}
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.btnTwo}>
          <Text style={styles.subTitleTwo}>SUBMIT</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default AddCategory;

// index: 1,
//     name: 'Dashboard Design',
//     progress: '59',
//     desc: 'A task to do work',

//     color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
//       Math.random() * 256,
//     )}, ${Math.floor(Math.random() * 256)})`,
//     tasks: [