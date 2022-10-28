import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { GoogleButton } from 'react-google-button';
import styled from 'styled-components'
import Logo from '../assets/alo.png'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { loginRoute, registerRoute } from '../utils/APIRoutes';
import { ActionCodeOperation, createUserWithEmailAndPassword, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';
import firebaseapp, { auth } from '../firebase';
import { sendEmailVerification } from 'firebase/auth';
// import { UserAuth } from '../context/AuthContext';
export default function Register() {
    const navigate = useNavigate()
    const [data, setData] = useState(false);
    const [user, setUser] = useState({})
    // const { googleSignIn, user } = UserAuth();
    // const handleGoogleSignIn = async () => {
    //     try {
    //       await googleSignIn();
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    //   useEffect(() => {
    //     if (user != null) {
    //       navigate('/account');
    //     }
    //   }, [user]);

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    // const verifyEmail = async (auth, email) => {
    //     const actionCodeSettings = {
    //         // URL you want to redirect back to. The domain (www.example.com) for this
    //         // URL must be in the authorized domains list in the Firebase Console.
    //         url: 'https://www.google.com/',
    //         // This must be true.
    //         handleCodeInApp: true,
    //         dynamicLinkDomain: 'http://localhost:3000/'
    //     };
    //     await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    //         .then(() => {
    //             // The link was successfully sent. Inform the user.
    //             // Save the email locally so you don't need to ask the user for it again
    //             // if they open the link on the same device.
    //             window.localStorage.setItem('emailForSignIn', email);
    //             // ...
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             console.log(errorCode)
    //             console.log(errorMessage)
    //         });
    //     if (isSignInWithEmailLink(auth, window.location.href)) {
    //         await signInWithEmailLink(auth, email , window.location.href);
    //     }

    // }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            console.log("in validation", registerRoute)
            const { password, username, email } = values

            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // var url = registerRoute;
                    // let data = {
                    //     requestType: "VERIFY_EMAIL",
                    //     idToken: userCredential.accessToken
                    // }
                    // verifyEmail(auth, email)
                    // userCredential.sendEmailVerification();
                    // auth.sendEmailVerification()
                    console.log(userCredential.user.email)

                    const datast = axios.post(registerRoute, {
                        username,
                        email,
                        password,
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((res) => {
                        console.log(res)

                    }).catch((err) => {
                        console.log(err)
                    })
                    setData(datast)
                })
                .catch((error) => {
                    console.log(error)
                })

            if (data.status === false) {
                toast.error(data.msg)
            }

            if (data.status === true) {
                console.log(data.user)
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                navigate('/login')
            }
        }
    }

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values
        if (password !== confirmPassword) {
            console.log("Password and confirm password shold be same")
            toast.error("Mật khẩu không trùng khớp", {
                pauseOnHover: true,
            })
            return false;
        } else if (username.length < 3) {
            toast.error("Tên đăng nhập phải có ít nhất 3 ký tự", {
                pauseOnHover: true,
            })
            return false
        } else if (password.length < 8) {
            toast.error("Mật phải có ít nhất 8 ký tự", {
                pauseOnHover: true,
            })
            return false
        } else if (email === "") {
            toast.error("Email không được để trống", {
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
                        placeholder='Tên đăng nhập:'
                        name='username'
                        onChange={e => handleChange(e)}
                    />

                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        onChange={e => handleChange(e)}
                    />

                    <input
                        type='password'
                        placeholder='Mật khẩu'
                        name='password'
                        onChange={e => handleChange(e)}
                    />

                    <input
                        type='password'
                        placeholder='Nhập lại mật khẩu:'
                        name='confirmPassword'
                        onChange={e => handleChange(e)}
                    />

                    <button type='submit'>Đăng ký</button>
                    <span>Đã có tài khoản ? <Link to="/login">Login</Link></span>

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
    }
`;
