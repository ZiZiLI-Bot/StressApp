/* eslint-disable react-hooks/exhaustive-deps */
import Slider from '@react-native-community/slider';
import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {IconButton} from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import {SafeAreaView} from 'react-native-safe-area-context';
import Sound from 'react-native-sound';
import BackIcon from '../../components/BackIcon';
import STText from '../../components/STComponents/STText';

Sound.setCategory('Playback');

const list = [1, 2, 3, 5];

const podcastHighlights = [
  {
    id: 0,
    name: 'Wingman Podcast 2 - Giao Tiếp Cho Người Hướng Nội',
    link: 'http://14.225.205.132:8000/files/1670625763332-podcast6.mp3',
    owner: 'Wingman',
    image:
      'https://i.ytimg.com/vi/iYPuqDguRro/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCcZ1fxVfm6LTZkXVmsZW7922NnKQ',
  },
  {
    id: 1,
    name: 'Ikigai - Cách tôi đã tìm ra ý nghĩa cuộc sống của mình',
    link: 'http://14.225.205.132:8000/files/1670625770386-podcast7.mp3',
    owner: 'Hieu Nguyen',
    image:
      'https://i.ytimg.com/vi/KYQNUZrvnew/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDD1-rH_zgtHKogcyuguxFnn3_7TA',
  },
  {
    id: 2,
    name: 'AUDIO - PODCAST | #6: chất liệu của cuộc sống "CẢM XÚC"',
    link: 'http://14.225.205.132:8000/files/1670625773734-podcast8.mp3',
    owner: 'Unite-D Team Official',
    image:
      'https://i.ytimg.com/vi/LeaDN0OxCtw/hq720.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhhIBMofzAP&rs=AOn4CLDQDArGjPZ4ZCRyd1dMANGXWk7hjg',
  },
];

const podcastList = [
  {
    id: 0,
    name: 'Một cuộc đời đáng sống',
    link: 'http://14.225.205.132:8000/files/1670625661044-podcast1.mp3',
    owner: 'Hieu Nguyen',
    image:
      'https://i.ytimg.com/vi/gGLxPY3qDYY/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDkbxlC-rJTnHybG_HoHc5U0v92lQ',
  },
  {
    id: 1,
    name: 'Vực dậy sau những ngày mệt mỏi và mất động lực | Podcast #01',
    link: 'http://14.225.205.132:8000/files/1670625664451-podcast2.mp3',
    owner: 'The Hanoi Chamomile',
    image:
      'https://i.ytimg.com/vi/4AIhLv-qtYk/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC2pDpATOgSebDUzJP4eeJ79sISww',
  },
  {
    id: 2,
    name: 'Đừng Ước Cuộc Đời Người Khác | Dan Foolish',
    link: 'http://14.225.205.132:8000/files/1670625666046-podcast3.mp3',
    owner: 'Dan Foolish',
    image:
      'https://i.ytimg.com/vi/llPc0mTWoBk/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCr4hwDVacTeM6EnxZRgYXv2uDfUg',
  },
  {
    id: 3,
    name: 'Thử bao nhiều lần trước khi dừng lại? - Vũ. | Have a Sip EP93',
    link: 'http://14.225.205.132:8000/files/1670625668138-podcast4.mp3',
    owner: 'Vietcetera',
    image: 'https://i.ytimg.com/vi/8JTAh8VoO18/0.jpg',
  },
  {
    id: 4,
    name: 'Người giỏi thực sự, sớm đã chọn lối sống tối giản | Sách Tiểu sử Steve Jobs',
    link: 'http://14.225.205.132:8000/files/1670625755176-podcast5.mp3',
    owner: 'Better Version',
    image: 'https://i.ytimg.com/vi/WnhhO06xMdo/0.jpg',
  },
];

export default function PodCastScreen({navigation}) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [infoSound, setInfoSound] = React.useState(null);
  const [currentSound, setCurrentSound] = React.useState(null);
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);

  useEffect(() => {
    setInterval(() => {
      if (currentSound) {
        currentSound.getCurrentTime(seconds => {
          setCurrentTime(seconds);
        });
      }
    }, 1000);
  }, [currentSound]);

  const handlerChangeTime = value => {
    currentSound.setCurrentTime(value);
  };

  const handlerRewind = () => {
    currentSound.setCurrentTime(currentTime - 15);
  };

  const handlerForward = () => {
    currentSound.setCurrentTime(currentTime + 15);
  };

  const handlerPlay = () => {
    if (!currentSound) {
      playSound(infoSound.link);
    } else {
      if (isPlaying) {
        currentSound.pause();
      } else {
        currentSound.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlerChangeSound = item => {
    if (currentSound) {
      setInfoSound(item);
      currentSound.release();
      setCurrentSound(null);
      setIsPlaying(false);
      playSound(item.link);
    } else {
      setInfoSound(item);
      playSound(item.link);
    }
  };

  const playSound = uri => {
    const whoosh = new Sound(uri, null, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      setIsPlaying(true);
      // loaded successfully
      setDuration(whoosh.getDuration());

      // Play the sound with an onEnd callback
      whoosh.play(success => {
        if (success) {
          console.log('successfully finished playing');
          setIsPlaying(false);
          setCurrentSound(null);
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
    setCurrentSound(whoosh);
  };

  const width = Dimensions.get('window').width;
  return (
    <SafeAreaView className="bg-white h-full pt-4">
      <View className="flex-row items-center ml-4">
        <BackIcon onPress={() => navigation.goBack()} />
        <STText className="pl-4 text-blue-700 text-2xl" font="bold">
          PodCast
        </STText>
      </View>
      <ScrollView className="bg-white flex-1">
        <View className="w-full h-56 relative flex">
          <Carousel
            data={podcastHighlights}
            width={width - 60}
            autoPlay={true}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 40,
            }}
            className="absolute top-8 left-0 right-0 bottom-0 ml-7"
            renderItem={({index, item}) => (
              <TouchableOpacity
                onPress={() => {
                  handlerChangeSound(item);
                }}
                className="w-full h-44 bg-slate-300 rounded-xl flex justify-center items-center overflow-hidden relative"
                key={item.name}>
                <ImageBackground
                  source={{uri: item.image}}
                  className="w-full h-full opacity-10 absolute top-0 left-0 right-0 bottom-0"
                />
                <View className="bg-blue-400 w-28 h-28 flex items-center justify-center rounded-full">
                  <Image
                    source={{uri: item.image}}
                    className="w-24 h-24 rounded-full"
                  />
                </View>
                <STText className="text-blue-800 text-lg text-center font-bold">
                  {item.name}
                </STText>
              </TouchableOpacity>
            )}
          />
        </View>
        <View className="p-3">
          {podcastList.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                handlerChangeSound(item);
              }}
              key={item.id}
              className="bg-slate-200 flex-row my-2 rounded-xl overflow-hidden w-full h-24">
              <Image source={{uri: item.image}} className="w-28 h-24" />
              <View className="flex-1 ml-2 mt-1">
                <STText numberOfLines={3} className="text-base text-black">
                  {item.name}
                </STText>
                <STText className="text-sm text-gray-500">{item.owner}</STText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {infoSound && (
        <View className="w-full h-28 bg-white flex-row flex rounded-lg overflow-hidden">
          <Image
            source={{
              uri: infoSound?.image,
            }}
            className="w-32 h-full"
            resizeMode="cover"
          />
          <View className="h-full ml-2 flex-1">
            <STText numberOfLines={1} className="text-lg text-black w-11/12">
              {infoSound?.name}
            </STText>
            <STText className="text-sm text-gray-500">
              {infoSound?.owner}
            </STText>
            <View className="w-full">
              <Slider
                className="w-full h-1"
                onSlidingComplete={value => {
                  handlerChangeTime(value);
                }}
                value={currentTime}
                minimumValue={0}
                maximumValue={duration}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
              />
            </View>
            <View className="flex-row justify-around items-center">
              <TouchableOpacity onPress={handlerRewind}>
                <IconButton
                  icon="rewind-15"
                  size={22}
                  iconColor="white"
                  containerColor="gray"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlerPlay}>
                <IconButton
                  icon={!isPlaying ? 'play' : 'pause'}
                  size={22}
                  iconColor="white"
                  containerColor="gray"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlerForward}>
                <IconButton
                  icon="fast-forward-15"
                  size={22}
                  iconColor="white"
                  containerColor="gray"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
