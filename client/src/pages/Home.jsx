import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './style/home.css'
import Banner from '../components/home/Banner'
import HomeBest from '../components/home/HomeBest'

const Home = () => {

  const [bestSellerData, setBestSellerData] = useState([]);
  useEffect(() => {
    async function fetchdata() {
      const API_URL = '/ttb/api/ItemList.aspx?ttbkey=ttbdltjswjd2220957001&QueryType=Bestseller&MaxResults=30&start=1&SearchTarget=Book&Cover=Big&output=js&Version=20131101';
      const { data } = await axios.get(API_URL);
      setBestSellerData(data);
    }
    fetchdata();
  },[]);

  console.log(bestSellerData);

  return (
    <div>
        <Banner />
        <HomeBest bookData={bestSellerData}/>
    </div>
  )
}

export default Home