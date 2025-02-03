import React, {useEffect, useState} from 'react';
import FlexBox from '../flexbox';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZE} from '../../config/constants';
import {useDispatch, useSelector} from 'react-redux';
import {setMessages} from '../../redux/slices/chats_slice';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {addChat} from '../../services/firebase_fireStore';
import {RootState} from '../../redux/root reducer';
export default function () {
  const [sendicon, setSendicon] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messages1, setMessages1] = useState<
    FirebaseFirestoreTypes.DocumentData[]
  >([]);
  const {selectedchat} = useSelector((state: RootState) => state.Chats);
  const user = auth().currentUser;

  const handleSend = async () => {
    if (!user) {
      console.log('User is not logged in');
      return;
    }

    if (message.trim()) {
      addChat(message, user.uid, selectedchat.id);
      setMessage('');
      
    }
  };
  const sendmessage = (isUser: boolean, message: string, time: string) => {
    setMessage('');
  };
  const handlePress = (text: string) => {
    setMessage(text);
    if (message === '') {
      setSendicon(false);
    } else {
      setSendicon(true);
    }
  };
  return (
    <FlexBox justifyContent="center" style={styles.container}>
      <FlexBox alignItems="center">
        <FlexBox style={styles.emoji}>
          <TouchableOpacity>
            <MaterialIcons
              name="emoji-emotions"
              size={22}
              color={COLORS.NEUTRAL_500}
            />
          </TouchableOpacity>
        </FlexBox>
        <TextInput
          placeholder="Message"
          placeholderTextColor={COLORS.NEUTRAL_400}
          style={styles.inputfield}
          value={message}
          onChangeText={text => handlePress(text)}></TextInput>
        <FlexBox style={styles.attachment}>
          <TouchableOpacity>
            <Ionicons
              name="attach-outline"
              size={22}
              color={COLORS.NEUTRAL_500}
            />
          </TouchableOpacity>
        </FlexBox>
        <FlexBox style={styles.camera}>
          <TouchableOpacity>
            <MaterialIcons
              name="photo-camera"
              size={22}
              color={COLORS.NEUTRAL_500}
            />
          </TouchableOpacity>
        </FlexBox>
      </FlexBox>
      {sendicon ? (
        <TouchableOpacity style={styles.send} onPress={() => handleSend()}>
          <Ionicons name="send" size={20} color={COLORS.NEUTRAL_100} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.mic}>
          <Ionicons name="mic" size={22} color={COLORS.NEUTRAL_100} />
        </TouchableOpacity>
      )}
    </FlexBox>
  );
}
const styles = StyleSheet.create({
  inputfield: {
    height: 44,
    width: '61%',
    backgroundColor: COLORS.NEUTRAL_200,
    fontSize: SIZE.SMALL,
    color: 'black',
  },
  emoji: {
    height: 44,
    backgroundColor: COLORS.NEUTRAL_200,
    padding: 10,
    borderTopLeftRadius: 22,
    borderBottomLeftRadius: 22,
  },
  attachment: {
    backgroundColor: COLORS.NEUTRAL_200,
    paddingVertical: 10.5,
    paddingHorizontal: 6,
  },
  camera: {
    backgroundColor: COLORS.NEUTRAL_200,
    padding: 10.5,
    borderBottomRightRadius: 22,
    borderTopRightRadius: 22,
  },
  mic: {
    backgroundColor: COLORS.NEUTRAL_700,
    padding: 11,
    borderRadius: 22,
  },
  container: {
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  send: {
    backgroundColor: COLORS.NEUTRAL_700,
    padding: 12,
    borderRadius: 22,
  },
});
