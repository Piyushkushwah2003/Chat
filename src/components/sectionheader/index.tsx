import React from 'react';
import FlexBox from '../flexbox';
import {COLORS, FONTS, IMAGES, SIZE} from '../../config/constants';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Title from '../title';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function ({headertext = 'SafeChat',handlePress}: {headertext?: string; handlePress?:()=>void}) {
  return (
    <FlexBox
      justifyContent="between"
      style={styles.container}
      alignItems="center">
      <FlexBox alignItems="center">
        <Image source={IMAGES.logo2} style={styles.logo} />
        <Title text={headertext} textStyle={styles.headertext} />
      </FlexBox>
      <TouchableOpacity onPress={handlePress}>
        <MaterialCommunityIcons name="dots-vertical" size={28} color="#000"/>
      </TouchableOpacity>
    </FlexBox>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 60,
  },
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  headertext: {
    color: '#024CAA',
    fontSize:SIZE.LARGE,
    fontWeight:'800'
  },
});
