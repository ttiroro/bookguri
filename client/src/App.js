import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Scroll from './components/Scroll'
import Header from './components/Header';
import Home from './pages/Home'
import BookguriInfo from './pages/BookguriInfo'
import MyBooks from './pages/MyBooks'
import BookList from './pages/BookList'
import Setting from './pages/Setting'
import Footer from './components/Footer';
import BookDetail from './components/BookDetail';
import BookSearch from './pages/BookSearch';
import Login from './pages/Login';

const App = () => {

  const [bestSellerData, setBestSellerData] = useState([]);
  const [newBookData, setNewBookData] = useState([]);

  //server 연동
  useEffect(()=>{
    fetch("http://localhost:8080/api")
      .then(res => res.json())
      .then(data => console.log(data));
  });

  // 베스트셀러
  useEffect(() => {
      async function fetchdata() {
      const API_URL = '/ttb/api/ItemList.aspx?ttbkey=ttbdltjswjd2220957001&QueryType=Bestseller&MaxResults=30&start=1&SearchTarget=Book&Cover=Big&output=js&Version=20131101';
      const { data } = await axios.get(API_URL);
      setBestSellerData(data);
      }
      fetchdata();
  },[]);
  // console.log(bestSellerData);

  // 주목받을만한 신간 리스트 
  useEffect(() => {
    async function fetchdata() {
    const API_URL = '/ttb/api/ItemList.aspx?ttbkey=ttbdltjswjd2220957001&QueryType=ItemNewSpecial&MaxResults=30&start=1&SearchTarget=Book&Cover=Big&output=js&Version=20131101';
    const { data } = await axios.get(API_URL);
    setNewBookData(data);
    }
    fetchdata();
  },[]);
  //console.log(newBookData);
  
  return (
      <BrowserRouter>
        <Scroll />
        <Header />
        <Routes >
          <Route path='/' element={<Home bestSellerData={bestSellerData} newBookData={newBookData}/>} />
          <Route path='/bookguriinfo' element={<BookguriInfo />} />
          <Route path='/mybooks' element={<MyBooks />} />
          <Route path='/booklist' element={<BookList bestSellerData={bestSellerData} newBookData={newBookData} />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/bookdetail/:isbn' element={<BookDetail />} />
          <Route path='/booksearch/:searchword' element={<BookSearch />} />
          <Route path='login' element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  )
}

export default App