import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';

const Register = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [subname, setSubName] = useState("");

    const navigate = useNavigate();

    const onSubmit = async (e) =>{
        e.preventDefault();
        await axios.post('/register', {
            username : username,
            password : password,
            subname : subname
        })
        .then(async(res)=>{
            //console.log(res)
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
            <input onChange={(e)=>{ setSubName(e.target.value)}} type='text' placeholder='별명을 입력하세요'/>
            <button type='submit'>회원가입</button>
        </form>
    )
}

export default Register