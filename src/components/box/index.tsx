import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

export default function ({
  children,
  boxStyle,
}: {
  children?: React.ReactNode;
  boxStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {
          height: '100%',
          width: '90%',
          alignSelf: 'center',
          paddingVertical: 10,
        },
        boxStyle,
      ]}>
      {children}
    </View>
  );
}
