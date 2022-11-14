import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContainer from '../container/DrawerContainer';
import UserInfo from '../screens/UserInfo';
import BottomTabsNavigation from './BottomTabsNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DiaryScreen from '../screens/DiaryScreen/DiaryList';
import IdentifyScreen from '../screens/IdentifyScreen';
import CourseList from '../screens/CourseScreen/CourseList';
import ExpertsScreen from '../screens/ExpertsScreen/ExpertsList';

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
          title: 'Nhật ký cá nhân',
        }}
      />
      <Drawer.Screen
        name="CourseScreen"
        component={CourseList}
        options={{
          drawerIcon: ({color}) => <Icon name="yoga" size={28} color={color} />,
          title: 'Khóa học',
        }}
      />
      <Drawer.Screen
        name="ExpertsScreen"
        component={ExpertsScreen}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="doctor" size={28} color={color} />
          ),
          title: 'Chuyên gia',
        }}
      />
      <Drawer.Screen
        name="IdentifyScreen"
        component={IdentifyScreen}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="information-variant" size={28} color={color} />
          ),
          title: 'Nhận định cơ bản',
        }}
      />
      {/* <Drawer.Screen
        name="UserInfo"
        component={UserInfo}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="account-outline" size={30} color={color} />
          ),
          title: 'Thông tin tài khoản',
        }}
      /> */}
    </Drawer.Navigator>
  );
}
