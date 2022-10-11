import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContainer from '../container/DrawerContainer';
import UserInfo from '../screens/UserInfo';
import BottomTabsNavigation from './BottomTabsNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DiaryScreen from '../screens/DiaryScreen';

export default function AppNavigation() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContainer {...props} />}
      screenOptions={{
        headerShown: false,
        statusBarColor: 'white',
        statusBarStyle: 'dark',
        drawerLabelStyle: {marginLeft: -20},
      }}>
      <Drawer.Screen
        name="HomePage"
        component={BottomTabsNavigation}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="home-outline" size={30} color={color} />
          ),
          title: 'Trang chủ',
        }}
      />
      <Drawer.Screen
        name="DiaryScreen"
        component={DiaryScreen}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="book-outline" size={28} color={color} />
          ),
          title: 'Nhật ký',
        }}
      />
      <Drawer.Screen
        name="UserInfo"
        component={UserInfo}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="account-outline" size={30} color={color} />
          ),
          title: 'Thông tin tài khoản',
        }}
      />
    </Drawer.Navigator>
  );
}
