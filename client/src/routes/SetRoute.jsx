import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BookguriInfo from '../pages/BookguriInfo'
import MyBooks from '../pages/MyBooks'
import BestSeller from '../pages/BestSeller'
import Setting from '../pages/Setting'
import Home from '../pages/Home'

const SetRoute = () => {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/bookguriinfo' element={<BookguriInfo />} />
          <Route path='/mybooks' element={<MyBooks />} />
          <Route path='/bestseller' element={<BestSeller />} />
          <Route path='/setting' element={<Setting />} />
        </Routes>
    </div>
  )
}

export default SetRoute