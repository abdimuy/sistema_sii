import { useState, useEffect } from 'react';
import { db } from '../firebase';

const useGetDocument = (collection, documentId) => {

  const [document, setDocument] = useState({});
  const [loading, setLoading] = useState(true)

  const getDocument = ({collection, documentId}) => {
    return db.collection(collection).where()
      .doc(documentId)
      .onSnapshot(snap => {
        setDocument({
          ...snap.data(),
          id: snap.id
        })
        setLoading(false)
      })
  };


  useEffect(() => {
    let listenDB
    try {
      listenDB = getDocument(collection, documentId);
    } catch(err) {
      console.log(err);
    }
    return listenDB
  }, [])

  return [
    document,
    loading
  ]
}

export default useGetDocument
