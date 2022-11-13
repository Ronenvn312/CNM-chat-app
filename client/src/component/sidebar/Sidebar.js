import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import "./sidebar.css"
import { AppContext } from '../../context/AppContext'
import Search from '../search/Search'
import ExtraSidebar from '../ExtraSidebar/ExtraSidebar'

const Axios = axios.create({
  baseURL: "http://localhost:5000/api/chat"
})

function Sidebar() {
  const { currentUser, setDisplayNameInChatFeed } = useContext(AppContext)
  const [listGroupChat, setListGroupChat] = useState([])
  const [currentGroup, setCurrentGroup] = useState({})

  function getAllChatGroup() {
    Axios.get("/group", {
      params: {
        user_id: currentUser._id
      }
    })
      .then((res) => setListGroupChat(res.data))
  }
  useEffect(() => {
    getAllChatGroup()
  }, [currentUser])

  return (
    <>
      <div className='side_bar_container'>
        <Search />
        <div>
          <ul>
            {listGroupChat.map((group, index) => {
              return (
                <li key={index} className='chat_group_item'
                  onClick={() => {
                    setCurrentGroup(group)
                    setDisplayNameInChatFeed(group.chatName)
                  }}>
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
      <ExtraSidebar currentGroup={currentGroup}/>
    </>
  )
}

export default Sidebar