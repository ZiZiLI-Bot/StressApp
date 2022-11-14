import {Alert, Linking} from 'react-native';

const OpenURL = uri => {
  const supported = Linking.canOpenURL(uri);
  if (supported) {
    Linking.openURL(uri);
  } else {
    Alert.alert(`Don't know how to open this URL: ${uri}`);
  }
};

export default OpenURL;
