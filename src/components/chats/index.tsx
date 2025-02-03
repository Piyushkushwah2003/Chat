import React from 'react';
import FlexBox from '../flexbox';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, IMAGES, SIZE} from '../../config/constants';
import Title from '../title';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/root reducer';
import {imageType} from '../../types/helpers';
export default function ({
  imageSource,
  name = 'Luci',
  handlePress,
}: {
  imageSource: imageType;
  name?: string;
  handlePress: (imageSource: imageType) => void;
}) {
  const lastmessage = useSelector((state: RootState) => state.Chats.messages);
  const lastindex = lastmessage.length - 1;
  return (
    <FlexBox style={styles.container}>
      <FlexBox columngap={10} alignItems="center">
        <TouchableOpacity onPress={() => handlePress(imageSource)}>
          <Image source={{uri: imageSource.uri}} style={styles.image} />
        </TouchableOpacity>
        <FlexBox flexDirection="column">
          <Title text={name} textStyle={styles.nametext} />
          <Title text="hi" textStyle={styles.messagetext} />
        </FlexBox>
      </FlexBox>
      <Title text="2:12" textStyle={styles.time} />
    </FlexBox>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.NATURAL_WHITE,
    borderWidth: 1,
    borderColor: COLORS.NEUTRAL_100,
    padding: 10,
    width: '90%',
    borderRadius: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  nametext: {
    fontSize: SIZE.SMALL,
    fontWeight: '800',
    fontFamily: 'poppins',
  },
  messagetext: {
    fontSize: SIZE.SMALLTEXT,
    fontWeight: '400',
  },
  time: {
    fontSize: SIZE.SMALLTEXT,
    fontWeight: '600',
  },
});
