import React from 'react'
import "./popup.css"
import { motion } from "framer-motion"

function Popup(props) {
  return (props.trigger) ? (
    <div className='popup_container'>
        <motion.div animate={{ scale: 1 }} initial={{ scale: 0 }} className='popup-inner'>
            <button className='close-btn' onClick={() => props.setTrigger(!props.trigger)}>x</button>
            {props.children}
        </motion.div>
    </div>
  ) : ""
}

export default Popup