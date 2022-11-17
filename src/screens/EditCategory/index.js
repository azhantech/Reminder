import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';

import styles from './styles';
import {MainInputBar} from '../../components/MainInputBar';
import {COLOR_SELECTOR} from '../../constants/data';
import {COLORS, icons} from '../../constants';
import {useDispatch} from 'react-redux';
import {editCategory} from '../../redux/reducers/taskReducer';
import {useNavigation} from '@react-navigation/native';

const EditCategory = ({route}) => {
  const {data} = route.params;
  const desRef = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [title, setTitle] = useState(data.name);
  const [description, setDescription] = useState(data.desc);
  const [selectColor, setSelectColor] = useState(data.color);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    let counter = 0;
    setIsLoading(true);

    data?.task?.map((item, index) => {
      if (item.completed) {
        counter = counter + 1;
      }
    });

    const category = {
      index: data.index,
      name: title,
      progress: data.progress,
      desc: description,
      color: selectColor,
      task: data.task,
    };

    console.log('cate', category);
    if (category.name == '') {
      Toast.show({
        type: 'error',
        visibilityTime: 1500,
        text1: 'Kindly enter Title',
      });
    } else if (category.desc == '') {
      Toast.show({
        type: 'error',
        visibilityTime: 1500,
        text1: 'Kindly enter Description',
      });
    } else if (category.color == undefined) {
      Toast.show({
        type: 'error',
        visibilityTime: 1500,
        text1: 'Kindly pick Color',
      });
    } else {
      console.log('category', category);
      dispatch(editCategory(category));

      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate('Home');
      }, 500);
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
        <Text style={styles.mainText}>Edit Category</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.lowerCont}>
        <View>
          <Text style={styles.labelStyle}>Title</Text>
          <MainInputBar
            placeholder="Enter Title"
            value={title}
            onChangeText={value => setTitle(value)}
            onSubmitEditing={() => {
              desRef.current.focus();
            }}
            returnKeyType="next"
            enablesReturnKeyAutomatically
          />
        </View>

        <View>
          <Text style={styles.labelStyle}>Description</Text>
          <MainInputBar
            ref={desRef}
            placeholder="Enter Description"
            value={description}
            onChangeText={value => setDescription(value)}
            returnKeyType="default"
            enablesReturnKeyAutomatically
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

        {isLoading ? (
          <View style={styles.btnTwo}>
            <ActivityIndicator color={COLORS.mainBg} size={'large'} />
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSubmit}
            style={styles.btnTwo}>
            <Text style={styles.subTitleTwo}>SUBMIT</Text>
          </TouchableOpacity>
        )}

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
