import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { HiOutlineChat } from "react-icons/hi";
import { MdOutlineContacts } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import "./navbar.css"
import Popup from '../Popup/Popup';

function Navbar() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    // console.log(currentUser)

    const ic_style = {
        margin: "20px 0",
        color: "#fff",
        fontSize: "26px"
    }
    const handShowThongTin = () => {
        setShowThongTin(!showThongTin)
    }
    const [showThongTin, setShowThongTin] = useState(false)
    return (
        <div className='nav_bar_container'>
            <div className='avatar_container' style={{ background: 'none', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                <button style={{ borderStyle: 'none', background: 'none' }}>
                    <img
                        onClick={() => handShowThongTin()}
                        className='logo' src={currentUser.pic} /> </button>
            </div>
            <div className='main_nav'>
                <div className='nav_above'>
                    <HiOutlineChat style={ic_style} />
                    <MdOutlineContacts style={{ ...ic_style, fontSize: "22px" }} />
                </div>
                <div className='nav_below'>
                    <AiOutlineSetting style={{ marginBottom: "20px", color: "#fff", fontSize: "22px" }} />
                </div>
            </div>
            {/* Thong tin nguoi dung */}

            {(<Popup trigger={showThongTin} setTrigger={setShowThongTin}>
                <div className='gr_popup_header'>Thông tin người dùng</div>
                <div className='gr_popup_body'>
                    
                    <div style={{ display: 'flex',height: 500, flex: 0.9, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flex: 0.4 }}>
                            <img
                                style={{ width: 200, height: 200, padding: 10 }}
                                className='image' src={require('../../assets/home/Avatar.png')} />
                        </div>
                        <div style={{ display: 'flex',flex:0.05, flexDirection: 'column', justifyContent: 'flex-start', float: 'left', fontWeight:'bold'}}>
                            <p>Thông tin cá nhân</p>
                        </div>
                        <div style={{ display: 'flex',width: 300, flex: 0.6, flexDirection: 'column', justifyContent: 'flex-start' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', margin: 10 }}>
                                <label style={{ flex: 0.2, fontSize: 18 }}>Tên: </label>
                                <p  style={{ marginLeft: 10,flex: 0.8, fontSize: 18 }}>Nguyen Tien Dat</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row',margin: 10 }}>
                                <label style={{ flex: 0.2, fontSize: 18 }}>email: </label>
                                <p style={{ marginLeft: 10,flex: 0.8,  fontSize: 18 }}>dat08082001@gmail.com</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row',margin: 10 }}>
                                <label style={{ flex: 0.2,  fontSize: 18 }}>status: </label>
                                <p style={{ marginLeft: 10,flex: 0.8,  fontSize: 18 }}>Online</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='gr_popup_footer'>
                    <button
                        onClick={() => handShowThongTin()}
                        style={{ backgroundColor: 'red', color: 'white', width: 160, height: 40, fontSize: 16, borderRadius: 5, fontWeight: 'bold' }}
                        className='btn_cancel'>Hủy</button>
                </div>
            </Popup>)}
        </div>
    )
}

export default Navbar