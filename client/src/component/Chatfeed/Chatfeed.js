import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import "./chatfeed.css"

function Chatfeed() {
  const { displayNameInChatFeed } = useContext(AppContext)
  return (
    <div className='chatfeed_container'>
      <div className='chatfeed_header'>
        {displayNameInChatFeed === "" ? "Live Chat" : displayNameInChatFeed}
      </div>
    </div>
  )
}

export default Chatfeed