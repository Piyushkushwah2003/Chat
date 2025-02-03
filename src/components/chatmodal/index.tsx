import React from 'react';
import Modal from 'react-native-modal';
import FlexBox from '../flexbox';
import {Image, ImageSourcePropType, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, IMAGES} from '../../config/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function ({
  handleClick,
  isvisible,
  imageSource,
}:{
  handleClick?:()=>void;
  isvisible?:boolean;
  imageSource:ImageSourcePropType;
}) {
  return (
    <>
      <Modal
        isVisible={isvisible}
        style={styles.modal}
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}
        children={
          <FlexBox flexDirection="column">
            <Image source={imageSource} style={styles.image} />
            <TouchableOpacity style={styles.close} onPress={handleClick} >
              <AntDesign name='closecircle' size={22} color={COLORS.NATURAL_WHITE}/>
            </TouchableOpacity>
            <FlexBox justifyContent="around" style={styles.container}>
              <TouchableOpacity>
                <MaterialIcons name="chat" size={24} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="information-circle" size={24} />
              </TouchableOpacity>
            </FlexBox>
          </FlexBox>
        }></Modal>
    </>
  );
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '50%',
  },
  modal: {
    width: '60%',
  },
  container: {
    paddingVertical: 10,
    backgroundColor: COLORS.NEUTRAL_100,
  },
  close:{
    position:'absolute',
    right:2,
    top:2
  }
});
