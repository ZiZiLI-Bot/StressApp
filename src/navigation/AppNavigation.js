import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import QuizScreen from '../screens/QuizScreen';
import DrawerNavigation from './DrawerNavigation';
import ForumScreen from '../screens/ForumScreen/ForumScreen';
import BottomTabsNavigation from './BottomTabsNavigation';

export default function AppNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarColor: 'white',
        statusBarStyle: 'dark',
        animationEnabled: true,
      }}>
      <Stack.Screen name="MainDrawer" component={DrawerNavigation} />
      <Stack.Group>
        <Stack.Screen name="QuizScreen" component={QuizScreen} />
        <Stack.Screen name="ForumScreen" component={ForumScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
