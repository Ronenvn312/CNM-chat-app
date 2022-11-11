import React from 'react'
import "./popup.css"

function Popup(props) {
  return (props.trigger) ? (
    <div className='popup_container'>
        <div className='popup-inner'>
            <button className='close-btn' onClick={() => props.setTrigger()}>x</button>
            {props.children}
        </div>
    </div>
  ) : ""
}

export default Popup