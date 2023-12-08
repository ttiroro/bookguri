import React from 'react'
import { Link } from 'react-router-dom';
import { RiSettings5Fill } from "react-icons/ri";
import './style/header.css'
import $ from 'jquery'

const Header = () => {
  let count = 1;
  $('.nav-user-info').on('click', ()=>{
    count += 1;
    count % 2 === 0 ? $('.nav-user-box').css('visibility', 'visible') : $('.nav-user-box').css('visibility', 'hidden');
  })
  
  return (
    <header className='header'>
      <nav className='container'>
        <div className='head-inner'>
          <a href="/" className='logo'>
            <img src="/images/logo.svg" alt="logo" />
          </a>

          <ul className='nav-list' id='nav-list'>
            <li><Link to='/bookguriinfo'>소개</Link></li>
            <li><Link to='/mybooks'>내 서재</Link></li>
            <li><Link to='/bestseller'>베스트셀러</Link></li>
          </ul>

          <div className='nav-user'>
            <img src="/images/profil.svg" alt="user" />
            <button type='button' className='nav-user-info'>
              <p>user 님</p>
            </button>
            <div className='nav-user-box'>
              <p>user name</p>
              <p>읽은 책 수</p>
              <p>로그아웃</p>
            </div>
            <button type='button' id='nav-btn' className='nav-btn'>
              <Link to='/setting'>
                <RiSettings5Fill className='nav-settings'/>
              </Link>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header