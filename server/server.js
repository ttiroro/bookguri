const express = require('express');
const path = require('path');
const app = express();
const { MongoClient } = require('mongodb')
require('dotenv').config()

app.use(express.json());
var cors = require('cors');
app.use(cors());

let db;
const url = process.env.DB_URL;
MongoClient.connect(url).then((client)=>{
    console.log('DB연결성공')
    db = client.db(process.env.DB_NAME)

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

//회원가입 정보 저장
app.post('/register', async (req, res)=>{
    console.log(req.body, 'login post')
    const result = await db.collection('user').insertOne({
        userId : req.body.userId,
        userPassword : req.body.userPassword
    });
    res.send(result);
})

// 로그인 기능
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')

app.use(session({
  secret: '암호화에 쓸 비번',
  resave : false,
  saveUninitialized : false
}))
app.use(passport.initialize())
app.use(passport.session()) 

app.post('/login', async (req, res, next)=>{
  passport.authenticate('local', (error, user, info)=>{
    if(error) return res.status(500).json(error)
    if(!user) return res.status(401).json(info.message)
    req.login(user, (err)=>{
      if(err) return next(err)
      res.redirect('/')
    })
  })(req, res, next)
})

passport.use(new LocalStrategy(async (inputId, inputPassword, cb) => {
  let result = await db.collection('user').findOne({ userId : inputId})
  try{
    if (!result) {
      return cb(null, false, { message: '아이디 DB에 없음' })
    }
    if (result.userPassword == inputPassword) {
      return cb(null, result)
    } else {
      return cb(null, false, { message: '비번불일치' });
    }
  } catch(err){
    console.log(err)
  }
}))



//제일 하단에 놓기
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});