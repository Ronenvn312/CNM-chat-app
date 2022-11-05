import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';
import { Spin } from 'antd'
const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate()
  const [isloading, setIsLoading] = useState(true)

  const [currentUser, setCurrentUser] = useState(null)

  
  React.useEffect(() => {
    onAuthStateChanged(auth,(user) => {
      
      if(user) {
        setCurrentUser(currentUser)
        if(auth.currentUser.emailVerified) {
          console.log(user)
          
          const { displayName, email, uid, photoURL} = user
          setUser({ displayName, email, uid, photoURL})
          setIsLoading(false); 
          navigate("/") 
        }else {
          console.log(user)
          navigate('/verify-email',{ currentUser})
        }
      }else {
        navigate('/login')
      }
      
    });
  }, []);


  return (
    <AuthContext.Provider  value={{ currentUser }} >
      { isloading ? <Spin/> : children }
    </AuthContext.Provider>
  )
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
