import React, {useState} from 'react';
import FlexBox from '../flexbox';
import {
  Image,
  ImageSourcePropType,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {COLORS, IMAGES} from '../../config/constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {setProfileimage} from '../../redux/slices/chats_slice';
export default function () {
  const [image, setImage] = useState<ImageSourcePropType>(IMAGES.emptyprofile);
  const [modal, setModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const UploadFile = async () => {
    try {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]).then(result => {
          launchImagelibrary();
        });
      } else {
        launchImagelibrary();
      }
    } catch (err) {
      console.warn('error--------', err);
    }
  };
  const launchImagelibrary = () => {
    let options: ImageLibraryOptions = {
      mediaType: 'photo',
      maxWidth: 200,
      maxHeight: 200,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response?.didCancel) {
        console.log('cancelled');
      } else {
        if (response.assets === undefined || response.assets?.length === 0) {
          return;
        } else {
          const {uri, type, fileName} = response.assets[0];
          const temp = {
            uri: uri ?? '',
            type: type ?? '',
            name: fileName ?? '',
          };
          setImage(temp);
          dispatch(
            setProfileimage( temp
            ),
          );
        }
      }
    });
  };

  return (
    <>
      <FlexBox flexDirection="column">
        <TouchableOpacity onPress={() => setModal(true)}>
          <Image source={image} style={styles.profile} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.camera} onPress={() => UploadFile()}>
          <MaterialCommunityIcons
            name="camera-outline"
            color={COLORS.NATURAL_WHITE}
            size={24}
          />
        </TouchableOpacity>
        <Modal
          isVisible={modal}
          children={
            <FlexBox justifyContent="center" flexDirection="column">
              <TouchableOpacity onPress={() => setModal(false)}>
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color={COLORS.NATURAL_WHITE}
                />
              </TouchableOpacity>
              <FlexBox
                flexDirection="column"
                style={styles.container}
                justifyContent="center">
                <Image source={image} style={styles.profilepic} />
              </FlexBox>
            </FlexBox>
          }></Modal>
      </FlexBox>
    </>
  );
}
const styles = StyleSheet.create({
  profile: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  camera: {
    position: 'absolute',
    bottom: 0,
    padding: 7,
    backgroundColor: COLORS.PRIMARY_600,
    borderRadius: 50,
    left: 90,
  },
  profilepic: {
    width: '100%',
    height: '50%',
    borderRadius: 0,
  },
  container: {
    width: '100%',
    height: '100%',
  },
});
