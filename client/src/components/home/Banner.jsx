import React from 'react'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import './style/Banner.css'
import $ from 'jquery'

const Banner = () => {
    const bannerImg = ['banner01', 'banner02', 'banner03'];

    // arrow, pagecircle
    let current = 0;
    let count = 1;
    $('.banner-next').on('click', ()=>{
        current -= 1920;
        count += 1;
        if(count === 2){
            $('.page-one').css('opacity', '0.5')
            $('.page-two').css('opacity', '1')
            $('.page-thr').css('opacity', '0.5')
        } else {
            $('.page-one').css('opacity', '0.5')
            $('.page-two').css('opacity', '0.5')
            $('.page-thr').css('opacity', '1')
        }

        if(-3840 <= current){
            $('.banner-list').css('transform', `translateX(${current}px)`);
        } else if(current < -3840) {
            current = -3840;
            $('.banner-list').css('transform', `translateX(-3840px)`)
        }
    })

    $('.banner-back').on('click', ()=>{
        current += 1920;
        count -= 1;
        if(count === 2){
            $('.page-one').css('opacity', '0.5')
            $('.page-two').css('opacity', '1')
            $('.page-thr').css('opacity', '0.5')
        } else {
            $('.page-one').css('opacity', '1')
            $('.page-two').css('opacity', '0.5')
            $('.page-thr').css('opacity', '0.5')
        }
        if(current <= 0){
            $('.banner-list').css('transform', `translateX(${current}px)`)
        } else if(0 < current) {
            current = -1920;
            $('.banner-list').css('transform', `translateX(0px)`)
        }
    })

    // page-circle
    return (
        <div className='home-banner'>
            <div className='banner-list'>
                {
                    bannerImg.map((item, i)=>(
                        <div className='banner-img' key={i}>
                            <img src={`/images/${item}.png`} alt={item} />
                        </div>
                    ))
                }
            </div>
            <button type='button' className='banner-back'><IoIosArrowBack/></button>
            <button type='button' className='banner-next'><IoIosArrowForward/></button>
            <div className='banner-page'>
                <button className='page-one' type='button'></button>
                <button className='page-two' type='button'></button>
                <button className='page-thr' type='button'></button>
            </div>
        </div>
    )
}

export default Banner