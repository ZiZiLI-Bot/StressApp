import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import {Provider as StoreProvider} from 'react-redux';
import {TailwindProvider} from 'tailwindcss-react-native';
import store from './helpers/Redux/store';
import Navigation from './navigation';
import theme from './theme';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StoreProvider store={store}>
        <TailwindProvider>
          <PaperProvider theme={theme}>
            <Navigation />
          </PaperProvider>
        </TailwindProvider>
      </StoreProvider>
    </GestureHandlerRootView>
  );
}

LogBox.ignoreLogs(['Require cycle:'], ['Remote debugger:']);
