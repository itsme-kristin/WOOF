import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase.jsx';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};




const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    street_address: '',
    city: '',
    state: '',
    zip: '',
    savedBreeds: [],
    savedDogs: [],
  });

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const data = (window.localStorage.getItem('userData'))
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData])



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    signout,
    signin,
    userData: [userData, setUserData]
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;