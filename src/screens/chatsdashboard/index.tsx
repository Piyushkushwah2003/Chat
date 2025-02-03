import React, {useEffect, useState} from 'react';
import FlexBox from '../../components/flexbox';
import {
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Sectionheader from '../../components/sectionheader';
import Searchbar from '../../components/searchbar';
import Chats from '../../components/chats';
import Userbottomnavigation from '../../navigations/userbottomnavigation';
import {navigate} from '../../services/navigation_services';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/root reducer';
import {setSelectedchat} from '../../redux/slices/chats_slice';
import BottomModal from '../../components/bottomModal';
import {imageType, Modalelement} from '../../types/helpers';
import Chatmodal from '../../components/chatmodal';
import {IMAGES} from '../../config/constants';
import {getChats} from '../../services/firebase_fireStore';
import { clearItem, StorageKeys } from '../../services/storage_services';
import Title from '../../components/title';
export default function () {
  const dispatch = useDispatch();
  const {chats, Profiledata} = useSelector((state: RootState) => state.Chats);
  const selectedChat = useSelector(
    (state: RootState) => state.Chats.selectedchat,
  );
  useEffect(() => {
    if(Profiledata !==null){
    getChats(dispatch, Profiledata.userId)}
  }, []);
  const handleClick = (id: string, imageSource: imageType, name: string) => {
    dispatch(
      setSelectedchat({
        id: id,
        imageSource: imageSource,
        name: name,
      }),
    );
    navigate('Chatview');
  };
  const [modal, setModal] = useState<boolean>(false);
  const [chatmodal, setChatmodal] = useState<boolean>(false);
  const [chatimageSource, setChatimageSource] = useState<ImageSourcePropType>(
    IMAGES.girl3,
  );
  const data = [
    {id: 1, title: 'Settings', iconname: 'settings-outline'},
    {id: 2, title: 'Logout', iconname: 'log-out-outline'},
  ];
  const handlemodal = (item: Modalelement) => {
    if (item.id === 1) {
      navigate('Profile');
    } else if (item.id === 2) {
      clearItem(StorageKeys.Token);
      navigate('Login');
    }
  };
  const handlechatmodal = (imageSource: ImageSourcePropType) => {
    setChatmodal(true);
    setChatimageSource(imageSource);
  };
  console.log('item-----------', chats);
  return (
    <>
      <Sectionheader handlePress={() => setModal(true)} />
      <BottomModal
        ModalData={data}
        isvisible={modal}
        handlePress={() => setModal(false)}
        handlemodal={item => handlemodal(item)}
      />
      <ScrollView>
        <FlexBox flexDirection="column" rowgap={10}>
          <Searchbar />
          {chats !==null?(   <FlexBox alignItems="center" flexDirection="column" rowgap={4}>
            {chats.map((item, id) => (
              <TouchableOpacity
                onPress={() =>
                  handleClick(item.userId, item.Profileimage, item.name)
                }>
                <Chats
                  key={id}
                  imageSource={item.Profileimage}
                  name={item.name}
                  handlePress={() => handlechatmodal(item.Profileimage)}
                />
              </TouchableOpacity>
            ))}

            <Chatmodal
              imageSource={chatimageSource}
              isvisible={chatmodal}
              handleClick={() => setChatmodal(false)}
            />
          </FlexBox>):(
            <Title text='No chats available !!' textStyle={{fontSize:18,fontWeight:'600',textAlign:'center',marginTop:200}}/>
          )}
       
        </FlexBox>
      </ScrollView>
      <FlexBox style={styles.bottomnavigation}></FlexBox>
    </>
  );
}
const styles = StyleSheet.create({
  bottomnavigation: {
    position: 'absolute',
    bottom: 0,
  },
});
