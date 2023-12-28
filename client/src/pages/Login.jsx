import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';

const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    const onSubmit = async (e) =>{
        e.preventDefault();
        await axios.post('/login', {
            username : username,
            password : password
        })
        .then(async(res)=>{
            console.log(res)
            navigate('/mybooks')
        })
        .catch((err)=>{
            console.log(err)
        })
    };
    return (
        <form method='post' onSubmit={onSubmit}>
            <h2>로그인</h2>
            <input onChange={(e)=>{ setUserName(e.target.value)}} 
                    type='text' name='username' placeholder='아이디를 입력하세요' />
            <input onChange={(e)=>{ setPassword(e.target.value)}} 
                    type='password' name='password' placeholder='비밀번호를 입력하세요'/>
            <button type='submit'>로그인하기</button>
        </form>
    )
}

export default Login