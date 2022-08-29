import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogBox} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import {TailwindProvider} from 'tailwindcss-react-native';
import store from './helpers/Redux/store';
import Navigation from './navigation';
import theme from './theme';

export default function App() {
  return (
    <StoreProvider store={store}>
      <TailwindProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </PaperProvider>
      </TailwindProvider>
    </StoreProvider>
  );
}

LogBox.ignoreLogs(['Require cycle:']);
