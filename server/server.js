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

//passport
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')

app.use(passport.initialize())
app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave : false,
  saveUninitialized : false,
  cookie : { maxAge : 60 * 60 * 1000 }
}))
app.use(passport.session()) 

// 세션 만들기
passport.use(new LocalStrategy(async (inputId, inputPassword, cb) => {
    let result = await db.collection('user').findOne({ userId : inputId})
    if (!result) {
      return cb(null, false, { message: '아이디 DB에 없음' })
    }
    if (result.userPassword == inputPassword) {
      return cb(null, result)
    } else {
      return cb(null, false, { message: '비번불일치' });
    }
}))
passport.serializeUser((user, done) => {
    process.nextTick(() => {
      done(null, { id: user._id, userId: user.userId })
    })
})
passport.deserializeUser(async(user, done) => {
    let result = await db.collection('user').findOne({_id : new ObjectId(user.userId) })
    delete result.userPassword
    process.nextTick(() => {
      return done(null, result)
    })
  })

//세션 정보 저장
app.post('/login', async (req, res, next) => {
    console.log(res.body)
passport.authenticate('local', (error, user, info) => {
    if (error) return res.status(500).json(error)
    if (!user) return res.status(401).json(info.message)
    req.logIn(user, (err) => {
        if (err) return next(err)
        res.redirect('/')
    })
    })(req, res, next)
}) 

//회원가입 정보 저장
app.post('/register', async (req, res)=>{
    console.log(req.body, 'login post')
    const result = await db.collection('user').insertOne({
        userId : req.body.userId,
        userPassword : req.body.userPassword
    });
    res.send(result);
})



//제일 하단에 놓기
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});