import React from 'react';
import FlexBox from '../flexbox';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, SIZE} from '../../config/constants';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Title from '../title';
import { goBack } from '../../services/navigation_services';
export default function ({headertext = 'Friends'}: {headertext?: string}) {
  return (
    <>
      <FlexBox alignItems="center" columngap={20}>
        <TouchableOpacity onPress={()=>goBack()}>
          <AntDesign name="arrowleft" size={26} color="black" />
        </TouchableOpacity>
        <Title text={headertext} textStyle={styles.text} />
      </FlexBox>
    </>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: SIZE.MEDIUM,
    color: 'black',
    fontWeight: '500',
  },
});
