import React, {useEffect, useState} from 'react';
import FlexBox from '../flexbox';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {COLORS, IMAGES, SIZE} from '../../config/constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Title from '../title';
import {UserData, userData} from '../../types/helpers';

export default function ({user}: {user: UserData[]}) {
  if(user===null) <Title text='Loading.......'/>
  return (
    <FlexBox
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      rowgap={5}>
      <TouchableOpacity>
        {user[0].Profileimage !== undefined && (
          <Image
            source={{uri: user[0].Profileimage.uri}}
            style={styles.image}
          />
        )}
        <TouchableOpacity style={styles.pencil}>
          <MaterialCommunityIcons
            name="pencil"
            size={16}
            color={COLORS.NATURAL_WHITE}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <FlexBox flexDirection="column" alignItems="center">
        <Title text={user[0].name} textStyle={styles.name} />
        <Title text={user[0].email} textStyle={styles.email} />
      </FlexBox>
    </FlexBox>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.NEUTRAL_100,
  },
  name: {
    fontSize: SIZE.SMALL,
    fontWeight: '600',
    color: 'black',
  },
  email: {
    fontSize: SIZE.EXTRASMALL,
    fontWeight: '400',
    color: 'black',
  },
  pencil: {
    padding: 7,
    borderRadius: 50,
    backgroundColor: COLORS.PRIMARY_800,
    position: 'absolute',
    bottom: 5,
    left: 70,
  },
});
