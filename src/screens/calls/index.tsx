import React, {useEffect} from 'react';
import FlexBox from '../../components/flexbox';
import Title from '../../components/title';
import Box from '../../components/box';
import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Sectionheader from '../../components/sectionheader';
import Screenheader from '../../components/screenheader';
import {getChats, storeFriends} from '../../services/firebase_fireStore';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/root reducer';
import {COLORS, SIZE} from '../../config/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {navigate} from '../../services/navigation_services';
import {StorageKeys} from '../../services/storage_services';
import auth from '@react-native-firebase/auth';
export default function () {
  const dispatch = useDispatch();
  const {chats, Profiledata} = useSelector((state: RootState) => state.Chats);
  const user = auth().currentUser;
  useEffect(() => {
    if (Profiledata !== null) {
      console.log(Profiledata);
      getChats(dispatch, Profiledata.userId);
    }
  }, []);
  return (
    <>
      <Box>
        <ScrollView>
          <Screenheader />
          <FlexBox flexDirection="column" rowgap={10}>
            {chats.map(
              (item, index) =>
                item.userId !== user?.uid && (
                  <FlexBox
                    key={index}
                    alignItems="center"
                    justifyContent="between"
                    style={styles.container}>
                    <FlexBox alignItems="center" columngap={20}>
                      <Image
                        source={{uri: item.Profileimage.uri}}
                        style={styles.image}
                      />
                      <Title text={item.name} textStyle={styles.name} />
                    </FlexBox>
                    <TouchableOpacity
                      style={styles.add}
                      onPress={() =>
                        user?.uid && storeFriends(user.uid, item.userId)
                      }>
                      <Title text="Add friend" textStyle={styles.addtext} />
                      <AntDesign
                        name="plus"
                        size={16}
                        color={COLORS.PRIMARY_700}
                      />
                    </TouchableOpacity>
                  </FlexBox>
                ),
            )}
          </FlexBox>
        </ScrollView>
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  add: {
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY_800,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  addtext: {
    fontSize: SIZE.EXTRASMALL,
    color: COLORS.PRIMARY_800,
    fontWeight: '600',
  },
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  name: {
    fontSize: SIZE.EXTRASMALL,
    fontWeight: '500',
  },
});
