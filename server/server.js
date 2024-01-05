const express = require('express');
const path = require('path');
const app = express();
const { MongoClient } = require('mongodb')
const { ObjectId } = require('mongodb')
const bcrypt = require('bcrypt') 
require('dotenv').config()

app.use(express.json());
var cors = require('cors');
app.use(cors());

// 로그인 기능
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const MongoStore = require('connect-mongo')

app.use(passport.initialize())
app.use(session({
    secret: process.env.PASSPORT_SECRET, // 개인정보를 보호하기 위한 패스워드
    resave : false, // 유저가 서버로 요청할때마다 세션 갱신 여부
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
});

//회원가입 정보 저장
app.post('/register', async (req, res)=>{
    let hash = await bcrypt.hash(req.body.password, 10)
    console.log(req.body)
    try{
        if(req.body.username == '' || req.body.password == ''){
            res.send('아이디 혹은 비밀번호를 입력하세요')
        } else if( await db.collection('user').findOne({ username : req.body.username})){
            res.send('이미 사용중인 아이디 입니다.')
        } else {
            await db.collection('user').insertOne({
                username : req.body.username, 
                password: hash,
                subname : req.body.subname
            });
            res.send('회원가입을 축하합니다')
        }
    } catch(e){
        res.status(500).send('서버에러남')
    }
})

//로그인 기능
    // 제출한 아이디/ 비번 검사하는 코드
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
        if(error) return res.status(500).json(error)
        if(!user) return res.status(401).json(info.message)
        req.logIn(user, (err)=>{
            if(err) return next(err)
            res.redirect('/')
        })// 실행하면 세션만들기 실행
    })(req, res, next)
})

app.get('/mybooks', async (req, res) =>{
    if(!req.user){
        res.send('login')
    } else {
        let result = await db.collection('user').findOne({_id : new ObjectId(req.user._id)})
        delete result.password //  비밀번호 항목은 삭제후 반영
        res.json(result)
        console.log(req.user.username, ': 현재 로그인 중인 사용자')
    }
})


app.post('/bookdetail', async (req, res)=>{
    console.log(req.user)
    let result = await db.collection('user').findOne({ readbooks : req.body.book})
    try{
        if(!result){
            await db.collection('user').updateOne({ _id : new ObjectId(req.user._id)},{
                $push : { readbooks : req.body.book }
            });
            await db.collection('bookdata').insertOne({
                bookIsbn : req.body.book,
                bookTitle : req.body.bookTitle,
                bookCover : req.body.bookCover,
                bookAuthor : req.body.bookAuthor
            })
            res.send("<script>alert('책을 서재에 담았습니다');</script>");
        } else {
            res.send("<script>alert('이미 서재에 담긴 책입니다.');</script>");
        }
    } catch(err){
        console.log(err)
    }
})


//제일 하단에 놓기
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});