import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router'
import './style/MyBookMemo.css'

const MyBookMemo = ({userData}) => {
    let {isbn} = useParams();

    //bestseller 데이터 알라딘 서버에서 가져오는 부분
    const [bookData, setBookData] = useState({});
    useEffect(() => {
        async function fetchdata() {
        const API_URL = `/ttb/api/ItemLookUp.aspx?ttbkey=ttbdltjswjd2220957001&itemIdType=ISBN&ItemId=${isbn}&output=js&Version=20131101&Cover=Big&OptResult=ebookList,usedList,reviewList`;
        const { data } = await axios.get(API_URL);
        setBookData(data);
        }
        fetchdata();
    }, [isbn]);


    // 현재 도서의 ISBN과 일치하는 user 데이터의 도서정보 index 찾기
    const currentBookIndex = userData.books.findIndex(obj => obj.bookIsbn === isbn);

    
    return (
        <div>
            {
                bookData.item &&
                userData.books &&

                <div>
                <section className='mbm-sec1'>
                    <div className='container mbm-book-box'>
                        <p className='mbm-book-title'>{bookData.item[0].title}</p>

                        <div className='mbm-book-inner'>
                            <div className='mbm-book-cover'>
                                <img src={bookData.item[0].cover} alt="cover"/>
                                <div className='mbm-book-btn'>
                                    <form>
                                        <button>안 읽은 책</button>
                                    </form>
                                    <form>
                                        <button>읽은 책</button>
                                    </form>
                                    <form>
                                        <button>다 읽은 책</button>
                                    </form>
                                </div>
                            </div>

                            <div className='mbm-book-text' >
                                <p className='mbm-book-writer'>지은이 | {bookData.item[0].author}</p>
                                <p className='mbm-book-publisher'>출판사 | {bookData.item[0].publisher}</p>
                                <p className='mbm-book-page'>페이지  |  {bookData.item[0].subInfo.itemPage} p</p>
                                <div className='mbm-book-category'>
                                    <p>주제분류  |  {bookData.item[0].categoryName}</p>
                                </div>
                                <p className='mbm-book-desc'> 책 소개 | <br/> {bookData.item[0].description}</p>
                            </div>

                        </div>
                    </div>
                </section>

                <div className='container'>
                    <section className='mbm-sec2'>
                        <div className='mbm-desc'>
                            <p className='book-desc-title'>도서 정보</p>
                            <div>
                                <p className='book-add-date'>서재에 담은 날  |  {userData.books[currentBookIndex].addDate}</p>
                                <p className='book-read-date'>읽기 시작한 날 | </p>
                                <p className='book-complete-date'>다 읽은 날 | </p>
                            </div>
                        </div>
                    </section>

                    <section className='mbm-sec3'>
                        <p>내 마음문장</p>
                    </section>

                    <section className='mbm-sec4'>
                        <div className='mbm-heart-list'>
                            <p className='mbm-heart-title'>다른 유저의 마음 문장</p>
                            <div className='mbm-heart-box'>
                                <p>그 사람 변호해 주는 말은 나중에 하세요. 지금은 충분히 더 화내도 돼요. 그동안 얼마나 화를 삼....</p>
                                <p>p.260</p>
                                <p>script by.책읽는 기러기</p>
                            </div>
                            <div className='mbm-heart-box'>
                                <p>그 사람 변호해 주는 말은 나중에 하세요. 지금은 충분히 더 화내도 돼요. 그동안 얼마나 화를 삼....</p>
                                <p>p.260</p>
                                <p>script by.책읽는 기러기</p>
                            </div>
                            <div className='mbm-heart-box'>
                                <p>그 사람 변호해 주는 말은 나중에 하세요. 지금은 충분히 더 화내도 돼요. 그동안 얼마나 화를 삼....</p>
                                <p>p.260</p>
                                <p>script by.책읽는 기러기</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
                })
        </div>
    )
}

export default MyBookMemo