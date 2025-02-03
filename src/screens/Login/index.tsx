import React, {useEffect, useState} from 'react';
import FlexBox from '../../components/flexbox';
import {Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Button from '../../components/button';
import Title from '../../components/title';
import {navigate} from '../../services/navigation_services';
import Screen from '../../components/screen';
import {COLORS, FONTS, IMAGES, SIZE} from '../../config/constants';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {setProfiledata} from '../../redux/slices/chats_slice';
import {useDispatch} from 'react-redux';
import { getItem, StorageKeys } from '../../services/storage_services';
import { getUser } from '../../services/firebase_fireStore';

export default function () {
  const dispatch=useDispatch();
  const [fcmToken, setFcmToken]=useState<string>('')
useEffect(()=>{
  const handleNavigation=async()=>{
    const token=await getItem(StorageKeys.Token);
    setFcmToken(token);
    console.log('token--------',token);
  if(token){
      getUser(dispatch,token); 
  }

  }
  handleNavigation();
},[])

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [messagetype, setMessagetype] = useState<string>('error');
  const [eye, setEye] = useState<boolean>(false);
  const [secureText, setSecureText] = useState<boolean>(true);
  const handlepress = () => {
    setEye(!eye);
    setSecureText(!secureText);
  };
  const handleSignIn = async () => {
    if (email === '' && password === '') {
      setMessagetype('error');
      Toast.show({
        text1: 'Email and Passoword is mandatory',
      });
    } else if (email === '') {
      setMessagetype('error');
      Toast.show({
        text1: 'Please Enter your Email',
      });
    } else if (password === '') {
      setMessagetype('error');
    } else {
      try {
        const userCredential = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        const user = userCredential.user;
        setMessagetype('success');
        dispatch(setProfiledata({email: email, userId: user.uid,token:fcmToken}));
        Toast.show({
          text1: 'User login successfully',
        });

        navigate('UserBottomnavigation');
      } catch (error: any) {
        setMessagetype('error');
        Toast.show({
          text1: 'Invalid credentials',
        });
      }
    }
  };
  return (
    <>
      <Screen>
        <FlexBox
          justifyContent="center"
          alignItems="center"
          style={styles.login}>
          <Title text="Login" textStyle={styles.logintext} />
        </FlexBox>
        <Image source={IMAGES.logo} style={styles.logo} />
        <FlexBox
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          rowgap={10}
          style={styles.container}>
          <TextInput
            style={styles.inputfield2}
            placeholder="Enter your Email"
            value={email}
            placeholderTextColor={COLORS.NEUTRAL_400}
            onChangeText={text => setEmail(text)}></TextInput>
          <FlexBox alignItems="center">
            <TextInput
              style={styles.inputfield}
              placeholder="Enter your Password"
              value={password}
              secureTextEntry={secureText}
              placeholderTextColor={COLORS.NEUTRAL_400}
              onChangeText={text => setPassword(text)}></TextInput>
            <FlexBox alignItems="center" style={styles.eye}>
              {eye ? (
                <TouchableOpacity onPress={handlepress}>
                  <Ionicons name="eye" size={20} color={COLORS.NEUTRAL_500} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handlepress}>
                  <Ionicons
                    name="eye-off"
                    size={20}
                    color={COLORS.NEUTRAL_500}
                  />
                </TouchableOpacity>
              )}
            </FlexBox>
          </FlexBox>
          <Button text="Login" handlePress={handleSignIn} />
          <TouchableOpacity onPress={() => navigate('Resetpassword')}>
            <Title text="Forgot passowrd?" />
          </TouchableOpacity>
          <FlexBox alignItems="center" style={styles.signup}>
            <Title text="Don't have an account? " />
            <TouchableOpacity onPress={() => navigate('Signup')}>
              <Title text=" Signup here" textStyle={styles.text} />
            </TouchableOpacity>
          </FlexBox>
        </FlexBox>
        <Toast type={messagetype} visibilityTime={1500} />
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '80%',
  },
  logo: {
    width: 220,
    height: 220,
  },
  login: {
    backgroundColor: '#024CAA',
    width: 80,
    height: 40,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 4,
  },
  logintext: {
    fontSize: SIZE.MEDIUM,
    color: 'white',
  },
  inputfield: {
    width: '77%',
    height: 45,
    borderColor: '#0B2F9F',
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 0,
    fontFamily: FONTS.SEMIBOLD_600,
    fontSize: SIZE.EXTRASMALL,
    padding: 10,
    fontWeight: '400',
    color: 'black',
  },
  inputfield2: {
    width: '90%',
    height: 45,
    borderColor: '#0B2F9F',
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: FONTS.SEMIBOLD_600,
    fontSize: SIZE.EXTRASMALL,
    padding: 10,
    fontWeight: '400',
    color: 'black',
  },
  eye: {
    width: '13%',
    height: 45,
    justifyContent: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: COLORS.PRIMARY_800,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  signup: {
    marginTop: 50,
  },
  text: {
    color: COLORS.PRIMARY_800,
  },
});
