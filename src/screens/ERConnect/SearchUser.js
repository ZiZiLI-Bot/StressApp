import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar, Searchbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import STText from '../../components/STComponents/STText';
import {addDocument} from '../../helpers/FireService';

export default function SearchUser({navigation}) {
  const user = useSelector(state => state.user);
  const [searchUser, setSearchUser] = React.useState('');

  const handleChangeSearch = text => {
    if (text === '') {
      setSearchUser('');
    } else {
      const filterUser = user.allUsers.filter(userSearch => {
        return userSearch.name.toLowerCase().includes(text.toLowerCase());
      });
      setSearchUser(filterUser);
    }
  };

  console.log(searchUser);

  const createRoom = async userTarget => {
    const userInfo = {
      userId: user.userId,
      name: user.name,
      avatar: user.avatar,
      phone: user.phone,
      real_name: user.real_name,
      email: user.email,
      tokenDevice: user.tokenDevice,
    };
    const UserSeen = {
      ...userTarget,
      tokenDevice: userTarget.state,
    };
    const roomInfo = {
      roomId: parseInt(
        userTarget.userId.toString() + user.userId.toString(),
        10,
      ),
      membersId: [userInfo.userId, UserSeen.userId],
      members: [userInfo, UserSeen],
      createAt: Date.now(),
    };
    await addDocument('rooms', roomInfo);
    navigation.navigate('ChatRoom', {
      roomsData: roomInfo,
      userDisplay: UserSeen,
    });
  };
  return (
    <SafeAreaView className="p-4">
      <View className="bg-white">
        <Searchbar
          placeholder="Tìm kiếm..."
          onChangeText={text => handleChangeSearch(text)}
        />
      </View>
      <ScrollView className="mt-4">
        {searchUser &&
          searchUser.map(item => (
            <TouchableOpacity
              onPress={() => createRoom(item)}
              key={item.id}
              className="bg-white w-full h-14 mt-2 rounded-lg flex-row items-center">
              <Avatar.Image
                source={{uri: item.avatar}}
                size={47}
                className="ml-3 overflow-hidden"
              />
              <STText className="ml-5 text-base text-gray-600">
                {item.name}
              </STText>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
