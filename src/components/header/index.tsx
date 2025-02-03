import React from 'react';
import FlexBox from '../flexbox';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, SIZE} from '../../config/constants';
import Title from '../title';
import {StyleSheet, TouchableOpacity} from 'react-native';
import { goBack } from '../../services/navigation_services';
export default function () {
  return (
    <FlexBox style={styles.container} alignItems="center">
      <FlexBox
        alignItems="center"
        style={styles.innerContainer}
        justifyContent="between">
       <TouchableOpacity onPress={()=>goBack()}>
       <MaterialIcons
          name="keyboard-arrow-left"
          size={26}
          color={COLORS.NATURAL_WHITE}
        />
       </TouchableOpacity>
        <TouchableOpacity>
          <Title text="Profile" textStyle={styles.text} />
        </TouchableOpacity>
      </FlexBox>
    </FlexBox>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: SIZE.MEDIUM,
    color: COLORS.NATURAL_WHITE,
    fontWeight: '400',
    textAlign: 'center',
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: COLORS.PRIMARY_800,
    width: '100%',
  },
  innerContainer: {
    width: '55%',
  },
});
