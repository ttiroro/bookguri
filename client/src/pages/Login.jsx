import React, { useState } from 'react'
import axios from 'axios';

const Login = () => {
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const onSubmit = async (e) =>{
        e.preventDefault();
        await axios.post('http://localhost:8080/login', {
            userId : userId,
            userPassword : userPassword
        })
        .then(async(res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    };
    return (
        <form method='post' onSubmit={onSubmit}>
            <h2>로그인</h2>
            <input onChange={(e)=>{ setUserId(e.target.value)}} 
                    type='text' name='userId' placeholder='아이디를 입력하세요' />
            <input onChange={(e)=>{ setUserPassword(e.target.value)}} 
                    type='password' name='userPassword' placeholder='비밀번호를 입력하세요'/>
            <button type='submit'>로그인하기</button>
        </form>
    )
}

export default Login