import React from 'react';
import FlexBox from '../flexbox';
import Title from '../title';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, SIZE} from '../../config/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default function ({
  children,
  sectionheader = 'default',
}: {
  children?: React.ReactNode;
  sectionheader?: string;
}) {
  return (
    <TouchableOpacity
      style={styles.container}>
      <FlexBox alignItems="center" columngap={20}>
        {children}
        <Title text={sectionheader} textStyle={styles.sectionheader} />
      </FlexBox>
        <MaterialIcons name="keyboard-arrow-right" size={26} color="black" />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  sectionheader: {
    fontSize: SIZE.SMALL,
    color: 'black',
    fontWeight: '400',
  },
  container: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
});
