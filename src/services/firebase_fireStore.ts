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

export const storeUser = async (
  userId: string,
  name: string,
  Profileimage: imageType,
  email: string,
  token: string,
) => {
  try {
    await firestore().collection('usersdata').doc(userId).set({
      userId,
      name,
      email,
      Profileimage,
      token,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    console.log('userCreated successfully');
  } catch (error) {
    console.log('error---', error);
  }
};

export const getChats = async (dispatch: any, userId: string) => {
  console.log('userID-----------', userId);
  try {
    const querySnapshot = await firestore()
      .collection('usersdata') // Example filter: age greater than 18
      .get();
    const users = (await querySnapshot.docs) as any as FirestoreDocument[];
    const filteredData = users.map(item => item._data) as UserData[];
    if (filteredData !== null) {
      dispatch(setChats(filteredData));
    } else {
    }
  } catch (error) {
    console.error('Error fetching filtered data:', error);
  }
};

export const fetchFilteredData = async (dispatch: any, userId: string) => {
  console.log('userID-----------', userId);
  try {
    const querySnapshot = await firestore()
      .collection('usersdata') // Example filter: age greater than 18
      .get();
    const users = (await querySnapshot.docs) as any as FirestoreDocument[];
    const filteredData = users.map(item => item._data) as UserData[];
    const userdata = filteredData.find(
      item => item.userId === userId,
    ) as UserData;
    if (userdata !== undefined) {
      dispatch(setUsers([userdata]));
      setItem(StorageKeys.Token, userdata.token);
    } else {
    }
    console.log('no data found');
  } catch (error) {
    console.error('Error fetching filtered data:', error);
  }
};
export const getUser = async (dispatch: any, token: string) => {
  try {
    const querySnapshot = await firestore()
      .collection('usersdata') // Example filter: age greater than 18
      .get();
    const users = (await querySnapshot.docs) as any as FirestoreDocument[];
    const filteredData = users.map(item => item._data) as UserData[];
    const userdata = filteredData.find(
      item => item.token === token,
    ) as UserData;
    if (userdata !== null) {
      console.log('fetched user-----', userdata.name);
      dispatch(setUsers([userdata]));
      setItem(StorageKeys.Token, token);
      await navigate('UserBottomnavigation');
    } else {
      console.log('no data found');
    }
  } catch (error) {
    console.error('Error fetching filtered data:', error);
  }
};
export const addChat = async (
  message: string,
  senderId: string,
  recieverId: string,
) => {
  await firestore().collection('chats').add({
    text: message,
    createdAt: firestore.FieldValue.serverTimestamp(),
    senderId: senderId,
    recieverId: recieverId,
  });
};

export const getmessages = async (dispatch: any) => {
  const unsubscribe = firestore()
    .collection('chats')
    .orderBy('createdAt', 'asc')
    .onSnapshot(snapshot => {
      const messagesData = snapshot.docs.map(doc => doc.data()) as Messages[];
      if (messagesData !== null) {
        dispatch(setMessages(messagesData));
      } else {
        dispatch(setMessages([]));
      }
    });
  return () => unsubscribe();
};

export const updateData = async () => {
  const userId = 'yourUserId';
  const fieldToUpdate = 'fieldName';
  const newValue = 'new value';

  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .update({
        [fieldToUpdate]: newValue,
      });

    console.log('Document updated successfully!');
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};
