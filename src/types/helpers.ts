import {ImageSourcePropType} from 'react-native';
import {screenName} from './screen_names';
import React from 'react';
import {IconProps} from 'react-native-vector-icons/Icon';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export type imageType = {
  uri: string;
  type: string;
  name: string;
};

export type UserBottomNavigationType = {
  name: string;
  icon: React.ReactNode;
  iconfill: React.ReactNode;
};
export type Element = {
  id: number;
  name: string;
  imageSource: ImageSourcePropType;
};
export type Chats = {
  userId: number;
  name: string;
  imageSource: ImageSourcePropType;
};
export type SelectedChat = {
  id: string;
  name: string;
  imageSource: imageType;
};
export type Modalelement = {
  id: number;
  title: string;
  iconname: string;
};
export type ImageFormatType = {
  uri: string;
  type: string;
  name: string;
};
export type Messages = {
  senderId: string;
  text: string;
  createdAt: any;
  recieverId: string;
};

export type Profiledata = {
  email: string;
  userId: string;
  token:string
};
export type userCredentail = {
  email: string;
  name: string;
  profilePhoto: string;
};

export type userData = {
  Profileimage: string;
  userId: string;
  createdAt:any;
  email: string;
  name: string;
};

export type UserData = {
  Profileimage: imageType;
  createdAt: any;
  email: string;
  name: string;
  userId: string;
  token:''
};
export type FirestoreDocument = {
  _data: UserData;
  _exists: boolean;
  _metadata: any;
  _ref: any;
};
