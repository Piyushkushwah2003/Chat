
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] =  useState<FirebaseFirestoreTypes.DocumentData[]>([]);
  const user = auth().currentUser;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const messagesData = snapshot.docs.map(doc => doc.data());
        setMessages(messagesData);
      });

    return () => unsubscribe(); 
  }, []);

  const handleSend = async () => {
    if (!user) {
        console.log('User is not logged in');
        return; 
      }
  
      if (message.trim()) {
        await firestore().collection('chats').add({
          text: message,
          createdAt: firestore.FieldValue.serverTimestamp(),
          userId: user.uid,
          userEmail: user.email, 
        });
        setMessage('');
      }
  };
  const formatTimestamp = (timestamp: FirebaseFirestoreTypes.Timestamp) => {
    const date = timestamp.toDate();  
    return date.toLocaleString();  
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{item.text}</Text>
            <Text style={styles.user}>{item.userEmail}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  messageContainer: { marginBottom: 10 },
  message: { fontSize: 16 },
  user: { fontSize: 12, color: 'gray' },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
});

