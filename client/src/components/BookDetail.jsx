import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './style/BookDetail.css';
import { AiFillHeart } from 'react-icons/ai';

const BookDetail = () => {

    let {isbn} = useParams();
    const [bookData, setBookData] = useState({});
    useEffect(() => {
        async function fetchdata() {
        const API_URL = `/ttb/api/ItemLookUp.aspx?ttbkey=ttbdltjswjd2220957001&itemIdType=ISBN&ItemId=${isbn}&output=js&Version=20131101&Cover=Big&OptResult=ebookList,usedList,reviewList`;
        const { data } = await axios.get(API_URL);
        setBookData(data);
        }
        fetchdata();
    }, [isbn]);
    console.log(bookData.item);

    // 판매가 콤마 찍는 함수
    function dotPrice(num) {
        let price = num.toLocaleString('ko-KR');
        return price;
    }

    return (
        <div className='book-detail'>
            <div className='bd-sec1'>

                { bookData.item && 
                <div className='container bd-book-box'>
                    <p className='bd-book-title'>{bookData.item[0].title}</p>

                    <div className='bd-book-inner'>
                        <div className='bd-book-cover'>
                            <img src={bookData.item[0].cover} alt="cover"/>
                        </div>

                        <div className='bd-book-text'>
                            <p className='bd-book-writer'>지은이 | {bookData.item[0].author}</p>
                            <p className='bd-book-publisher'>출판사 | {bookData.item[0].publisher}</p>
                            <p className='bd-book-date'>출판일  |  {bookData.item[0].pubDate}</p>
                            <p className='bd-book-page'>페이지  |  {bookData.item[0].subInfo.itemPage} p</p>
                            <p className='bd-book-isbn'>ISBN  |  {bookData.item[0].isbn13}</p>
                            <div className='bd-book-category'>
                            <p>주제분류  |  {bookData.item[0].categoryName}</p>
                            </div>
                            <p className='bd-book-rank'>리뷰 평점 | {bookData.item[0].customerReviewRank}점</p>
                            <div className='bd-book-price'>
                                <p>판매가 | {dotPrice(bookData.item[0].priceSales)}원</p>
                                <div className='bd-book-btn'>
                                    <a href={bookData.item[0].link}>구매하러 가기</a>
                                    <a href="!#">내 서재에 담기</a>
                                    <a href="!#"><AiFillHeart /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }

            </div>

            <div className='container'>
                { bookData.item &&
                <div className='bd-sec2'>
                    <div className='bd-desc'>
                    <p className='book-desc-title'>책 소개</p>
                    <p className='book-desc-text'>{bookData.item[0].description}</p>
                    </div>
                </div>
                }
                {/* <div className='bd-sec3'>
                    <div className='bd-bookmark'>
                    <p className='bd-bookmark-title'>목차</p>
                    <div className='bd-bookmark-contents'>
                        <p>1장. 작가의 말</p>
                        <p>2장. 블라블라</p>
                        <p>3장. 솰라솰라</p>
                    </div>
                    </div>
                </div> */}

                <div className='bd-sec4'>
                    <div className='bd-heart-list'>
                        <p className='bd-heart-title'>다른 유저의 마음 문장</p>
                        <div className='bd-heart-box'>
                            <p>그 사람 변호해 주는 말은 나중에 하세요. 지금은 충분히 더 화내도 돼요. 그동안 얼마나 화를 삼....</p>
                            <p>p.260</p>
                            <p>script by.책읽는 기러기</p>
                        </div>
                        <div className='bd-heart-box'>
                            <p>그 사람 변호해 주는 말은 나중에 하세요. 지금은 충분히 더 화내도 돼요. 그동안 얼마나 화를 삼....</p>
                            <p>p.260</p>
                            <p>script by.책읽는 기러기</p>
                        </div>
                        <div className='bd-heart-box'>
                            <p>그 사람 변호해 주는 말은 나중에 하세요. 지금은 충분히 더 화내도 돼요. 그동안 얼마나 화를 삼....</p>
                            <p>p.260</p>
                            <p>script by.책읽는 기러기</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default BookDetail