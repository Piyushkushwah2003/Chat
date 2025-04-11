import firestore from '@react-native-firebase/firestore';
import {
  FirestoreDocument,
  imageType,
  Messages,
  userData,
  UserData,
} from '../types/helpers';
import {setChats, setMessages, setUsers} from '../redux/slices/chats_slice';
import {getItem, setItem, StorageKeys} from './storage_services';
import {navigate} from './navigation_services';
import {ToastAndroid} from 'react-native';

export const post = async (
  userId: string,
  name: string,
  Profileimage: imageType[],
  posturl: string,
  token: string,
) => {
  try {
    await firestore().collection('safeposts').doc(userId).set({
      userId,
      name,
      Profileimage,
      posturl,
      token,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    console.log('userCreated successfully');
  } catch (error) {
    console.log('error---', error);
  }
};
