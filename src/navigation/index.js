/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthNavigation';
import {useWindowDimensions} from 'react-native';
import {setScreenDimensions} from '../reducers/ScreenDimensions.reduces';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from './DrawerNavigation';

export default function Navigation() {
  const userLogin = useSelector(state => state.user.isLogin);
  const {width, height} = useWindowDimensions();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setScreenDimensions({width, height}));
  }, []);

  return (
    <NavigationContainer>
      {userLogin ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}
