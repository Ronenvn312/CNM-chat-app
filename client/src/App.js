import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Account from './pages/Account'
import { AuthProvider } from './context/AuthContext'
import VerifyEmail from './pages/VerifyEmail'
import Home from './pages/Home'
import WaitVerifyPage from './pages/WaitVerifyPage'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthProvider />}>
          {/* <Route path='/' element={<Chat />} /> */}
        </Route>
        <Route path='/verify-email/:token' element={<VerifyEmail />}/>
        <Route path='/wait-verify' element={<WaitVerifyPage />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/account' element={<Account />} />
        <Route path='/home' element={<Home />}/>

      </Routes>
    </BrowserRouter>
  )
}
