import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { verifiEmailRoute } from '../utils/APIRoutes'
import { useNavigate, useParams, useRoutes } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function VerifyEmail() {
  const navigate = useNavigate()
  const { token } = useParams()
  const [tokenshow, setToken] = useState("");
  const { setEmail, email } = useContext(AppContext)
  const { data, setData } = useState({})
  useEffect(() => {
    setToken(token)
    console.log(tokenshow)
    if (tokenshow !== "") {
      console.log(token)
      axios.put(verifiEmailRoute, {token: token })
        .then((res) => {
          console.log(res.data.status)
          console.log(res.data.user)
          if (res.data.status) {
            setEmail(res.data.user.email)
            navigate('/home')
          } else {
            navigate('/login')
          }
        })
    } 
  }, [tokenshow])

  return (
    <div className='container' style={{ display: "flex", flex: 1, width: '100vw', height: '100vh' }}>
      <h1 style={{ display: 'flex', flex: 1 }}> WAITING FOR VERIFY EMAIL ACCOUNT: {email} </h1>
    </div>

  )
}
