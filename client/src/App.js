import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BookguriInfo from './pages/BookguriInfo'
import MyBooks from './pages/MyBooks'
import BestSeller from './pages/BestSeller'
import Setting from './pages/Setting'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/bookguriinfo' element={<BookguriInfo />} />
        <Route path='/mybooks' element={<MyBooks />} />
        <Route path='/bestseller' element={<BestSeller />} />
        <Route path='/setting' element={<Setting />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App