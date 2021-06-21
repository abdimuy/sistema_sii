import { useState, useEffect } from 'react';
import { db } from '../firebase';

const useGetCollectionQuery = (collection, query) => {

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCollectionQuery = (collection, query) => {
    const [fieldPath, operator, value] = query;
    return db.collection(collection).where(fieldPath, operator, value)
      .onSnapshot(snap => {
        let documents = []
        snap.docs.map(doc => {
          documents.push({
            ...doc.data(),
            id: doc.id
          });
        });
        setDocuments(documents);
        setLoading(false)
      })
  }

  useEffect(() => {
    let listenDB;
    try {
      listenDB = getCollectionQuery(collection, query)
    } catch(err) {
      console.log(err)
    }
    return listenDB
  }, [])

  return [
    documents,
    loading
  ]
}

export default useGetCollectionQuery
