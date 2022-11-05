import React, { useEffect } from 'react'
import axios from 'axios'
import { verifiEmailRoute } from '../utils/APIRoutes'
import { useNavigate } from 'react-router-dom'
export default function VerifyEmail (req) {
    const navigate = useNavigate()
    useEffect(() => {
        const token = req.query.token
        const result = axios.get(verifiEmailRoute, {token})
        if(result.status && result.user.isVerifed) {
            navigate('/')
        }
    })

  return (
    <div className='container' style={{display:"flex", flex: 1, width: '100vw', height:'100vh'}}>
        <h1 style={{display: 'flex' , flex: 1}}>VERIFIED ACCOUNT</h1>
    </div>

  )
}
