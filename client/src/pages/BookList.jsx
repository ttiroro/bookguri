import React, { useRef } from 'react'
import './style/BookList.css'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from "react-icons/md";


const BookList = ({bestSellerData, newBookData}) => {

    // text 10글자 이상이면 숨기기
    function textLimit(str){
      let result = {};
      str.length > 13 ? result = str.substr(0, 13) + '...' : result = str
      return result;
    };

    // Best 더보기 버튼
    let countBest = 1;
    $(document).on('click', '.bl-best-down', ()=>{
      countBest += 1;
      //console.log('+', count);
      if(countBest < 3){
        $('.bl-best-list').css('height', `${countBest*630}px`);
      } else if( countBest === 3){
        $('.bl-best-list').css('height', `${3*630}px`);
        $('.bl-best-down').hide();
        $('.bl-best-up').show();
      }
      console.log(countBest);
    })
    $(document).on('click', '.bl-best-up', ()=>{
      countBest = 1;
        $('.bl-best-list').css('height', `630px`);
        $('.bl-best-up').hide();
        $('.bl-best-down').show();
    })

    // New 더보기 버튼
    let countNew = 1;
    $(document).on('click', '.bl-new-down', ()=>{
      countNew += 1;
      //console.log('+', count);
      if(countNew < 3){
        $('.bl-new-list').css('height', `${countNew*630}px`);
      } else if( countNew === 3){
        $('.bl-new-list').css('height', `${3*630}px`);
        $('.bl-new-down').hide();
        $('.bl-new-up').show();
      }
      console.log(countNew);
    })
    $(document).on('click', '.bl-new-up', ()=>{
      countNew = 1;
        $('.bl-new-list').css('height', `630px`);
        $('.bl-new-up').hide();
        $('.bl-new-down').show();
    })

    // 스크롤 이동 
    const bestTop = useRef();
    const bestEnd = useRef();  
    const bestMoveToStart = () => {bestTop.current.scrollIntoView({ behavior: 'smooth', block: 'start' });  };
    const bestMoveToEnd = () => {bestEnd.current.scrollIntoView({ behavior: 'smooth', block: 'start' });  };
    const newTop = useRef();
    const newEnd = useRef(); 
    const newMoveToStart = () => {newTop.current.scrollIntoView({ behavior: 'smooth', block: 'start' });  };
    const newMoveToEnd = () => {newEnd.current.scrollIntoView({ behavior: 'smooth', block: 'start' });  };

  return (
    <div className='book-list'>
      <div className='container'>
        <section className='bl-best'>
          <div className='bl-best-head' ref={bestEnd}>
            <h2 className='bl-best-text'>🏆 알라딘 베스트셀러 Top 30</h2>
            <a href='https://www.aladin.co.kr/shop/common/wbest.aspx?BranchType=1' className='bl-best-btn'>+ 알라딘에서 더보기</a>
          </div>
          <div className='bl-best-list'>
            {
              bestSellerData.item && 
                bestSellerData.item.map((item, index)=>(
                  <Link to={`/bookdetail/${item.isbn}`} className='bl-best-box' key={index}>
                    <div className='bl-best-cover'>
                        <img src={item.cover} alt="cover" />
                    </div>
                    <div className='bl-best-info'>
                        <p className='bl-best-title'>{textLimit(item.title)}</p>
                        <p className='bl-best-author'>{textLimit(item.author)}</p>
                    </div>
                  </Link>
                ))
              }
          </div>
          <div className='bl-btn' ref={bestTop}>
            <button type='button' className='bl-best-down' onClick={bestMoveToStart}> <MdKeyboardDoubleArrowDown /> </button>
            <button type='button' className='bl-best-up' onClick={bestMoveToEnd}> <MdKeyboardDoubleArrowUp /> </button>
          </div>
        </section>

        <section className='bl-new'>
          <div className='bl-new-head'  ref={newEnd}>
            <h2 className='bl-new-text'>📌 주목받는 신간 Top 30</h2>
            <a href='https://www.aladin.co.kr/shop/common/wnew.aspx?BranchType=1' type='button' className='bl-new-btn'>+ 알라딘에서 더보기</a>
          </div>
          <div className='bl-new-list'>
            {
              newBookData.item && 
                newBookData.item.map((item, index)=> (
                  <Link to={`/bookdetail/${item.isbn}`} className='bl-new-box' key={index} >
                    <div className='bl-new-cover'>
                        <img src={item.cover} alt="cover" />
                    </div>
                    <div className='bl-new-info'>
                        <p className='bl-new-title'>{textLimit(item.title)}</p>
                        <p className='bl-new-author'>{textLimit(item.author)}</p>
                    </div>
                  </Link>
                ))
            }
          </div>
          <div className='bl-btn' ref={newTop}>
            <button type='button' className='bl-new-down' onClick={newMoveToStart}> <MdKeyboardDoubleArrowDown /> </button>
            <button type='button' className='bl-new-up' onClick={newMoveToEnd}> <MdKeyboardDoubleArrowUp /> </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default BookList