import React from 'react'

const BestSeller = ({bestSellerData}) => {
  return (
    <div>
      { bestSellerData.item &&
                    bestSellerData.item.map((item, index)=> index < 3 && (
                            <div to="#" className='hb-book' key={index}>
                                <div className='hb-book-rank'>
                                    <p className='hb-book-rankText'>{item.bestRank}</p>
                                </div>
                                <div className='hb-book-cover'>
                                    <img src={item.cover} alt="cover" />
                                </div>
                                <div className='hb-book-info'>
                                    <p className='hb-book-title'>{(item.title)}</p>
                                    <p className='hb-book-author'>{(item.author)}</p>
                                </div>
                            </div>
                        ))
                    }
    </div>
  )
}

export default BestSeller