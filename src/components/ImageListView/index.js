import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import STText from '../STComponents/STText';
import FastImage from 'react-native-fast-image';

export default function ImageListView({listImage}) {
  const slideList = () => {
    if (listImage.length > 4) {
      const newList = listImage.slice(0, 4);
      return newList;
    } else {
      return listImage;
    }
  };
  if (slideList().length === 1) {
    return (
      <View className="flex-row flex-wrap w-full">
        {slideList().map((item, index) => {
          return (
            <FastImage
              key={index}
              className="h-48 w-full"
              source={{
                uri: item,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          );
        })}
      </View>
    );
  } else if (slideList().length >= 2) {
    return (
      <View className="flex-row flex-wrap justify-between">
        {slideList().map((item, index) => (
          <FastImage
            className="h-44 mb-1"
            style={{width: '49.5%'}}
            key={index}
            source={{uri: item}}
            resizeMode={FastImage.resizeMode.cover}
          />
        ))}
        {listImage.length > 4 && (
          <TouchableOpacity className="w-full">
            <STText className="text-slate-500 text-right mr-4 my-1">
              Xem thêm ...
            </STText>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
