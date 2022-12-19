import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Popup from "../Popup/Popup"
import "./extrasidebar.css"

function ExtraSidebar({ currentGroup, setRerender }) {
  const { displayNameInChatFeed } = useContext(AppContext)
  const [showPopup, setShowPopup] = useState(false)
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const { showWelcome, setShowWelcome } = useContext(AppContext)

  const handleShowPopup = () => {
    setShowPopup(!showPopup)
  }

  const handleDeleteGroup = () => {
    axios.delete("http://localhost:5000/api/chat/group", {
      params : {
        chat_id: currentGroup._id
      }
    })
    setShowPopup(false)
    setRerender(true)
    setShowWelcome(true)
  }

  return (
    <div className='extra_sidebar_container'>
      <div className='ex_sidebar_header'>
        <h1>Thông tin</h1>
        {displayNameInChatFeed === "" ? "" : <div className='info_group'>
          <img src={currentGroup.imageGroup} alt=""
            style={{ width: "45px", height: "45px", borderRadius: "50%", objectFit: "scale-down" }} />
          <span>{currentGroup.chatName}</span>
        </div>}

        <div className='groupMember'>
          {displayNameInChatFeed === "" ? "" : <h1>Thành viên nhóm</h1>}
          <ul>
            {displayNameInChatFeed === "" ? "" : (currentGroup.users).map((user, index) => {
              return (
                <li key={index}>
                  <div className='info_extra_container'>
                    <img src={user.pic} alt="Please Login!" />
                    <div className={user._id === currentGroup.groupAdmin ? 'admin_key' : "not_admin_key"}></div>
                    <h3>{user.username}</h3>
                  </div>
                  <button className='btn_make_friend'>Kết bạn</button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className='extra_sidebar_footer'>
          <button className={currentGroup.groupAdmin === currentUser._id ? "btn_delete_group" : "not_admin"} onClick={() => handleShowPopup()}>Giải tán nhóm</button>
        </div>

        <Popup trigger={showPopup} setTrigger={setShowPopup}>
          <div className='delete_popup_header'>Giải tán nhóm</div>
          <div className='delete_popup_body'>
            Mời tất cả mọi người ra khỏi nhóm và xóa tin nhắn? Nhóm đã giải tán "Không Thể" khôi phục. 
          </div>
          <div className='delete_popup_footer'>
            <button className='negative_btn' onClick={() => setShowPopup(false)}>Không</button>
            <button className='positive_btn' onClick={() => handleDeleteGroup()}>Giải tán nhóm</button>
          </div>
        </Popup>
      </div>

    </div>
  )
}

export default ExtraSidebar