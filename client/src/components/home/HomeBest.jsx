import React from 'react'
import './style/HomeBest.css'
import { Link } from 'react-router-dom'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import $ from 'jquery'

const HomeBest = ({bookData}) => {

    console.log(bookData)

    // text 10글자 이상이면 숨기기
    function textLimit(str){
        let result = {};
        str.length > 15 ? result = str.substr(0, 15) + '...' : result = str
        return result;
    };

    // 슬라이더 만들기
    let current = 0;
    $('.hb-next').on('click', ()=>{
        current -= 270;
        console.log('next', current);
        if(-1080 <= current){
            $('.hb-list').css('transform', `translateX(${current}px)`)
        } else if(current < -1080) {
            current = -1080;
            $('.hb-list').css('transform', `translateX(-1080px)`)
        }
    })

    $('.hb-back').on('click', ()=>{
        current += 270;
        //console.log('back', current);
        if(current <= 0){
            $('.hb-list').css('transform', `translateX(${current}px)`)
        } else if(0 < current) {
            current = -270;
            $('.hb-list').css('transform', `translateX(0px)`)
        }
    })

    return (
        <section className='container'>
            <div className='home-bestseller'>
                <div className='hb-left'>
                    <div>
                        <h2 className='hb-title'>베스트 셀러</h2>
                        <p className='hb-text'>이 주의 베스트셀러를 만나보세요!</p>
                        <button type='button' className='hb-btn'>
                            <Link to='/bestseller'>더 보러 가기</Link>
                        </button>
                    </div>
                    <p className='hb-aladin'>도서 DB 제공 : 알라딘 인터넷서점</p>
                </div>

                <div className='hb-list-out'>
                    <div className='hb-list'>
                        { bookData.item &&
                        bookData.item.map((item, index)=> index < 7 && (
                                <Link to="#" className='hb-book' key={index}>
                                    <div className='hb-book-rank'>
                                        <p className='hb-book-rankText'>{item.bestRank}</p>
                                    </div>
                                    <img src={item.cover} alt="cover" />
                                    <div className='hb-book-info'>
                                        <p className='hb-book-title'>{textLimit(item.title)}</p>
                                        <p className='hb-book-author'>{textLimit(item.author)}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <div className='hb-arrow'>
                    <button type='button' className='hb-back'>
                        <IoIosArrowBack /> 
                    </button>
                    <button type='button' className='hb-next'>
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default HomeBest