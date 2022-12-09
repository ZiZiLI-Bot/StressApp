import React, {useCallback, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';
import BackIcon from '../../components/BackIcon';
import STText from '../../components/STComponents/STText';

export default function CourseDetail({navigation, route}) {
  const {data} = route.params;
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  console.log(data);
  return (
    <SafeAreaView className="bg-white h-full p-4">
      <ScrollView className="bg-white">
        <View className="flex">
          <BackIcon onPress={() => navigation.goBack()} />
          <STText className="text-2xl text-blue-800 mt-4" font="bold">
            {data.name}
          </STText>
        </View>
        <View className="mt-2 rounded-md overflow-hidden">
          <YoutubePlayer
            videoId={data.url}
            height={300}
            onChangeState={onStateChange}
          />
        </View>
        <View>
          <STText className="text-xl text-blue-800 mt-4" font="bold">
            Giới thiệu:
          </STText>
          <STText className="mt-2 text-base text-black">{data.overview}</STText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
