import React, {useEffect, useRef} from 'react';
import FlexBox from '../../components/flexbox';
import ChatSectionbar from '../../components/chatSectionbar';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/root reducer';
import {ScrollView, StyleSheet} from 'react-native';
import Keyboard from '../../components/keyboard';
import Message from '../../components/message';
import auth from '@react-native-firebase/auth';
import {getmessages} from '../../services/firebase_fireStore';
export default function () {
  const dispatch = useDispatch();
  const {selectedchat, messages} = useSelector(
    (state: RootState) => state.Chats,
  );
  const scrollViewRef = useRef<ScrollView>(null);
  const user = auth().currentUser;
  useEffect(() => {
    getmessages(dispatch);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, []);

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return `${date.getHours()}:${
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    }`;
  };
  return (
    <>
      <FlexBox flexDirection="column">
        <ChatSectionbar
          name={selectedchat.name}
          imageSource={selectedchat.imageSource}
        />
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
          <FlexBox flexDirection="column" rowgap={4} style={styles.messages}>
            {messages.map(
              (item, index) =>
                ((item.recieverId == user?.uid &&
                  item.senderId == selectedchat.id) ||
                  (item.senderId == user?.uid &&
                    item.recieverId == selectedchat.id)) && (
                  <Message
                    key={index}
                    message={item.text}
                    isusermessage={!(user?.uid == item.senderId)}
                    time={formatTimestamp(item.createdAt)}
                  />
                ),
            )}
          </FlexBox>
        </ScrollView>
      </FlexBox>
      <Keyboard />
    </>
  );
}
const styles = StyleSheet.create({
  messages: {
    padding: 10,
    marginBottom: 130,
  },
});
