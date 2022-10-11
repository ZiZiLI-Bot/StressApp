import firestore from '@react-native-firebase/firestore';

const addDocument = async (collection, data) => {
  firestore().collection(collection).add(data);
};

export {addDocument};
