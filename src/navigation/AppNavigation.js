import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DiaryContent from '../screens/DiaryScreen/DiaryContent';
import ChatRoom from '../screens/ERConnect/ChatRoom';
import SearchUser from '../screens/ERConnect/SearchUser';
import ExpertsContent from '../screens/ExpertsScreen/ExpertsContent';
import ForumScreen from '../screens/ForumScreen/ForumScreen';
import PostsScreen from '../screens/PostsScreen';
import QuizScreen from '../screens/QuizScreen';
import DrawerNavigation from './DrawerNavigation';

export default function AppNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarColor: 'white',
        statusBarStyle: 'dark',
        animationEnabled: true,
      }}>
      <Stack.Screen name="MainDrawer" component={DrawerNavigation} />
      <Stack.Group>
        <Stack.Screen name="QuizScreen" component={QuizScreen} />
        <Stack.Screen name="ForumScreen" component={ForumScreen} />
        <Stack.Screen name="PostScreen" component={PostsScreen} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
        <Stack.Screen name="SearchUser" component={SearchUser} />
        <Stack.Screen name="DiaryContent" component={DiaryContent} />
        <Stack.Screen name="ExpertsContent" component={ExpertsContent} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
