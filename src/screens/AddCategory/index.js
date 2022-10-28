import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import DatePicker from 'react-native-date-picker';

import {addCategory} from '../../redux/reducers/taskReducer';
import BackButon from '../../components/BackButon';
import MainInputBar from '../../components/MainInputBar';
import {COLOR_SELECTOR} from '../../constants/data';
import {icons} from '../../constants';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const AddCategory = () => {
  const reduxData = useSelector(state => state.task.totalData);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [title, setTitle] = useState();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateAdv, setDateAdv] = useState();
  const [description, setDescription] = useState();
  const [selectColor, setSelectColor] = useState();

  const handleSubmit = () => {
    const category = {
      index: reduxData.length ? reduxData.length + 1 : 1,
      name: title,
      date: dateAdv,
      progress: 'Ongoing',
      desc: description,
      color: selectColor,
      task: [],
    };

    if (
      category.name == undefined ||
      category.desc == undefined ||
      category.color == undefined ||
      category.date == undefined
    ) {
      Toast.show({
        type: 'error',
        visibilityTime: 2000,
        text1: 'Kindly fill all the fields 👋',
      });
    } else {
      console.log('category', category);
      dispatch(addCategory(category));

      setTitle('');
      setDescription('');
      setDateAdv('');

      setSelectColor('');

      navigation.navigate('Home');
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
          <Text style={styles.labelStyle}>Date</Text>

          <View style={styles.touchableCont}>
            {dateAdv ? (
              <TextInput style={styles.otherTextInputStyle} value={dateAdv} />
            ) : (
              <TextInput
                style={styles.otherTwoTextInputStyle}
                value={dateAdv}
              />
            )}

            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={styles.opacStyle}>
              <Image source={icons.calendar} style={styles.imgStyle} />
            </TouchableOpacity>
            <DatePicker
              modal
              open={open}
              date={date}
              mode="date"
              theme="light"
              onConfirm={date => {
                setOpen(false);
                setDate(date);
                setDateAdv(moment(date).format('LL'));
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
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
