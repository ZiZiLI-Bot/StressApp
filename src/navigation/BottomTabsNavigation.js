import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ForumList from '../screens/ForumScreen/ForumList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ERConnect from '../screens/ERConnect/ChatList';
import ExpertsScreen from '../screens/ExpertsScreen/ExpertsList';
import CourseList from '../screens/CourseScreen/CourseList';
import PodCastScreen from '../screens/PodCastScreen';

const Tab = createBottomTabNavigator();
export default function BottomTabsNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        statusBarColor: 'white',
        statusBarStyle: 'dark',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 58,
          borderRadius: 14,
        },
        tabBarInactiveTintColor: '#999',
        tabBarActiveTintColor: '#1374a7',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({color, size}) => (
            <Icon name="home-outline" color={color} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name="Forum"
        component={ForumList}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="forum-outline" color={color} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name="ER Connect"
        component={ERConnect}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="chat-outline" color={color} size={27} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="CourseScreen"
        component={CourseList}
        options={{
          title: 'Khóa học',
          tabBarIcon: ({color, size}) => (
            <Icon name="book-outline" color={color} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name="Chuyên gia"
        component={ExpertsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="doctor" color={color} size={27} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="PodCast"
        component={PodCastScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="podcast" color={color} size={27} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
