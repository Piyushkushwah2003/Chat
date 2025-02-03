import {combineReducers} from '@reduxjs/toolkit';
import {ChatState} from '../slices/chats_slice';
import chats_slice from '../slices/chats_slice';
export type RootState = {
  Chats: ChatState;
};

const rootReducer = combineReducers({
  Chats: chats_slice,
});

export default rootReducer;
