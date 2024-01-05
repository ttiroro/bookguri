import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router'

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
        <div className='container'>
            {
                bookData.item &&
                <h3>[{bookData.item[0].title}]의 마음문장 페이지 입니다</h3>
            }
        </div>
    )
}

export default MyBookMemo