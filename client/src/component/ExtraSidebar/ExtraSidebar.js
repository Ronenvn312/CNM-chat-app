import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import "./extrasidebar.css"

function ExtraSidebar({ currentGroup }) {
  console.log(currentGroup.users)
  const { displayNameInChatFeed } = useContext(AppContext)

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
            {displayNameInChatFeed === "" ? "" : (currentGroup.users).map((user) => {
              return (
                <li>
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
      </div>
    </div>
  )
}

export default ExtraSidebar