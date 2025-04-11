import React, { useEffect, useState } from 'react';
import Screen from '../../components/screen';
import FlexBox from '../../components/flexbox';
import {Image} from 'react-native';
import {COLORS, IMAGES, SIZE} from '../../config/constants';
import Title from '../../components/title';
import { getItem, StorageKeys } from '../../services/storage_services';
import { getUser } from '../../services/firebase_fireStore';
import { useDispatch } from 'react-redux';
import { navigate } from '../../services/navigation_services';
export default function () {
    const dispatch=useDispatch();
  const [fcmToken, setFcmToken] = useState<string>('');
  useEffect(() => {
    const handleNavigation = async () => {
      const token = await getItem(StorageKeys.Token);
      setFcmToken(token);
      console.log('token--------', token);
      if (token) {
        getUser(dispatch, token);
      } else{
        navigate('Login')
      }
    };
    handleNavigation();
  }, []);
  return (
    <Screen>
      <Image
        source={IMAGES.logo}
        style={{
          width: '55%',
          height: '50%',
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      />

      <Title
        text="Build the safe connections with safeChat !!!"
        textStyle={{
          width: '70%',
          textAlign: 'center',
          fontSize: SIZE.LARGE,
          fontWeight: '600',
          color: COLORS.PRIMARY_600,
        }}
      />
    </Screen>
  );
}
