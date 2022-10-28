import React, { useContext,  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';
import { Spin} from 'antd'
const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate()

  const [isloading, setIsLoading] = useState(true)
  // const googleSignIn = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth, provider);
  //   // signInWithRedirect(auth, provider)
  // };

  // const logOut = () => {
  //     signOut(auth)
  // }

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user)
      if(user) {
        const { displayName, email, uid, photoURL} = user
        setUser({ displayName, email, uid, photoURL})
        setIsLoading(false); 
        navigate("/") 
      }else {
        navigate('/login')
      }
    });
    return () => {
      unsubscribe();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user }}>
      { isloading?  <Spin/>: children }
    </AuthContext.Provider>
  )
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
