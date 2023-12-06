// import { configureStore, createSlice } from '@reduxjs/toolkit'
// import axios from 'axios'

// function bestseller(){
//     axios.get('/ttb/api/ItemList.aspx?ttbkey=ttbdltjswjd2220957001&QueryType=Bestseller&MaxResults=30&start=1&SearchTarget=Book&Cover=Big&output=js&Version=20131101')
//     .then((data)=> [data])
//     .catch((err)=>{
//     console.log(err)
//     })
// }

// let bestsellerData = createSlice({
//     name: 'bestsellerData',
//     initialState: bestseller()
// })

// export default configureStore({
// reducer: {
//     bestsellerData : bestsellerData.reducer
// }
// })