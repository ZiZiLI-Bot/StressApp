/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import STText from '../STText';

export default function STDropDown({style, children, title}) {
  const [show, setShow] = useState(false);
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);
  // const rotate = useSharedValue(0);

  const animation = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      height: height.value,
    };
  }, []);

  // const animationIcon = useAnimatedStyle(() => {
  //   return {
  //     transform: rotate.value,
  //   };
  // }, []);

  useEffect(() => {
    opacity.value = withTiming(show ? 1 : 0, {duration: 250});
    height.value = withTiming(show ? 100 : 0, {duration: 250});
    // rotate.value = withTiming(show ? 180 : 0, {duration: 250});
  }, [show]);
  return (
    <View style={style}>
      <TouchableOpacity
        className="flex-row items-center"
        onPress={() => setShow(!show)}>
        <STText className="text-xl text-gray-600 mr-3">
          {title ? title : 'Mở'}
        </STText>
        <Animated.View>
          <Icon name="chevron-down" size={25} />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={animation}>{children}</Animated.View>
    </View>
  );
}
