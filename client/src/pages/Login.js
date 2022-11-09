import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Logo from '../assets/alo.png'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

import { getUserRoute, loginRoute, registerRoute } from '../utils/APIRoutes';
import { AppContext } from '../context/AppContext';

// import GoogleButton from 'react-google-button';
// // import { firebase} from '../../firebase'
// import firebaseapp, { auth } from '../firebase';
// import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, sendEmailVerification, applyActionCode } from 'firebase/auth';


// const gGProvider = new GoogleAuthProvider(auth)
export default function Login() {
    const { setEmail } = useContext(AppContext)
    const navigate = useNavigate()
    const [values, setValues] = useState({
        email: "",
        password: "",
    })

    // const handleGgLogin = async () => {
    //     gGProvider.addScope('profile');
    //     gGProvider.addScope('email');
    //     const result = await signInWithPopup(auth, gGProvider)
    //     // The signed-in user info.

    //     const user = result.user;
    //     if (user != null) {
    //         console.log(user)
    //         const username = user.displayName;
    //         const email = user.email;
    //         const password = "123456";
    //         const credential = GoogleAuthProvider.credentialFromResult(result)
    //         const token = credential.accessToken;
    //         var url = loginRoute;
    //         // const user = axios.get(getUserRoute, {
    //         //     email
    //         // })
    //         // if(user) {
    //         //     console.log("User exited! Fail register")
    //         // }
    //         const { data } = await axios.post(registerRoute, {
    //             username,
    //             email,
    //             password
    //         })

            

    //         axios.post(url, data, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         }).then((res) => {
    //             console.log(res)

    //         }).catch((err) => {
    //             console.log(err)
    //         })
    //         navigate('/')
    //     } else {
    //         console.log("Erros acces token")
    //         navigate('/login')
    //     }


    // }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            console.log("in validation", loginRoute)
            const { password, email } = values
            const { data } = await axios.post(loginRoute, {
                email,
                password,
            })

            if (data.status === false) {
                toast.error(data.msg)
            }

            if (data.status === true) {    
                setEmail(email)
                navigate('/home')
                // console.log(data.user);
            }
        }
    }

    const handleValidation = () => {
        const { password, email } = values
        if (password === "") {
            console.log("Password and confirm password should be same")
            toast.error("Email và password là bắt buộc!", {
                pauseOnHover: true,
            })
            return false;
        } else if (email.length === "") {
            toast.error("Email và password là bắt buộc!", {
                pauseOnHover: true,
            })
            return false
        } else return true
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    return (
        <>
            <FormContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='brand'>
                        <img src={Logo} alt='' />
                    </div>
                    <input
                        type='text'
                        placeholder='Email đăng nhập:'
                        name='email'
                        onChange={e => handleChange(e)}
                        min="3"
                    />

                    <input
                        type='password'
                        placeholder='Mật khẩu:'
                        name='password'
                        onChange={e => handleChange(e)}
                    />

                    <button type='submit'>Đăng nhập</button>
                    <span>Chưa có tài khoản ? <Link to="/register">Đăng ký</Link></span>
                    {/* <div>
                        <GoogleButton onClick={() => handleGgLogin()} />
                    </div> */}
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`

height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
gap: 1rem;
align-items: center;
justify-content: center;
background-color: #fff;
.brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
        height: 3rem;
    }

    h1 {
        text-transform: uppercase;
    }
}

form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 10px;
    padding: 2rem 5rem;
    box-shadow: 1px 1px 6px rgb(0 0 0 / 40%);

    input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #0180c7;
        border-radius: 0.4rem;  
        width: 100%;
        font-size: 1rem;
        &:focus {
            border: 0.1rem solid #0180c7;
            outline: none; 
        }
    }

    button {
        background: #0180c7;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;  
        cursor: pointer;
        border-radius: .4rem;
        font-size: 1rem;
        text-transform : uppercase;
        &:hover {
            background: rgba(1, 128, 199, .8);
        }
    }

    span {
        text-transform: uppercase;
        font-weight: bold;
        font-size: .8rem;

        a {
            text-decoration: none;
        }
    }
}`;