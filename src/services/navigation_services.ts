import * as React from 'react';
import {
  createNavigationContainerRef,
  DrawerActions,
  StackActions,
} from '@react-navigation/native';
import RootStackParamList from '../types/root_stack_param_list';
import {screenName} from '../types/screen_names';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: screenName, params?: any) {
  navigationRef.navigate(name);
}

export function replace(name: screenName, params?: any) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}
export function reset(name: screenName, params?: any) {
  navigationRef.current?.reset(name, params);
}

export function push(name: screenName, params?: any) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

export function toggleDrawer() {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}
export function closeDrawer() {
  navigationRef.current?.dispatch(DrawerActions.closeDrawer());
}

export function goBack() {
  navigationRef.current?.canGoBack() && navigationRef.current?.goBack();
}
export function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}
