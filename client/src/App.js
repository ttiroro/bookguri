import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import axios from 'axios'
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
import Register from './pages/Register';
import Login from './pages/Login';
import MyBookMemo from './components/MyBookMemo';

const App = () => {
  axios.defaults.withCredentials = true;

  const [bestSellerData, setBestSellerData] = useState([]);
  const [newBookData, setNewBookData] = useState([]);

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


  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchdata() {
    const API_URL = '/mybooks';
    const { data } = await axios.get(API_URL);
    setUserData(data);
    }
    fetchdata();
  },[]);
  //console.log(userData);
  return (
      <BrowserRouter>
        <Scroll />
        <Header userData={userData}/>
        <Routes >
          <Route path='/' element={<Home bestSellerData={bestSellerData} newBookData={newBookData}/>} />
          <Route path='/bookguriinfo' element={<BookguriInfo />} />
          <Route path='/mybooks' element={<MyBooks userData={userData}/>} />
          <Route path='/mybookmemo/:isbn' element={<MyBookMemo userData={userData} />} />
          <Route path='/booklist' element={<BookList bestSellerData={bestSellerData} newBookData={newBookData} />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/bookdetail/:isbn' element={<BookDetail userData={userData}/>} />
          <Route path='/booksearch/:searchword' element={<BookSearch />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  )
}

export default App