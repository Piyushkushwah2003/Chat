import React from 'react';
import FlexBox from '../flexbox';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {COLORS, IMAGES, SIZE} from '../../config/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Title from '../title';
import {goBack} from '../../services/navigation_services';
import {imageType} from '../../types/helpers';
export default function ({
  imageSource = IMAGES.girl,
  name = 'Arduino',
  isonline = true,
  day = 'today',
  time = '12:36',
  ampm = 'am',
}: {
  imageSource?: imageType;
  name?: string;
  isonline?: boolean;
  day?: string;
  time?: string;
  ampm?: string;
}) {
  return (
    <FlexBox
      justifyContent="between"
      style={styles.container}
      alignItems="center">
      <FlexBox columngap={10} alignItems="center">
        <TouchableOpacity onPress={() => goBack()}>
          <AntDesign name="arrowleft" size={26} color={COLORS.NATURAL_WHITE} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={{uri: imageSource.uri}} style={styles.image} />
        </TouchableOpacity>
        <FlexBox flexDirection="column">
          <Title text={name} textStyle={styles.name} />
          {isonline ? (
            <FlexBox alignItems="center">
              <Title text="Online" textStyle={styles.online} />
              <Entypo
                name="dot-single"
                size={26}
                color="#72BF78"
                style={styles.dot}
              />
            </FlexBox>
          ) : (
            <FlexBox alignItems="center" justifyContent="center">
              <Text style={styles.online}>
                Last seen {day} at {time}
                {ampm}
              </Text>
            </FlexBox>
          )}
        </FlexBox>
      </FlexBox>
      <FlexBox columngap={20}>
        <TouchableOpacity>
          <AntDesign
            name="videocamera"
            size={22}
            color={COLORS.NATURAL_WHITE}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="call" size={22} color={COLORS.NATURAL_WHITE} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={26}
            color={COLORS.NATURAL_WHITE}
          />
        </TouchableOpacity>
      </FlexBox>
    </FlexBox>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontSize: SIZE.SMALL,
    fontWeight: '500',
    color: COLORS.NATURAL_WHITE,
  },
  container: {
    padding: 10,
    backgroundColor: COLORS.PRIMARY_800,
    width: '100%',
  },
  online: {
    fontSize: SIZE.SMALLTEXT,
    fontWeight: '300',
    color: COLORS.NATURAL_WHITE,
  },
  dot: {
    marginTop: 2,
  },
});
