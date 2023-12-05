import React from 'react'
import './style/HomeBest.css'

const HomeBest = () => {
  return (
    <section className='home-bestseller'>
        <div className='container'>
            <h2 className='hb-title'>BEST SELLER</h2>
            <div className='hb-list'>

                <a href="/" className='hb-book'>
                    <img src="/images/book01.jpg" alt="cover" />
                    <div className='hb-book-info'>
                        <p className='hb-book-title'>책 제목</p>
                        <p className='hb-book-author'>지은이</p>
                        <p className='hb-book-heart'>평점</p>
                    </div>
                </a>

                <a href="/" className='hb-book'>
                    <img src="/images/book01.jpg" alt="cover" />
                    <div className='hb-book-info'>
                        <p className='hb-book-title'>책 제목</p>
                        <p className='hb-book-author'>지은이</p>
                        <p className='hb-book-heart'>평점</p>
                    </div>
                </a>

                <a href="/" className='hb-book'>
                    <img src="/images/book01.jpg" alt="cover" />
                    <div className='hb-book-info'>
                        <p className='hb-book-title'>책 제목</p>
                        <p className='hb-book-author'>지은이</p>
                        <p className='hb-book-heart'>평점</p>
                    </div>
                </a>              

            </div>
        </div>
    </section>
  )
}

export default HomeBest