import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase.jsx';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState()

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthProvider