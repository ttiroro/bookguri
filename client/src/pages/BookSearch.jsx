import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import './style/BookSearch.css'

const BookSearch = () => {
    let {searchword} = useParams();
    console.log(searchword);

    const [searchBookData, setSearchBookData] = useState({});
    useEffect(() => {
        async function fetchdata() {
        const API_URL = `/ttb/api/ItemSearch.aspx?ttbkey=ttbdltjswjd2220957001&Query=${searchword}&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`;
        const { data } = await axios.get(API_URL);
        setSearchBookData(data);
        }
        fetchdata();
    }, [searchword]);
    console.log(searchBookData.item);
    return (
        <div className='booksearch'>
            <div className='container'>
                <div className='booksearch-inner'>
                    <h2 className='booksearch-head'>💡'{searchword}'의 검색 결과</h2>
                    <div className='booksearch-list'>
                        {
                            searchBookData.item && searchBookData.item.map((item, index)=>(
                                <Link to={`/bookdetail/${item.isbn}`} className='booksearch-box' key={index}>
                                    <div className='booksearch-book-cover'>
                                        <img src={item.cover} alt={item.title} />
                                    </div>
                                    <div className='booksearch-book-info'>
                                        <p className='booksearch-book-title'>{item.title}</p>
                                        <p className='booksearch-book-author'>{item.author}</p>
                                        <p className='booksearch-book-category'>{item.categoryName}</p>
                                    </div>
                                    <div className=''>

                                    </div>
                                </Link>
                            ))
                        }
                    </div>

                </div>

            </div>
        </div>
    )
}

export default BookSearch