import React from 'react'
import './style/home.css'
import Header from '../components/Header'
import Banner from '../components/home/Banner'
import HomeBest from '../components/home/HomeBest'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Header />
        <Banner />
        <HomeBest />
        <Footer />
    </div>
  )
}

export default Home