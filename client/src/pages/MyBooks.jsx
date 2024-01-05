import React from 'react'
import Guest from '../components/Guest';
import LoginMyBook from '../components/LoginMyBook'

const Mybooks = ({userData}) => {
  const isLogin = userData.username;

  return (
    <div>
      {
        !isLogin
        ? <Guest />
        : <LoginMyBook userData={userData}/>
      }
    </div>
  )
}

export default Mybooks