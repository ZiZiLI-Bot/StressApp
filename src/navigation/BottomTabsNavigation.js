import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ForumList from '../screens/ForumScreen/ForumList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ERConnect from '../screens/ERConnect';
import CartScreen from '../screens/CartScreen';

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
        name="Trang chủ"
        component={HomeScreen}
        options={{
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
      <Tab.Screen
        name="Chợ CĐ"
        component={CartScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="cart-outline" color={color} size={27} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
