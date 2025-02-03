import React from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS, FONTS, SIZE } from "../../config/constants";
import FlexBox from "../flexbox";
export default function(){
    return(
       <FlexBox justifyContent="center" style={styles.container}>
        <TouchableOpacity style={styles.search}>
        <Ionicons name="search" size={20} color={COLORS.PRIMARY_800}/>
        </TouchableOpacity>
         <TextInput style={styles.inputfield} placeholder="Search..." placeholderTextColor='#7695FF'>
        </TextInput>
       </FlexBox>
    )
}
const styles=StyleSheet.create({
    inputfield: {
        width: '75%',
        height: 40,
        borderTopColor: '#0B2F9F',
        borderBottomColor:'#0B2F9F',
        borderRightColor:'#0B2F9F',
        borderRightWidth: 1,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderBottomRightRadius:50,
        borderBottomLeftRadius:50,
        fontFamily: FONTS.SEMIBOLD_600,
        fontSize: SIZE.SMALL,
        padding: 10,
        flexDirection:'row',
        gap:10,
        backgroundColor:COLORS.NATURAL_WHITE,
        color:'black'
      },
      search:{
        justifyContent:'center',
        height:40,
        borderTopColor:'#0B2F9F',
        borderBottomColor:'#0B2F9F',
        borderLeftColor:'#0B2F9F',
        borderLeftWidth:1,
        borderBottomWidth:1,
        borderTopWidth:1,
        borderTopLeftRadius:50,
        borderBottomLeftRadius:50,
        paddingLeft:10,
        backgroundColor:COLORS.NATURAL_WHITE,
      },
      container:{
        marginTop:15
      }
})