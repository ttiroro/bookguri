import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import './style/Banner.css'

const Banner = () => {
  return (
    <section className='home-banner'>
        <div className='banner-box'>
            <IoIosArrowBack className='banner-back'/>
            <div className='banner-inner container'>
                <div className='banner-info'>
                    <p className='banner-title'>나의 마음문장을 기록하고,<br/> 다른사람들과 공유해보세요</p>
                    <button type='button' className='banner-btn'>
                    <Link to='/mybooks'>내 마음문장 보러가기</Link>
                    </button>
                </div>
                <img className='banner-img' src="/images/Speach_Bubble_5_.svg" alt="bubble" />
            </div>
            <IoIosArrowForward className='banner-pre'/>
        </div>
        <div className='banner-page'>
            <button className='page-one' type='button'></button>
            <button className='page-one' type='button'></button>
            <button className='page-one' type='button'></button>
        </div>
    </section>
  )
}

export default Banner