import { useState } from 'react';
import { db } from '../firebase';

const useUpdateDocument = () => {

  const [loading, setLoading] = useState(true)

  const updateDocument = (collection, documentId, newData) => {
    return db.collection(collection).doc(documentId)
      .update(newData)
      .then(() => {
        console.log('El documento se ha actualizado con exito')
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false)
      })
  }

  // useEffect(() => {
  //   updateDocument(collection, documentId, newData);
  // }, [])

  return [
    updateDocument
  ]
}

export default useUpdateDocument
