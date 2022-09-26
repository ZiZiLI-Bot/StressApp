import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import UserInfo from '../screens/UserInfo';

export default function AppNavigation() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        statusBarColor: 'white',
        statusBarStyle: 'dark',
      }}>
      <Drawer.Screen name="HomePage" component={HomeScreen} />
      <Drawer.Screen name="UserInfo" component={UserInfo} />
    </Drawer.Navigator>
  );
}
