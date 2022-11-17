import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {getData} from '../helpers/Store';
import LoginScreen from '../screens/AuthScreen/LoginScreen';
import RegisterScreen from '../screens/AuthScreen/RegisterScreen';
import UpdateInfoScreen from '../screens/AuthScreen/UpdateInfoScreen';
import AutoLog from '../screens/AuthScreen/AutoLog';

export default function AuthNavigation() {
  const Stack = createNativeStackNavigator();
  const [jwt, setJwt] = useState(null);
  useEffect(() => {
    const getJWT = async () => {
      const JWT = await getData('token');
      setJwt(JWT);
    };
    getJWT();
  }, [jwt]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarColor: 'white',
        statusBarStyle: 'dark',
      }}>
      {jwt ? (
        <Stack.Screen name="AutoLog" component={AutoLog} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="UpdateInfo" component={UpdateInfoScreen} />
    </Stack.Navigator>
  );
}
