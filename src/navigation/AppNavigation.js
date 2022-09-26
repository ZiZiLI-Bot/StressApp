import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import QuizScreen from '../screens/QuizScreen';
import DrawerNavigation from './DrawerNavigation';

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
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
    </Stack.Navigator>
  );
}
