import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Logo from '../assets/alo.png'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { registerRoute } from '../utils/APIRoutes';

export default function Register() {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            console.log("in validation", registerRoute)
            const { password, username, email } = values
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password,
            })

            if(data.status === false) {
                toast.error(data.msg)
            }
    
            if(data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                navigate('/')
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
