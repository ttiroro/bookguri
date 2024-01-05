import React from 'react'
import { Link } from 'react-router-dom'
import './style/MyBooks.css'

const Mybooks = ({userData}) => {

  return (
    <div className='container mybooks'>
      <section className='sec01'>
        {
          !userData.username
          ?
            <div className='mb-login'>
              <p className='mb-login-text'>로그인이 필요한 서비스입니다.</p>
              <Link to='/login' className='mb-login-btn'>
                <div>로그인 하러가기</div>
              </Link>
            </div>
          : 
            <p>{userData.subname}님의 서재</p>
        }

        <div>
          <img src="" alt="" />
        </div>
        
      </section>
    </div>
  )
}

export default Mybooks