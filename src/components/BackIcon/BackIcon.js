import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function BackIcon({style, onPress}) {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      className="h-10 w-10 bg-gray-100 rounded-full flex justify-center items-center">
      <Icon
        name="arrow-back-sharp"
        size={24}
        color="#000"
        style={{backgroundColor: '#f3f4f6', marginRight: 3}}
      />
    </TouchableOpacity>
  );
}
