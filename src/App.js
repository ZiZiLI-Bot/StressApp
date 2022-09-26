import React from 'react';
import {LogBox} from 'react-native';
import 'react-native-gesture-handler';
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
          <Navigation />
        </PaperProvider>
      </TailwindProvider>
    </StoreProvider>
  );
}

LogBox.ignoreLogs(['Require cycle:']);
