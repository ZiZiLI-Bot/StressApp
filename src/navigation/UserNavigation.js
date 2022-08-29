import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

export default function UserNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Group>
      <Stack.Screen name="HomePage" component={HomeScreen} />
    </Stack.Group>
  );
}
