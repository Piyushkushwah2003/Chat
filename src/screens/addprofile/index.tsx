import React, {useState} from 'react';
import Box from '../../components/box';
import UploadProfile from '../../components/uploadProfile';
import FlexBox from '../../components/flexbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZE} from '../../config/constants';
import {ImageSourcePropType, StyleSheet, TextInput} from 'react-native';
import Button from '../../components/button';
import {navigate} from '../../services/navigation_services';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/root reducer';
import {setProfiledata} from '../../redux/slices/chats_slice';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {storeUser} from '../../services/firebase_fireStore';
import {imageType} from '../../types/helpers';
import { getToken } from '@react-native-firebase/messaging';
import { getItem, StorageKeys } from '../../services/storage_services';
export default function () {
  const data = useSelector((state: RootState) => state.Chats.Profileimage);
  const [name, setName] = useState<string>('');
  const {Profiledata, Profileimage} = useSelector(
    (state: RootState) => state.Chats,
  );

  const handlePress = async (name: string, image: imageType) => {
    storeUser(Profiledata.userId, name, image, Profiledata.email,Profiledata.token);
    navigate('UserBottomnavigation');
  };

  return (
    <>
      <Box>
        <FlexBox
          alignItems="center"
          flexDirection="column"
          rowgap={40}
          style={styles.topcontainer}>
          <UploadProfile />
          <FlexBox alignItems="center" columngap={15} style={styles.container}>
            <Ionicons
              name="person-outline"
              size={20}
              color={COLORS.PRIMARY_600}
            />
            <TextInput
              placeholder="Name"
              style={styles.textinput}
              value={name}
              onChangeText={text => setName(text)}
              placeholderTextColor={COLORS.NEUTRAL_500}></TextInput>
          </FlexBox>
        </FlexBox>
      </Box>
      <Button
        text="Submit"
        buttonStyle={styles.button}
        handlePress={() => handlePress(name, Profileimage)}
      />
    </>
  );
}
const styles = StyleSheet.create({
  textinput: {
    height: 40,
    width: '60%',
    fontSize: SIZE.SMALL,
    fontWeight: '400',
    color: 'black',
  },
  container: {
    borderBottomWidth: 1,
    borderColor: COLORS.PRIMARY_700,
  },
  topcontainer: {
    marginTop: 50,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
});
