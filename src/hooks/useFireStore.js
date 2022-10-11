import React from 'react';
import firestore from '@react-native-firebase/firestore';

export default function useFireStore(collection, condition) {
  const [docs, setDocs] = React.useState([]);
  React.useEffect(() => {
    let collectionRef = firestore().collection(collection).orderBy('createdAt');

    // if (condition) {
    //   if (!condition.compareValue || !condition.compareValue.length) {
    //     return;
    //   }
    //   collectionRef = collectionRef.where(
    //     condition.fieldName,
    //     condition.operator,
    //     condition.compareValue,
    //   );
    // }

    const unsubscribe = collectionRef.onSnapshot(snapshot => {
      const documents = snapshot?.docs?.map(doc => {
        return {...doc.data(), id: doc.id};
      });
      setDocs(documents);
    });

    return unsubscribe;
  }, [collection, condition]);
  return docs;
}
