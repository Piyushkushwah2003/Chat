import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View, StyleSheet, Text} from 'react-native';
import { UserBottomNavigationType } from '../types/helpers';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZE } from '../config/constants';
import FlexBox from '../components/flexbox';
import status from '../screens/status';
import calls from '../screens/calls';
import groups from '../screens/groups';
import profile from '../screens/profile';
import chats from '../components/chats';
import chatsdashboard from '../screens/chatsdashboard';
const Tab = createBottomTabNavigator();

export default function () {
  const routes: UserBottomNavigationType[] = [
    {
      name: 'Chats',
      icon: <Entypo name='chat' size={26} color="black" />,
      iconfill:<Entypo name='chat' size={26} color={COLORS.PRIMARY_800} />
    },
    {
      name: 'Status',
      icon: <MaterialCommunityIcons name="update" size={26} color="black" />,
      iconfill: <MaterialCommunityIcons name="update" size={26} color={COLORS.PRIMARY_800} />
    },
    {
      name:'Groups',
      icon:<MaterialCommunityIcons name="account-group" size={26} color="black" />,
      iconfill:<MaterialCommunityIcons name="account-group" size={26} color={COLORS.PRIMARY_800} />
    },
    {
      name:'Calls',
      icon:<Ionicons name="call" size={26} color="black" />,
      iconfill:<Ionicons name="call" size={26} color={COLORS.PRIMARY_800}/>
    },
    {
      name:'Profile',
      icon:<Ionicons name='person' size={26} color="black"/>,
      iconfill:<Ionicons name='person' size={26} color={COLORS.PRIMARY_800}/>
    }
  ];

  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          const currentRoute = routes.find(item => item.name === route.name);
          if (currentRoute !== undefined) {
            return (
              <FlexBox>
                {focused ? currentRoute.iconfill:currentRoute.icon
              
          }
              </FlexBox>
            );
          }
        },
        tabBarLabel: ({focused}) => {
          return (
            <View style={{width: '100%'}}>
              <View style={styles.labelContainer}>
                <Text
                  style={[styles.labelText, focused && styles.focusedenable]}>
                  {route.name}
                </Text>
              </View>
              {focused ? (
                <View style={styles.bottomBorder} />
              ) : (
                <View style={styles.disablebottomBorder} />
              )}
            </View>
          );
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {fontSize: 12},
        tabBarStyle: {paddingBottom: 0, height: 60},
      })}>
      <Tab.Screen name="Chats" component={chatsdashboard} />
      <Tab.Screen name="Status" component={status} />
      <Tab.Screen name="Groups" component={groups} />
      <Tab.Screen name="Calls" component={calls} />
      <Tab.Screen name="Profile" component={profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  focusedIconContainer: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    paddingBottom: 5,
    backgroundColor:COLORS.NEUTRAL_400
  },
  labelContainer: {
    alignItems: 'center',
  },
  labelText: {
    color: COLORS.NEUTRAL_700,
    fontSize: SIZE.SMALLTEXT,
  },
  focusedenable: {
    fontSize: SIZE.SMALLTEXT,
    color:COLORS.PRIMARY_800
  },
  bottomBorder: {
    width: '100%',
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderColor:COLORS.PRIMARY_800
  },
  disablebottomBorder: {
    width: '100%',
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderColor:COLORS.NATURAL_WHITE
  },
});
