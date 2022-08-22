import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import {TailwindProvider} from 'tailwindcss-react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import theme from './theme';
import {LogBox} from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TailwindProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </TailwindProvider>
  );
}

LogBox.ignoreLogs(['Require cycle:']);
