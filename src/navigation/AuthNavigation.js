import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';

export default function AuthNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Group>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Group>
  );
}
