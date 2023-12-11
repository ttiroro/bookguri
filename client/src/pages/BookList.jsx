import React from 'react'
import './style/BookList.css'
import { Link } from 'react-router-dom'
import $ from 'jquery'


const BookList = ({bestSellerData, newBookData}) => {

    // text 10글자 이상이면 숨기기
    function textLimit(str){
      let result = {};
      str.length > 13 ? result = str.substr(0, 13) + '...' : result = str
      return result;
    };

    let count = 1;
    console.log(count);
    $('.bl-best-down').on('click', ()=>{
      count += 1;
      console.log('+', count);
      if(count === 3){
        $('.bl-best-list').css('height', `${count*630}px`);
        $('.bl-best-down').hide();
        $('.bl-best-up').show();
      } else if( count < 4){
        $('.bl-best-list').css('height', `${count*630}px`);
      }
    })

    // 더보기 숨기기 
    $('.bl-best-up').on('click', ()=>{
      count -= 1;
      console.log('-', count);
      if(count === 1){
        $('.bl-best-list').css('height', `630px`);
        $('.bl-best-up').hide();
        $('.bl-best-down').show();
      } else if( count < 4){
        $('.bl-best-list').css('height', `${count*630}px`);
      }
    })

  return (
    <div className='book-list'>
      <div className='container'>
        <section className='bl-best'>
          <div className='bl-best-head'>
            <h2 className='bl-best-text'>🏆 알라딘 베스트셀러 Top 30</h2>
            <a href='https://www.aladin.co.kr/shop/common/wbest.aspx?BranchType=1' className='bl-best-btn'>+ 알라딘에서 더보기</a>
          </div>
          <div className='bl-best-list'>
            {
              bestSellerData.item && 
                bestSellerData.item.map((item, index)=>(
                  <Link to={`/bookdetail/${item.isbn}`} className='bl-best-box' key={index} >
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
          <button type='button' className='bl-best-down'> + </button>
          <button type='button' className='bl-best-up'> - </button>
        </section>

        <section className='bl-new'>
          <div className='bl-new-head'>
            <h2 className='bl-new-text'>📌 주목받는 신간 Top 30</h2>
            <button type='button' className='bl-new-btn'>+ 알라딘에서 더보기</button>
          </div>
          <div className='bl-new-list'>
            {
              newBookData.item && 
                newBookData.item.map((item, index)=> index <10 && (
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
        </section>
      </div>
    </div>
  )
}

export default BookList