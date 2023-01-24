import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import {Provider as StoreProvider} from 'react-redux';
import {TailwindProvider} from 'tailwindcss-react-native';
import {ShowNotification} from './helpers/Notification';
import store from './helpers/Redux/store';
import Navigation from './navigation';
import theme from './theme';
import codePush from 'react-native-code-push';

const App = () => {
  useEffect(() => {
    const unSubscribe = messaging().onMessage(async remoteMessage => {
      console.log('message', remoteMessage);
      ShowNotification(remoteMessage);
    });

    return unSubscribe;
  }, []);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);

  const [loading, setLoading] = useState(true);

  // Bootstrap sequence function
  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log(
        'Notification caused application to open',
        initialNotification.notification,
      );
      console.log(
        'Press action used to open the app',
        initialNotification.pressAction,
      );
    }
  }

  useEffect(() => {
    bootstrap()
      .then(() => setLoading(false))
      .catch(console.error);
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
};
LogBox.ignoreAllLogs();

export default codePush(App);
