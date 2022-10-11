/* eslint-disable react-hooks/exhaustive-deps */
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setScreenDimensions} from '../reducers/ScreenDimensions.reduces';
import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthNavigation';

const navigationRef = createNavigationContainerRef();

export default function Navigation() {
  const userLogin = useSelector(state => state.user.isLogin);
  const {width, height} = useWindowDimensions();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setScreenDimensions({width, height}));
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {userLogin ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}

export {navigationRef};
