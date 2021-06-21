import React, { useContext, useEffect, useState } from 'react';
import { fbAuth } from '../firebase';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return fbAuth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return fbAuth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return fbAuth.signOut();
  };

  useEffect(() => {
    const unsubscribe = fbAuth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    })
    return unsubscribe
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={ value }>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext
