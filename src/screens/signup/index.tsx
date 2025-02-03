import React, {useEffect, useState} from 'react';
import FlexBox from '../../components/flexbox';
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Button from '../../components/button';
import Screen from '../../components/screen';
import {COLORS, FONTS, IMAGES, LINEHEIGHT, SIZE} from '../../config/constants';
import Title from '../../components/title';
import {navigate} from '../../services/navigation_services';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {setActiveEmail, setProfiledata} from '../../redux/slices/chats_slice';
import messaging from '@react-native-firebase/messaging';
import {setItem, StorageKeys} from '../../services/storage_services';

export default function () {
  const [fcmToken, setFcmToken] = useState('');
  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission();

    if (
      authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('Notification permission authorized');
    } else {
      console.log('Notification permission denied');
    }
  }
  useEffect(() => {
    requestUserPermission();

    messaging()
      .getToken()
      .then(token => {
        setFcmToken(token);
        setItem(StorageKeys.Token, token);
        console.log('FCM Token:', token);
      });
  }, []);

  const dispatch = useDispatch();
  GoogleSignin.configure({
    webClientId:
      '226669171024-odpsavmau20gesbjtb25shdbhujcicmf.apps.googleusercontent.com',
  });
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const idToken = await response.data?.idToken;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken!);
      await auth().signInWithCredential(googleCredential);
      setMessagetype('success');
      Toast.show({
        text1: 'User sign in successfully',
      });
      navigate('Chatsdashboard');
    } catch (error) {
      setMessagetype('error');
      Toast.show({
        text1: 'Signin error',
      });
      console.log(error);
    }
  };
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [messagetype, setMessagetype] = useState<string>('error');
  const [confirmpassword, setConfirmpassword] = useState<string>('');
  const [eye, setEye] = useState<boolean>(false);
  const [secureText, setSecureText] = useState<boolean>(true);
  const handlepress = () => {
    setEye(!eye);
    setSecureText(!secureText);
  };
  const handleSignUp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' && password === '') {
      setMessagetype('error');
      Toast.show({
        text1: 'Email & password must be required',
      });
    } else if (email === '') {
      setMessagetype('error');
      Toast.show({
        text1: 'Email must be required',
      });
    } else if (password === '') {
      Toast.show({
        text1: 'Password must be required',
      });
    } else if (emailRegex.test(email) === false) {
      setMessagetype('error');
      Toast.show({
        text1: 'Invalid email format',
      });
    } else if (confirmpassword !== password) {
      setMessagetype('error');
      Toast.show({
        text1: 'Both the password did not match',
      });
    } else {
      try {
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        const user = userCredential.user.uid;
        setMessagetype('success');
        Toast.show({
          text1: 'User signed up!',
        });
        dispatch(setProfiledata({email: email, userId: user,token:fcmToken}));
        navigate('Profileupload');
      } catch (error: any) {
        setMessagetype('error');
        Toast.show({
          text1: error.message,
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
          <Title text="Sign up" textStyle={styles.logintext} />
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
          <FlexBox alignItems="center">
            <TextInput
              style={styles.inputfield}
              placeholder="Confirm Password"
              value={confirmpassword}
              placeholderTextColor={COLORS.NEUTRAL_400}
              secureTextEntry={secureText}
              onChangeText={text => setConfirmpassword(text)}></TextInput>
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
          <Button text="Signup" handlePress={handleSignUp} />
          <TouchableOpacity onPress={() => navigate('Login')}>
            <Title text="Already Registered? Login here" />
          </TouchableOpacity>
        </FlexBox>
        <Toast type={messagetype} visibilityTime={1500} />
        <FlexBox
          flexDirection="column"
          style={styles.logocontainer2}
          rowgap={10}
          alignItems="center">
          <Title text="Sign in with" textStyle={styles.signintext} />
          <TouchableOpacity
            style={styles.logocontainer}
            onPress={signInWithGoogle}>
            <Image source={IMAGES.google_logo} style={styles.google} />
          </TouchableOpacity>
        </FlexBox>
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
    backgroundColor: '#0B2F9F',
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
  google: {
    width: 40,
    height: 40,
  },
  logocontainer: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.NATURAL_WHITE,
    borderWidth: 1,
    borderColor: COLORS.NEUTRAL_100,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logocontainer2: {
    marginTop: 50,
  },
  signintext: {
    fontWeight: '400',
    fontSize: SIZE.SMALL,
    lineHeight: LINEHEIGHT.MEDIUM,
    color: COLORS.PRIMARY_600,
  },
});
