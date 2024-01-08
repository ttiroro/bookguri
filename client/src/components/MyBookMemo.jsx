import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router'
import './style/MyBookMemo.css'

const MyBookMemo = ({userData}) => {
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

    return (
        <div>
            {
                bookData.item &&
                <div>
                <section className='mbm-sec1'>
                    <div className='container mbm-book-box'>
                        <p className='mbm-book-title'>{bookData.item[0].title}</p>

                        <div className='mbm-book-inner'>
                            <div className='mbm-book-cover'>
                                <img src={bookData.item[0].cover} alt="cover"/>
                            </div>

                            <div className='mbm-book-text' >
                                <p className='mbm-book-writer'>지은이 | {bookData.item[0].author}</p>
                                <p className='mbm-book-publisher'>출판사 | {bookData.item[0].publisher}</p>
                                <p className='mbm-book-date'>출판일  |  {bookData.item[0].pubDate}</p>
                                <p className='mbm-book-page'>페이지  |  {bookData.item[0].subInfo.itemPage} p</p>
                                <p className='mbm-book-isbn'>ISBN  |  {bookData.item[0].isbn13}</p>
                                <div className='mbm-book-category'>
                                    <p>주제분류  |  {bookData.item[0].categoryName}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className='container'>
                    <section className='mbm-sec2'>
                        <div className='mbm-desc'>
                            <p className='book-desc-title'>책 소개</p>
                            <p className='book-desc-text'>{bookData.item[0].description}</p>
                        </div>
                    </section>

                    <section className='mbm-sec3'>
                        <p>상세 정보</p>
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
            }
        </div>
    )
}

export default MyBookMemo