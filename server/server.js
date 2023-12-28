const express = require('express');
const path = require('path');
const app = express();
const { MongoClient } = require('mongodb')
const bcrypt = require('bcrypt') // 세팅 코드
const MongoStore = require('connect-mongo') //세팅 코드
require('dotenv').config()

app.use(express.json());
var cors = require('cors');
app.use(cors());

// 로그인 기능
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')

app.use(passport.initialize())
app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave : false,
  saveUninitialized : false,
  cookie : {maxAge : 60 * 60 * 1000}, //1시간 세션 유지
  store : MongoStore.create({
      mongoUrl : process.env.DB_URL,
      dbName : process.env.DB_NAME
  })
}))
app.use(passport.session()) 

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
    console.log(req.user)
});

//회원가입 정보 저장
app.post('/register', async (req, res)=>{
  let hash = await bcrypt.hash(req.body.password, 10)
  try{
      if(res.body.username == '' || req.body.password == ''){
          res.send('아이디 혹은 비밀번호를 입력하세요')
      } else if( await db.collection('user').findOne({ username : req.body.username})){
          res.send('이미 사용중인 아이디 입니다.')
      } else {
          await db.collection('user').insertOne({
              username : req.body.username, 
              password: hash
          });
          res.redirect('/')
      }
  } catch(e){
      res.status(500).send('서버에러남')
  }
})

//로그인
passport.use(new LocalStrategy(async (inputId, inputPassword, cb) => {
  let result = await db.collection('user').findOne({ username : inputId})
  if (!result) {
  return cb(null, false, { message: '아이디 DB에 없음' })
  }
  if (await bcrypt.compare(inputPassword, result.password)) {
  return cb(null, result)
  } else {
  return cb(null, false, { message: '비번불일치' });
  }
}))

// 세션 만드는 코드
passport.serializeUser((user, done)=> {
  console.log(user)
  process.nextTick(()=>{
      done(null, {id : user._id, username : user.username})
  })
})
// 세션 쿠키 분석
passport.deserializeUser(async (user, done)=> {
  let result = await db.collection('user').findOne({_id: new ObjectId(user.id)})
  delete result.password //  비밀번호 항목은 삭제후 반영
  process.nextTick(()=> {
      done(null, result) // 최신 유저정보 반영
  })
})

app.post('/login', async(req, res, next)=>{
  passport.authenticate('local', (error, user, info)=> {
      if(error) return req.status(500).json(error)
      if(!user) return req.status(401).json(info.message)
      res.logIn(user, (err)=>{
          if(err) return next(err)
          res.redirect('/')
      })// 실행하면 세션만들기 실행
  })(req, res, next)
})

app.get('/mybooks')

//제일 하단에 놓기
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});