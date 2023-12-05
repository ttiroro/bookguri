import React from 'react'
import './style/home.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Home = () => {
  return (
    <div>
        <Header />
        <section className='home-banner'>
            <div className='banner-inner'>
                <IoIosArrowBack className='banner-back'/>
                <img src="/images/banner-inner.svg" alt="banner01" />
                <IoIosArrowForward className='banner-pre'/>
            </div>
        </section>
        <Footer />
    </div>
  )
}

export default Home