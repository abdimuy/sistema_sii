import { useState } from 'react';
import { db } from '../firebase';

const useSetDocument = () => {

  const [loading, setLoading] = useState(false);

  const setDocument = async (collection, data) => {
    setLoading(true)
    try {
      await db.collection(collection).add(data)
      console.log("Documentos subido con exito");
    } catch (err) {
      console.log(err);
    }
    setLoading(false)
  }

  return [
    setDocument,
    loading
  ];
}

export default useSetDocument
