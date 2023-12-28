import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Mybooks = () => {

  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchdata() {
    const API_URL = '/mybooks';
    const { data } = await axios.get(API_URL);
    setUserData(data);
    }
    fetchdata();
  },[]);
  console.log(userData);

  return (
    <div>
      <h2>{userData.subname}({userData.username}) 님의 서재입니다</h2>
    </div>
  )
}

export default Mybooks