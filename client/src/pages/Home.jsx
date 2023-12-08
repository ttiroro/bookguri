import React from 'react'
import './style/home.css'
import Banner from '../components/home/Banner'
import HomeBest from '../components/home/HomeBest'
import HomeNew from '../components/home/HomeNew'
import HomeRank from '../components/home/HomeRank'

const Home = ({bestSellerData, newBookData}) => {

  return (
    <div className='home'>
      <section className='sec01'>
        <Banner />
      </section>
      <section className='sec02 container'>
        <HomeBest bestSellerData={bestSellerData}/>
      </section>
      <section className='sec03 container'>
        <HomeNew newBookData={newBookData}/>
        <HomeRank className='sec03-right'/>
      </section>
    </div>
  )
}

export default Home