import React from 'react'
import { Link } from 'react-router-dom';
import { RiSettings5Fill } from "react-icons/ri";
import './style/header.css'
import $ from 'jquery'

const Header = () => {
  let count = 0;
  $('#nav-btn').on('click', ()=>{
    count++;
    count % 2 !== 0 ? $('#nav-list').addClass('show') : $('#nav-list').removeClass('show')
  })
  
  return (
    <header className='header'>
      <nav className='container'>
        <div className='head-inner'>

          <a href="/" className='logo'>
            <img src="/images/logo.svg" alt="logo" />
            <p>책거리</p>
          </a>

          <ul className='nav-list' id='nav-list'>
            <li><Link to='/bookguriinfo'>소개</Link></li>
            <li><Link to='/mybooks'>내 서재</Link></li>
            <li><Link to='/bestseller'>베스트셀러</Link></li>
          </ul>

          <div className='nav-user'>
            <a href="/" className='nav-user-info'>
              <img src="/images/user-df-img.svg" alt="user" />
              <p>user 님</p>
            </a>
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