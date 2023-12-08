import React from 'react'
import { Link } from 'react-router-dom';
import './style/HomeNew.css'

const HomeNew = ({newBookData}) => {
  console.log(newBookData);

  // description 글자 수 숨기기
  function descLimit(str){
    let result = {};
    str.length > 150 ? result = str.substr(0, 150) + '...' : result = str
    return result;
  };

  function titleLimit(str){
    let result = {};
    str.length > 30 ? result = str.substr(0, 30) + '...' : result = str
    return result;
  };

  return (
    <div className='home-new'>
      <div className='hn-head'>
        <h2 className='hn-title'>주목 할 만한 신간</h2>
        <button type='button' className='hn-btn'>
            <Link to='/newbooks'>+</Link>
        </button>
      </div>
      <div className='hn-list'>
          { newBookData.item &&
            newBookData.item.map((item,index)=> index < 10 && (
            <Link className='hn-book' key={index}>
              <div className='hn-book-cover'>
                <img src={item.cover} alt={item.title} />
              </div>
              <div className='hn-book-info'>
                <div>
                  <p className='hn-book-title'>{titleLimit(item.title)}</p>
                  <p className='hn-book-author'>{titleLimit(item.author)}</p>
                </div>
                <p className='hn-book-desc'>{descLimit(item.description)}</p>
              </div>
            </Link>
            ))
          }    
      </div>
      <p className='hn-aladin'>도서 DB 제공 : 알라딘 인터넷서점</p>
    </div>
  )
}

export default HomeNew