import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import "./sidebar.css"
import { AppContext } from '../../context/AppContext'
import Search from '../search/Search'

function Sidebar() {
  const { currentUser } = useContext(AppContext)
  const [listGroupChat, setListGroupChat] = useState([])
  // console.log(currentUser)
  console.log(listGroupChat)
  function getAllChatGroup() {
    axios.get("http://localhost:5000/api/chat/fetchChats", {
      params: {
        _id: currentUser._id
      }
    })
      .then((res) => setListGroupChat(res.data))
  }
  useEffect(() => {
    getAllChatGroup()
  }, [currentUser])
  return (
    <div className='side_bar_container'>
      <Search />
      <div>
        <ul>
          {listGroupChat.map((group, index) => {
            return (
              <li key={index} className='chat_group_item'>
                <img src={group.imageGroup} />
                <div>
                  <h3>{group.chatName}</h3>
                  <span>{group.users.length} thành viên</span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar