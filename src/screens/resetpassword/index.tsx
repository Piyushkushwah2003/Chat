import React, {useState} from 'react';
import FlexBox from '../../components/flexbox';
import {Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Button from '../../components/button';
import Title from '../../components/title';
import Screen from '../../components/screen';
import {COLORS, FONTS, IMAGES, SIZE} from '../../config/constants';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import button from '../../components/button';
import Entypo from 'react-native-vector-icons/Entypo';

export default function () {
  const [email, setEmail] = useState<string>('');
  const [messagetype, setMessagetype] = useState<string>('error');
  const sendlink = async () => {
    if (email===''){
        setMessagetype('error');
        Toast.show({
            text1:'Please Enter email'
        })
    }
   else{
    try {
        await auth().sendPasswordResetEmail(email);
        setMessagetype('success');
        Toast.show({
          text1: 'Password reset email sent! Check your inbox.',
        });
      } catch (err) {
        setMessagetype('error');
        Toast.show({
          text1: 'Invalid email',
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
          <Title text="Reset Password" textStyle={styles.logintext} />
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

          <TouchableOpacity style={styles.button} onPress={sendlink}>
            <Title text="Send link" textStyle={styles.title} />
            <Entypo name="link" size={18} color={COLORS.NATURAL_WHITE} />
          </TouchableOpacity>
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
    paddingHorizontal: 10,
    height: 40,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 4,
  },
  logintext: {
    fontSize: SIZE.EXTRASMALL,
    color: 'white',
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
  button: {
    width: '90%',
    height: 45,
    backgroundColor: '#024CAA',
    color: 'white',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    fontSize: SIZE.SMALL,
    fontFamily: FONTS.SEMIBOLD_600,
    color: 'white',
  },
});
