import React from 'react';
import FlexBox from '../flexbox';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../config/constants';
import Title from '../title';
import {navigate} from '../../services/navigation_services';
export default function () {
  return (
    <FlexBox justifyContent="between" style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Entypo name="chat" size={26} color="black" />
        <Title text="Chats" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('Status')}>
        <MaterialCommunityIcons name="update" size={26} color="black" />
        <Title text="Status" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="account-group" size={26} color="black" />
        <Title text="Groups" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Ionicons name="call" size={26} color="black" />
        <Title text="Calls" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Ionicons name="person" size={26} color="black" />
        <Title text="Profile" />
      </TouchableOpacity>
    </FlexBox>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: COLORS.NATURAL_WHITE,
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
