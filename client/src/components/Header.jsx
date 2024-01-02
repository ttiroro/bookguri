import React, { useState } from 'react'
import { Link  } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import {RiSettings5Fill} from "react-icons/ri"
import './style/header.css'
import $ from 'jquery'

const Header = ({userData}) => {
  let count = 1;
  $('.nav-user-info').on('click', ()=>{
    count += 1;
    count % 2 === 0 ? $('.nav-user-box').css('visibility', 'visible') : $('.nav-user-box').css('visibility', 'hidden');
  })

  // 검색 키워드 저장해서 넘기는 부분
  const [searchbook, setSearchBook] = useState('');
  const changeHandler = (e) => {
    setSearchBook(e.target.value);
  }
  console.log(searchbook);

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
            <li><Link to='/booklist'>책 구경</Link></li>
          </ul>

          <div className='nav-search'>
            <form className='nav-search-inner' action={`/booksearch/${searchbook}`}>
              <input type="text"  placeholder='도서를 검색하세요' onChange={changeHandler}/>
              <button type='submit' className='nav-search-btn'>
                <FiSearch />  
              </button>
            </form>
          </div>

          <div className='nav-user'>
            {
              !userData.username ? 
              <Link to='/login'>로그인</Link>  
              : 
                <div className='nav-user-in'>
                  <img src="/images/profil.svg" alt="user" />
                  <button type='button' className='nav-user-info'>
                    <p>{userData.subname}님</p>
                  </button>
                  <div className='nav-user-box'>
                    <p>{userData.subname}({userData.username})</p>
                    <p>읽은 책 수</p>
                    <p>로그아웃</p>
                  </div>
                  <button type='button' id='nav-btn' className='nav-btn'>
                    <Link to='/setting'>
                      <RiSettings5Fill className='nav-settings'/>
                    </Link>
                  </button>
                </div>
                
            }
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header