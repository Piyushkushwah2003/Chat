import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import Modal from 'react-native-modal';
import Title from '../title';
import {COLORS} from '../../config/constants';
import FlexBox from '../flexbox';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modalelement} from '../../types/helpers';
export default function ({
  containerStyle,
  isvisible = true,
  handlePress,
  ModalData,
  handlemodal,
}: {
  containerStyle?: ViewStyle;
  isvisible?: boolean;
  handlePress?: () => void;
  ModalData: Modalelement[];
  handlemodal: (item: Modalelement) => void;
}) {
  return (
    <>
      <Modal
        animationIn={'slideInDown'}
        animationOut={'slideOutUp'}
        coverScreen={false}
        style={[styles.container, containerStyle]}
        isVisible={isvisible}
        backdropOpacity={0}
        children={
          <FlexBox flexDirection="column" rowgap={5}>
            <TouchableOpacity style={styles.close} onPress={handlePress}>
              <AntDesign
                name="closecircle"
                size={22}
                color={COLORS.NEUTRAL_600}
              />
            </TouchableOpacity>
            {ModalData.map((item, index) => (
              <TouchableOpacity
                style={styles.option}
                key={index}
                onPress={() => handlemodal(item)}>
                <Ionicons name={item.iconname} size={22} color="black" />
                <Title text={item.title} />
              </TouchableOpacity>
            ))}
          </FlexBox>
        }></Modal>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.NEUTRAL_100,
    width: 150,
    maxHeight: 200,
    position: 'absolute',
    top: 10,
    right: 0,
    padding: 5,
    borderRadius: 5,
  },
  option: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  close: {
    alignSelf: 'flex-end',
  },
});
