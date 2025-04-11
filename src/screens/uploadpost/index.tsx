import React from 'react';
import Screen from '../../components/screen';
import Screenheader from '../../components/screenheader';
import FlexBox from '../../components/flexbox';
import Box from '../../components/box';
import {StyleSheet, TextInput} from 'react-native';
import {COLORS} from '../../config/constants';
export default function () {
  return (
    <>
      <Screen>
        <FlexBox style={{position: 'absolute', left: 10, padding: 10}}>
          <Screenheader headertext="Post an Update" />
        </FlexBox>
        <Box>
          <FlexBox flexDirection="column" style={{marginTop: 60}}>
            <TextInput
              placeholder="Write something about your post"
              placeholderTextColor={COLORS.NEUTRAL_400}
              numberOfLines={6}
              multiline={true}
              style={styles.input}></TextInput>
          </FlexBox>
        </Box>
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.NEUTRAL_300,
    padding: 10,
    textAlignVertical: 'top', 
    backgroundColor:COLORS.NATURAL_WHITE
  },
});
