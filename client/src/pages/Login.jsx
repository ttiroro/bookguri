import React, { useState } from 'react'
import './style/Login.css'
import axios from 'axios';
import { Link } from 'react-router-dom'

const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) =>{
        e.preventDefault();
        await axios.post('/login', {
            username : username,
            password : password
        })
        .then(async(res)=>{
            window.location.href = '/';
        })
        .catch((err)=>{
            console.log(err)
        })
    };
    return (
        <div className='login'>
            <div className='login-head'>
                <img className='login-logo' src="/images/logo.svg" alt="logo" />
            </div>
            <form className='login-input' method='post' onSubmit={onSubmit}>
                <input className='login-id' onChange={(e)=>{ setUserName(e.target.value)}} 
                        type='text' name='username' placeholder='아이디를 입력하세요' />
                <input className='login-pass' onChange={(e)=>{ setPassword(e.target.value)}} 
                        type='password' name='password' placeholder='비밀번호를 입력하세요'/>
                <button type='submit'>로그인</button>
            </form>
            <Link className='login-register' to='/register'>회원가입</Link>
        </div>
    )
}

export default Login