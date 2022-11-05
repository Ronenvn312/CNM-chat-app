import './profile.css'
import {AuthProvider, UserAuth} from '../context/AuthContext'
import { signOut } from 'firebase/auth' 
import { auth } from '../firebase'
import React from 'react'


function Profile() {
  // const {currentUser} = React.useContext(AuthProvider)

  return (
      <div style={{display: 'flex',flex: 1, flexDirection: 'row', backgroundColor: 'white', height: '100vh', width:'100vw'}}>
        <div style={{flex: 0.04, backgroundColor: '#1e90ff'}}>
        <img style={{width: 80, height: 80, borderRadius: 50}} src={require('../assets/images/user/zelo_user_default.jpg')} />
      </div>
      </div>
  )
}

export default Profile
