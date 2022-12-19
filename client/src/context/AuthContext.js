import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';


import { Spin } from 'antd'
const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate()
  const [isloading, setIsLoading] = useState(true)
  
  React.useEffect(() => {
      if(user) {
        navigate("/")
      }
      navigate("/login")
  }, []);


  return (
    <AuthContext.Provider  value={{ user, setUser }} >
      { isloading ? <Spin/> : children }
    </AuthContext.Provider>
  )
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
