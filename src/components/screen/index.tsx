import React from 'react';
import FlexBox from '../flexbox';
import {StyleSheet, View} from 'react-native';
export default function ({children}: {children?: React.ReactNode}) {
  return <View style={styles.container}>{children}</View>;
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
});
