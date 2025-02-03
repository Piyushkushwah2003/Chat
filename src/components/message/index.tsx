import React from 'react';
import Title from '../title';
import {StyleSheet} from 'react-native';
import {COLORS, FONTS, LINEHEIGHT, SIZE} from '../../config/constants';
import {TouchableOpacity} from 'react-native';
import FlexBox from '../flexbox';
export default function ({
  isusermessage = false,
  message,
  time,
}: {
  isusermessage?: boolean;
  message: string;
  time: string;
}) {
  return (
    <>
      {isusermessage ? (
        <TouchableOpacity style={styles.container}>
          <Title text={message} textStyle={styles.text} />
          <FlexBox style={styles.timecontainer}>
            <Title text={time} textStyle={styles.time} />
          </FlexBox>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.container2}>
          <Title text={message} textStyle={styles.text} />
          <FlexBox style={styles.timecontainer2}>
            <Title text={time} textStyle={styles.time} />
          </FlexBox>
        </TouchableOpacity>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.REGULAR,
    fontSize: SIZE.SMALLTEXT,
    lineHeight: LINEHEIGHT.MEDIUM,
    color: COLORS.NEUTRAL_800,
  },
  container: {
    padding: 10,
    backgroundColor: COLORS.NEUTRAL_200,
    maxWidth: '95%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    alignSelf: 'flex-start',
  },
  time: {
    color: COLORS.NEUTRAL_600,
    fontFamily: FONTS.REGULAR,
    fontSize: 10,
    lineHeight: 15,
    alignSelf: 'flex-end',
  },
  container2: {
    padding: 10,
    backgroundColor: COLORS.PRIMARY_100,
    width: 'auto',
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    alignSelf: 'flex-end',
  },
  timecontainer: {
    paddingLeft: 20,
  },
  timecontainer2: {
    alignSelf: 'flex-end',
    paddingLeft: 20,
  },
});
