import React, { useState } from 'react'
import { BsPersonPlus, BsPeople, BsSearch } from "react-icons/bs";
import Popup from '../Popup/Popup';
import "./search.css"

function Search() {
  const [showPopup, setShopPopup] = useState(false)
  const handleShowPopup = () => {
    setShopPopup(!showPopup)
  }
  return (
    <div className='serch_container'>
      <div className='serch_left'>
        <BsSearch />
        <input placeholder='Tìm kiếm...' />
      </div>
      <div className='serch_right'>
        <BsPersonPlus style={{ cursor: "pointer" }} />
        <BsPeople style={{ cursor: "pointer" }} onClick={() => handleShowPopup()} />
      </div>

      <Popup trigger={showPopup} setTrigger={setShopPopup}>
        <div className='gr_popup_header'>Tạo nhóm</div>
        <div className='gr_popup_body'>
          <input className='input_add_group' placeholder='Nhập tên nhóm...'/>
        </div>
        <div className='gr_popup_footer'>
          <button className='btn'>Tạo nhóm</button>
        </div>
      </Popup>
    </div>
  )
}

export default Search