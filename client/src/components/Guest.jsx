import React from 'react'
import { Link } from 'react-router-dom'
import './style/Guest.css'

const Guest = () => {
    return (
        <div className='guest-login'>
            <p className='guest-login-text'>로그인이 필요한 서비스입니다.</p>
            <Link to='/login' className='guest-login-btn'>
                <div>로그인 하러가기</div>
            </Link>
        </div>
    )
}

export default Guest