import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '180951980063-rbfcu1fi7kar99j479922s4du07brpir.apps.googleusercontent.com',
});

const onGoogleButtonPress = async () => {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
};

const GoogleLogin = async () => {
  return await onGoogleButtonPress();
};

export default GoogleLogin;
