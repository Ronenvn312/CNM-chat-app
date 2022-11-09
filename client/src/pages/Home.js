import React from 'react'
import { useContext } from "react"
import Navbar from '../component/navbar/Navbar'
import Sidebar from '../component/sidebar/Sidebar'
import { AppContext } from '../context/AppContext'

function Home() {
  const { currentUser } = useContext(AppContext)
  // console.log(`${currentUser.username} is login!`)
  // console.log(currentUser)
  return (
    <div className='home_container'>
      <Navbar />
      <Sidebar />
    </div>
  )
}

export default Home