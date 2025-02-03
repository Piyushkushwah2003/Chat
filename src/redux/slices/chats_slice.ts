import {createSlice} from '@reduxjs/toolkit';
import {
  Chats,
  SelectedChat,
  Profiledata,
  userCredentail,
  userData,
  UserData,
  imageType,
  Messages,
} from '../../types/helpers';
import {IMAGES} from '../../config/constants';
import {ImageSourcePropType} from 'react-native';

export type ChatState = {
  chats: UserData[];
  selectedchat: SelectedChat;
  messages: Messages[];
  Profileimage: imageType;
  Profiledata: Profiledata;
  activeEmail: userData;
  users: UserData[];
};
const initialState: ChatState = {
  chats: [
    {
      Profileimage: {
        name: '1000033143.jpg',
        type: 'image/jpeg',
        uri: 'file:///data/user/0/com.safechat/cache/rn_image_picker_lib_temp_f4ebc8e8-02f7-43e3-b989-5c794f81bdb1.jpg',
      },
      createdAt: '',
      email: '',
      name: 'Udydud',
      userId: 'vAwEhFvFQkb9ozPQey2ZDT2Wah02',
      token: '',
    },
  ],
  selectedchat: {
    id: '',
    name: '',
    imageSource: {
      uri: '',
      type: '',
      name: '',
    },
  },
  messages: [],
  Profileimage: IMAGES.emptyprofile,
  Profiledata: {email: 'User', userId: '', token: ''},
  activeEmail: {
    email: '',
    userId: '',
    name: '',
    createdAt: '',
    Profileimage: '',
  },
  users: [
    {
      Profileimage: {
        name: '1000033143.jpg',
        type: 'image/jpeg',
        uri: 'file:///data/user/0/com.safechat/cache/rn_image_picker_lib_temp_f4ebc8e8-02f7-43e3-b989-5c794f81bdb1.jpg',
      },
      createdAt: '',
      email: '',
      name: 'Udydud',
      userId: 'vAwEhFvFQkb9ozPQey2ZDT2Wah02',
      token: '',
    },
  ],
};
const ChatSlice = createSlice({
  name: 'Chats',
  initialState,
  reducers: {
    setChats: (
      state,
      action: {
        type: string;
        payload: UserData[];
      },
    ) => {
      state.chats = action.payload;
    },
    setSelectedchat: (
      state,
      action: {
        type: string;
        payload: SelectedChat;
      },
    ) => {
      state.selectedchat = action.payload;
    },
    setMessages: (
      state,
      action: {
        type: string;
        payload: Messages[];
      },
    ) => {
      state.messages = action.payload;
    },
    setProfileimage: (
      state,
      action: {
        type: string;
        payload: imageType;
      },
    ) => {
      state.Profileimage = action.payload;
    },
    setProfiledata: (
      state,
      action: {
        type: string;
        payload: Profiledata;
      },
    ) => {
      state.Profiledata = action.payload;
    },
    setActiveEmail: (
      state,
      action: {
        type: string;
        payload: userData;
      },
    ) => {
      state.activeEmail = action.payload;
    },
    setUsers: (
      state,
      action: {
        type: string;
        payload: UserData[];
      },
    ) => {
      state.users = action.payload;
    },
  },
});
export const {
  setChats,
  setSelectedchat,
  setMessages,
  setProfileimage,
  setProfiledata,
  setActiveEmail,
  setUsers,
} = ChatSlice.actions;
export default ChatSlice.reducer;
