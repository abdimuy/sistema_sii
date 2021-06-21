import { useState, useEffect } from 'react';
import { db } from '../firebase';

const useGetCollection = (collection) => {

  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
 
  const getCollection = (collection) => {
    try {
      return db.collection(collection).onSnapshot(snap => {
        const arrayDocuments = []
        snap.docs.map(doc => {
          arrayDocuments.push({...doc.data(), id: doc.id})
        });
        setDocuments(arrayDocuments);
        setLoading(false)
      })
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    let listenDB = () => {};
    try {
      listenDB = getCollection(collection);
    } catch (err) {
      console.log(err);
    }
    return listenDB
  }, [])

  return [
    documents,
    loading
  ]
}

export default useGetCollection
