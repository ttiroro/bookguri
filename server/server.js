const express = require('express');
const path = require('path');
const app = express();
const { MongoClient } = require('mongodb')

let db;
const url = 'mongodb+srv://admin:qwer1234@admin.vwrvrgh.mongodb.net/?retryWrites=true&w=majority'
new MongoClient(url).connect().then((client)=>{
    console.log('DB연결성공')
    db = client.db('bookguri')

    app.listen(8080, ()=>{
        console.log('http://localhost:8080 에서 서버 실행중')
    })

    }).catch((err)=>{
    console.log(err)
})

app.use(express.static(path.join(__dirname, '../client/public')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.post('/login', (req, res)=>{
    console.log(req.body)
    db.collection('user').insertOne({
        userId : req.body.userId,
        userPassword : req.body.userPassword
    });
    res.redirect('/')
})




//제일 하단에 놓기
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});