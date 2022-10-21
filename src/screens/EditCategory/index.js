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
import {useDispatch} from 'react-redux';
import {editCategory} from '../../redux/reducers/taskReducer';

const EditCategory = ({route, navigation}) => {
  const {data} = route.params;

  console.log('EDIT DATA', data);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(data.name);
  const [description, setDescription] = useState(data.desc);
  const [selectColor, setSelectColor] = useState(data.color);

  const handleSubmit = () => {
    const category = {
      index: data.index,
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
    } else {
      console.log('category', category);
      dispatch(editCategory(category));
    }
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

        <Text style={styles.mainText}>Edit Category</Text>
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
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.btnThree}>
          <Text style={styles.subTitleTwo}>CANCEL</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default EditCategory;
