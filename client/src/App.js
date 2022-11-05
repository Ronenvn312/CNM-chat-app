import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'
import Profile from './pages/Profile'
import VerifyEmail from './pages/VerifyEmail'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
export default function App() {


  return (
    <Router>
      <Routes>

        <Route path='/' element={<AuthProvider />}>
          <Route path='/' element={<Profile />} />
          <Route path='/verify-email' element={<VerifyEmail />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        

      </Routes>
    </Router>
  )
}
