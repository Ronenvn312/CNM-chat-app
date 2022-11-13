import React from 'react'
import { useContext } from "react"
import Chatfeed from '../component/Chatfeed/Chatfeed'
import Navbar from '../component/navbar/Navbar'
import Sidebar from '../component/sidebar/Sidebar'
import { AppContext } from '../context/AppContext'

function Home() {
  return (
    <div className='home_container'>
      <Navbar />
      <Sidebar />
      <Chatfeed />
    </div>
  )
}

export default Home