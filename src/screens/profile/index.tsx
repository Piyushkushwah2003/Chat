import React, {useEffect, useState} from 'react';
import FlexBox from '../../components/flexbox';
import Title from '../../components/title';
import Header from '../../components/header';
import ProfileView from '../../components/profileView';
import {StyleSheet} from 'react-native';
import {COLORS, SIZE} from '../../config/constants';
import Entypo from 'react-native-vector-icons/Entypo';
import SwitchToggle from 'react-native-switch-toggle';
import ProfileSections from '../../components/profileSections';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import sectionheader from '../../components/sectionheader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/root reducer';
import {fetchFilteredData} from '../../services/firebase_fireStore';
export default function () {
  const [toggle, setToggle] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {users, Profiledata} = useSelector((state: RootState) => state.Chats);
  useEffect(() => {
    if(Profiledata !==null)
   { fetchFilteredData(dispatch, Profiledata.userId)}
    console.log('profiledata---------',Profiledata);
  }, [Profiledata]);
  return (
    <>
      <FlexBox flexDirection="column" rowgap={20}>
        <Header />
        <ProfileView user={users} />
        <FlexBox style={styles.headerContainer}>
          <Title text="General Settings" textStyle={styles.headerText} />
        </FlexBox>
        <FlexBox flexDirection="column" rowgap={10}>
          <FlexBox
            style={styles.container}
            alignItems="center"
            justifyContent="between">
            <FlexBox alignItems="center" columngap={20}>
              <Entypo name="adjust" size={28} color="black" />
              <FlexBox flexDirection="column">
                <Title text="Mode" textStyle={styles.optionText} />
                <Title text="Dark & Light" textStyle={styles.darklight} />
              </FlexBox>
            </FlexBox>
            <SwitchToggle
              switchOn={toggle}
              onPress={() => setToggle(!toggle)}
              containerStyle={styles.togglecontainer}
              circleStyle={styles.circlestyle}
              circleColorOff="#004BA8"
              circleColorOn="white"
              backgroundColorOn="#004BA8"
              backgroundColorOff="#DEE4EB"
            />
          </FlexBox>
          <ProfileSections
            children={
              <MaterialCommunityIcons name="key" size={26} color="black" />
            }
            sectionheader="Change Passowrd"
          />
          <ProfileSections
            children={<Ionicons name="language" size={26} color="black" />}
            sectionheader="Language"
          />
        </FlexBox>
        <FlexBox style={styles.headerContainer}>
          <Title text="Information" textStyle={styles.headerText} />
        </FlexBox>
        <FlexBox flexDirection="column" rowgap={10}>
          <ProfileSections
            children={<AntDesign name="mobile1" size={26} color="black" />}
            sectionheader="About App"
          />
          <ProfileSections
            children={
              <Ionicons name="document-text-sharp" size={26} color="black" />
            }
            sectionheader="Terms & Conditions"
          />
          <ProfileSections
            children={
              <Ionicons name="shield-checkmark-sharp" size={26} color="black" />
            }
            sectionheader="Privacy & Policy"
          />
          <ProfileSections
            children={<Entypo name="share" size={26} color="black" />}
            sectionheader="Share This App"
          />
        </FlexBox>
      </FlexBox>
    </>
  );
}
const styles = StyleSheet.create({
  headerText: {
    color: COLORS.NEUTRAL_500,
    fontSize: SIZE.SMALL,
    fontWeight: '400',
  },
  headerContainer: {
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: COLORS.NEUTRAL_200,
  },
  optionText: {
    fontSize: SIZE.SMALL,
    color: 'black',
    fontWeight: '400',
  },
  darklight: {
    fontSize: SIZE.EXTRASMALL,
    color: COLORS.NEUTRAL_400,
    fontWeight: '400',
  },
  container: {
    paddingHorizontal: 30,
  },
  togglecontainer: {
    width: 40,
    height: 21,
    borderRadius: 11,
    padding: 2,
    marginLeft: 10,
  },
  circlestyle: {
    width: 13,
    borderRadius: 6.5,
    height: 13,
  },
});
