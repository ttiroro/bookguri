import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';

const Register = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const onSubmit = async (e) =>{
        e.preventDefault();
        await axios.post('http://localhost:8080/register', {
            username : username,
            password : password
        })
        .then(async(res)=>{
            console.log(res)
            navigate('/login')
        })
        .catch((err)=>{
            console.log(err)
        })
    };

    return (
        <form method='post' onSubmit={onSubmit}>
            <h2>회원가입</h2>
            <input onChange={(e)=>{ setUserName(e.target.value)}} type='text' placeholder='아이디를 입력하세요' />
            <input onChange={(e)=>{ setPassword(e.target.value)}} type='password' placeholder='비밀번호를 입력하세요'/>
            <button type='submit'>회원가입</button>
        </form>
    )
}

export default Register