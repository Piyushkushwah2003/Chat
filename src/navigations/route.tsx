import React from 'react';
import Login from '../screens/Login';
import Signup from '../screens/signup';
import RootStackParamList from '../types/root_stack_param_list';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import signup from '../screens/signup';
import {navigationRef} from '../services/navigation_services';
import chatsdashboard from '../screens/chatsdashboard';
import calls from '../screens/calls';
import status from '../screens/status';
import groups from '../screens/groups';
import profile from '../screens/profile';
import home from '../screens/home';
import chatview from '../screens/chatview';
import addprofile from '../screens/addprofile';
import resetpassword from '../screens/resetpassword';
import chatscreen from '../screens/chatscreen';
import userbottomnavigation from './userbottomnavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function () {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={'Login'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={signup} />
        <Stack.Screen name="Chatsdashboard" component={chatsdashboard} />
        <Stack.Screen name="Calls" component={calls} />
        <Stack.Screen name="Status" component={status} />
        <Stack.Screen name="Groups" component={groups} />
        <Stack.Screen name="Profile" component={profile} />
        <Stack.Screen name="Home" component={home} />
        <Stack.Screen name="Chatview" component={chatview} />
        <Stack.Screen name="Profileupload" component={addprofile} />
        <Stack.Screen name="Resetpassword" component={resetpassword} />
        <Stack.Screen name="Chatscreen" component={chatscreen} />
        <Stack.Screen
            name={'UserBottomnavigation'}
            component={userbottomnavigation}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
