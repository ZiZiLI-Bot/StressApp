import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CourseDetail from '../screens/CourseScreen/CourseDetail';
import CourseList from '../screens/CourseScreen/CourseList';
import DiaryContent from '../screens/DiaryScreen/DiaryContent';
import DiaryScreen from '../screens/DiaryScreen/DiaryList';
import ChatRoom from '../screens/ERConnect/ChatRoom';
import SearchUser from '../screens/ERConnect/SearchUser';
import ExpertsContent from '../screens/ExpertsScreen/ExpertsContent';
import ExpertsScreen from '../screens/ExpertsScreen/ExpertsList';
import CreatePost from '../screens/ForumScreen/CreatePost';
import ForumScreen from '../screens/ForumScreen/ForumScreen';
import ViewDetailPost from '../screens/ForumScreen/ViewDetailPost';
import IdentifyScreen from '../screens/IdentifyScreen';
import NewspaperListScreen from '../screens/NewspaperScreen/NewspaperListScreen';
import PostsScreen from '../screens/PostsScreen';
import PremiumScreen from '../screens/PremiumScreen';
import QuizScreen from '../screens/QuizScreen';
import QuizListScreen from '../screens/QuizScreen/QuizListScreen';
import NotificationScreen from '../screens/SettingScreen/NotificationScreen';
import UserInfoScreen from '../screens/SettingScreen/UserInfoScreen';
import BottomTabsNavigation from './BottomTabsNavigation';

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
      <Stack.Screen name="MainBottomTabs" component={BottomTabsNavigation} />
      <Stack.Group>
        <Stack.Screen name="QuizScreen" component={QuizScreen} />
        <Stack.Screen name="ForumScreen" component={ForumScreen} />
        <Stack.Screen name="PostScreen" component={PostsScreen} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
        <Stack.Screen name="SearchUser" component={SearchUser} />
        <Stack.Screen name="DiaryContent" component={DiaryContent} />
        <Stack.Screen name="ExpertsContent" component={ExpertsContent} />
        <Stack.Screen name="ViewDetailPost" component={ViewDetailPost} />
        <Stack.Screen name="CreatePost" component={CreatePost} />
        <Stack.Screen name="DiaryScreen" component={DiaryScreen} />
        <Stack.Screen name="CourseScreen" component={CourseList} />
        <Stack.Screen name="ExpertsScreen" component={ExpertsScreen} />
        <Stack.Screen name="IdentifyScreen" component={IdentifyScreen} />
        <Stack.Screen name="QuizListScreen" component={QuizListScreen} />
        <Stack.Screen name="CourseDetail" component={CourseDetail} />
        <Stack.Screen name="PremiumScreen" component={PremiumScreen} />
        <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
        <Stack.Screen
          name="NewspaperListScreen"
          component={NewspaperListScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
