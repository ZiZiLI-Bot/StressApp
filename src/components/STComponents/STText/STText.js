import React from 'react';
import {Text} from 'react-native';

export default function STText(props) {
  const {style, children, font} = props;
  let TempFont;
  switch (font) {
    case 'bold':
      TempFont = 'Arimo-Bold';
      break;
    case 'medium':
      TempFont = 'Arimo-Medium';
      break;
    case 'semiBold':
      TempFont = 'Arimo-SemiBold';
      break;
    default:
      TempFont = 'Arimo-Regular';
      break;
  }
  let mainStyle;
  if (style) {
    mainStyle = style.map(item => {
      return {
        ...item,
      };
    });
    mainStyle.push({
      fontFamily: TempFont,
    });
  } else {
    mainStyle = {
      fontFamily: TempFont,
      color: '#000',
    };
  }
  return <Text style={mainStyle}>{children}</Text>;
}
