import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {FONTS, SIZE} from '../../config/constants';
export default function ({
  text = 'Text',
  buttonStyle,
  textStyle,
  handlePress,
}: {
  text?: string;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  handlePress?:()=>void;
}) {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={handlePress}>
      <Text style={[styles.title, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    width: '90%',
    height: 45,
    backgroundColor: '#024CAA',
    color: 'white',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: SIZE.SMALL,
    fontFamily: FONTS.SEMIBOLD_600,
    color: 'white',
  },
});
