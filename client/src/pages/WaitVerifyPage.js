import React, { useContext } from 'react'
import waitLogo from '../assets/img_verify/undraw_Mail_re_duel.png'
import btnResend from '../assets/img_verify/button_resend.png'
import axios from 'axios'
import { resendEmailRoute } from '../utils/APIRoutes'
import { AppContext } from '../context/AppContext'
export default function WaitVerifyPage() {
    const { email } = useContext(AppContext)
    const resendEmail = () => {
        axios.put(resendEmailRoute, { email })
            .then(res => console.log(res))
    }
    return (
        <div className='container' style={{ display: "flex", flex: 1, width: '100vw', height: '100vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', flex: 0.5, width: '700px', height: '700px', flexDirection: 'column', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 2, borderBlockColor: 'black', borderStyle: 'double' }}>
                <img style={{ flex: 0.5, width: 300, height: 300, marginLeft: 30 }} src={waitLogo} alt='helu' />
                <h3 style={{ color: "15325E", fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}>Your email verification link has expired</h3>
                <button
                    onClick={() => resendEmail()}
                    style={{ backgroundColor: 'rgba(74, 13, 122, 1)', width: '300px', height: '60px', borderRadius: 20, color: 'white', fontSize: 20 }}> Resend verify email </button>
            </div>
        </div>
    )
}
