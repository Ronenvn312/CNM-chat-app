import React from 'react'


export default function Chat() {
  return (
    <div className='container' style={{display: 'flex',flex: 1, flexDirection: 'row', backgroundColor: 'white', height: '100vh', width:'100vw'}}>
      <div style={{flex: 0.04, backgroundColor: '#1e90ff'}}>
        <img style={{width: 80, height: 80, borderRadius: 50}} src={require('../assets/images/user/zelo_user_default.jpg')} />
      </div>
    </div>
  )
}
