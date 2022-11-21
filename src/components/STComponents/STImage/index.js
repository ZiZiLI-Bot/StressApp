import React from 'react';
import {Animated, Image, View} from 'react-native';

export default function STImage({source, style, resizeMode, thumbnailSource}) {
  const thumbnailAnimated = new Animated.Value(0);
  const imageAnimated = new Animated.Value(0);

  const handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View>
      <Animated.Image
        source={{uri: thumbnailSource || source}}
        style={[style, {opacity: thumbnailAnimated}]}
        resizeMode={resizeMode}
        onLoad={handleThumbnailLoad}
        blurRadius={1}
      />
      <Animated.Image
        // className="absolute left-0 right-0 top-0 bottom-0"
        source={{uri: source}}
        style={[style, {opacity: imageAnimated}]}
        resizeMode={resizeMode}
        onLoad={onImageLoad}
      />
    </View>
  );
}
