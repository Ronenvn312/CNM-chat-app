import React from 'react'
import { useContext } from "react"
import { AppContext } from '../context/AppContext'

function Home() {
  const { currentUser } = useContext(AppContext)
  console.log(`${currentUser.username} is login!`)
  console.log(currentUser)
  return (
    <div>
      <img src={currentUser.pic} alt="skdksj" />
      <h3>{currentUser.username}</h3>
    </div>
  )
}

export default Home