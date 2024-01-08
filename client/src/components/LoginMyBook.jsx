import React from 'react'
import { Link } from 'react-router-dom'
import './style/LoginMyBook.css'

const LoginMyBook = ({userData}) => {
    // text 10글자 이상이면 숨기기
    function textLimit(str){
        let result = {};
        str.length > 12 ? result = str.substr(0, 12) + '...' : result = str
        return result;
    };


    return (
        <div className='mybooks'>
            <div className='container'>
                <h2 className='mb-title'>📘 {userData.subname}님의 서재</h2>
                <section className='mb-sec01'>
                    <div className='mb-userprofile'>
                        <div className='mb-userprofile-userinfo'>
                            <div className='mb-userprofile-userimg'>
                                <img src="/images/profil.svg" alt="img" />
                                <p>{userData.subname}({userData.username})</p>
                            </div>
                            <div className='mb-userprofile-text'>
                                <p>읽은 책 : 00</p>
                                <p>기록한 마음 문장 : 00</p>
                                <p>최근 독서 일자 : 0000.00.00</p>
                            </div>
                        </div>
                        <div className='mb-userprofile-category'>
                            <h4>분야별 독서 현황</h4>
                            <p>인문</p>
                            <p>예술</p>
                            <p>자기계발</p>
                            <p>장르소설</p>
                            <p>경영/경제</p>
                            <p>기타</p>
                        </div>
                    </div>
                    <div className='mb-calendar'>
                        <h3>독서 달력</h3>
                    </div>
                    
                </section>

                <section className='mb-sec02'>
                    <h3>내가 담은 책</h3>
                    <div className='mb-booklist'>
                    {
                        userData.books &&
                        userData.books.map((item, index)=>(

                        <Link to={`/mybookmemo/${item.bookIsbn}`} className='mb-bookbox' key={index}>
                            <div className='mb-book-cover'>
                                <img src={item.bookCover} alt="cover" />
                            </div>
                            <div className='mb-book-text'>
                                <p>{textLimit(item.bookTitle)}</p>
                                <p>{textLimit(item.bookAuthor)}</p>
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

export default LoginMyBook