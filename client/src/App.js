import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Account from './pages/Account'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthProvider />}>
          <Route path='/' element={<Chat />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/account' element={<Account />} />
        <Route path='/home' element={<Home />}/>

      </Routes>
    </BrowserRouter>
  )
}
