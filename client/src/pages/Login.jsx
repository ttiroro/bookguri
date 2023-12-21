import React from 'react'

const Login = () => {
    return (
        <form action='/login' method='post'>
            <h2>책거리에 오신걸 환영합니다!</h2>
            <input name='userId' type='text' placeholder='아이디를 입력하세요' />
            <input name='userPassword' type='password' placeholder='비밀번호를 입력하세요'/>
            <button type='submit'>회원가입</button>
        </form>
    )
}

export default Login