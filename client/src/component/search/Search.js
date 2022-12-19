import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import { BsPersonPlus, BsPeople, BsSearch } from "react-icons/bs";
import { AppContext } from '../../context/AppContext';
import Popup from '../Popup/Popup';
import "./search.css"
import { accessChatRoute, searchRoute } from '../../utils/APIRoutes'

function Search({ rerender, setRerender }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const [userPushToGroup, setUserPushToGroup] = useState([currentUser])
  const [showPopup, setShopPopup] = useState(false)
  const [showPopupSearchFriend, setShowPopupSearchFriend] = useState(false)
  const { usersOnServer, setSearchTerm, searchResults, searchTerm } = useContext(AppContext)
  const [valueGetFromInput, setValueGetFromInput] = useState("")
  console.log(valueGetFromInput)
  console.log(currentUser._id)
  console.log(searchTerm)
  console.log(searchResults.data)
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleShowPopup = () => {
    setShopPopup(!showPopup)
  }

  const handleCreateGroup = () => {
    axios.post("http://localhost:5000/api/chat/createGroupChat", {
      name: valueGetFromInput,
      current_user_id: currentUser._id,
      users: userPushToGroup
    })
    setRerender(!rerender)
    setUserPushToGroup([currentUser])
    setShopPopup(!showPopup)
  }
  // Search friend
  const handleShowPopupSearchFriend = () => {
    setShowPopupSearchFriend(!showPopupSearchFriend)
  }

  const handleAddFriend = (userId) => {
    axios.post(accessChatRoute, {
      user: currentUser,
      userId: userId
    }).then(res => console.log(res))
    setRerender(!rerender)
    setUserPushToGroup([currentUser])
    setShowPopupSearchFriend(!showPopupSearchFriend)
  }



  return (
    <div className='serch_container'>
      <div className='serch_left'>
        <BsSearch />
        <input placeholder='Tìm kiếm...' />
      </div>
      <div className='serch_right'>
        <BsPersonPlus style={{ cursor: "pointer" }} onClick={() => handleShowPopupSearchFriend()} />
        <BsPeople style={{ cursor: "pointer" }} onClick={() => handleShowPopup()} />
      </div>

      {(<Popup trigger={showPopup} setTrigger={setShopPopup}>
        <div className='gr_popup_header'>Tạo nhóm</div>
        <div className='gr_popup_body'>
          <input className='input_add_group' onChange={(e) => setValueGetFromInput(e.target.value)} name='chat_name' placeholder='Nhập tên nhóm...' />
          <div className='member_list_container'>
            <div className='member_list_container_left'>
              {showPopup ? usersOnServer.map((user) => {
                return (
                  <div key={user._id}>
                    <img className='popup_img' src={user.pic} />
                    <p>{user.username}</p>
                    <button onClick={() => setUserPushToGroup((prev) => [...prev, user])}>Add</button>
                  </div>
                )
              }) : ""}
            </div>
            <div className='member_list_container_right'>
              {userPushToGroup.map((user) => {
                return (<div className='detail' key={user._id}>
                  <img className='detail_img' src={user.pic} />
                  <p className='detail_name'>{user.username}</p>
                  <button className='detail_btn'>x</button>
                </div>)
              })}
            </div>
          </div>
        </div>
        <div className='gr_popup_footer'>
          <button className='btn_cancel' onClick={() => handleShowPopup(false)}>Hủy</button>
          <button className='btn' onClick={() => handleCreateGroup()}>Tạo nhóm</button>
        </div>
      </Popup>)}

      {/* Search friend */}
      {(<Popup trigger={showPopupSearchFriend} setTrigger={setShowPopupSearchFriend}>
        <div className='gr_popup_header'>Thêm bạn</div>
        <div className='gr_popup_body'>
          <input
            style={{width: 480, height: 40, borderStyle: 'groove'}}
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
          />
          <div style={{ flex: 0.9, flexDirection: 'column' }}>
            <ul>
              {
                searchResults.data ? searchResults.data.map((item) => {
                  return <div key={item._id} style={{ display: "flex", margin: 20, flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>

                    <div style={{display:"flex",alignItems:'center', flex: 0.8, flexDirection: "row" }}>
                      <img
                        style={{ flex: 0.05, width: 40, height: 40, borderRadius: 90 }}
                        src={require('../../assets/home/Avatar.png')} />
                      <h5 style={{marginLeft: 10, color: 'black', fontFamily: 'initial', fontSize: 16, fontWeight: 'bold'}}>{item.email}</h5>
                    </div>
                    <button 
                    onClick={() => handleAddFriend(item._id) }
                    style={{flex: 0.2,color: 'white', backgroundColor:"#0068ff", fontFamily: 'inherit', fontSize: 15, fontWeight: 'bold', width: 160, height: 40, borderRadius: 5 }}>Kết bạn</button>
                  </div>
                }) : ""
              }
            </ul>
          </div>
        </div>
        <div className='gr_popup_footer'>
          <button
          style={{backgroundColor: 'red', color: 'white', width: 160, height: 40, fontSize: 16, borderRadius: 5, fontWeight: 'bold'}}
          className='btn_cancel' onClick={() => handleShowPopupSearchFriend(false)}>Hủy</button>
        </div>
      </Popup>)}
    </div>
  )
}

export default Search