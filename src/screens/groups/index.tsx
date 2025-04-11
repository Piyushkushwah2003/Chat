import React from 'react';
import FlexBox from '../../components/flexbox';
import Title from '../../components/title';
import Box from '../../components/box';
import Screen from '../../components/screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../config/constants';
import {TouchableOpacity} from 'react-native';
import {navigate} from '../../services/navigation_services';
export default function () {
  return (
    <>
      <Screen>
        <TouchableOpacity
          onPress={() => navigate('UploadPost')}
          style={{position: 'absolute', bottom: 50, right: 20}}>
          <AntDesign name="pluscircle" size={44} color={COLORS.PRIMARY_600} />
        </TouchableOpacity>
      </Screen>
    </>
  );
}
