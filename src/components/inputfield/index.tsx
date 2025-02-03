import React, { useState } from 'react';
import {StyleSheet, TextInput, TouchableOpacity, ViewStyle} from 'react-native';
import {COLORS, FONTS, SIZE} from '../../config/constants';
import FlexBox from '../flexbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
export default function ({
  placeholder = 'enter username',
  inputStyle,
  passwordField,
  value,
  onChangeText,
}: {
  placeholder?: string;
  inputStyle?: ViewStyle;
  passwordField?:boolean;
  value?:string;
  onChangeText?:(text:string)=>void;
}) {
  const[eye,setEye]=useState<boolean>(false);
  const[secureText,setSecureText]=useState<boolean>(true);
  const handlepress=()=>{
    setEye(!eye);
    setSecureText(!secureText)
  }
  return (
    <>
      {
        passwordField?(
          <FlexBox>
            <TextInput
          placeholder={placeholder}
          secureTextEntry={secureText}
          style={[styles.inputfield2, inputStyle]}value={value} onChangeText={(text)=>onChangeText} ></TextInput>
          <FlexBox style={styles.eye} alignItems='center'>
             {eye?(
              <TouchableOpacity onPress={handlepress}>
              <Ionicons name='eye' size={20} color={COLORS.NEUTRAL_500}/>
              </TouchableOpacity>
             ):(
              <TouchableOpacity onPress={handlepress}>
             <Ionicons name='eye-off' size={20} color={COLORS.NEUTRAL_500}/>
             </TouchableOpacity>
             )
 
             }
          </FlexBox>
            </FlexBox>
        ):(
          <TextInput
          placeholder={placeholder}
          style={[styles.inputfield, inputStyle]} value={value} onChangeText={(text)=>onChangeText}></TextInput>
        )
      }
    </>
  );
}
const styles = StyleSheet.create({
  inputfield: {
    width: '90%',
    height: 45,
    borderColor: '#0B2F9F',
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: FONTS.SEMIBOLD_600,
    fontSize: SIZE.EXTRASMALL,
    padding: 10,
    fontWeight:'400'
  },
  inputfield2: {
    width: '75%',
    height: 45,
    borderColor: '#0B2F9F',
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderLeftWidth:1,
    borderWidth:1,
    borderTopRightRadius: 8,
    
    fontFamily: FONTS.SEMIBOLD_600,
    fontSize: SIZE.EXTRASMALL,
    padding: 10,
    fontWeight:'400'
  },
  eye:{
    padding:11,
    borderTopRightRadius:8,
    borderBottomRightRadius:8,
    borderColor:COLORS.PRIMARY_800,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderRightWidth:1
  }
});
