const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const hashtagRouter = require("./routes/hashtag");
const db = require("./models");
const path = require("path");
const passportConfig = require("./passport");
const morgan = require("morgan");
const hpp = require('hpp');
const helmet = require('helmet');

dotenv.config(); // -> .env파일을 쓰기위한 라이브러리
const app = express();
db.sequelize
    .sync()
    .then(() => {
        console.log("db 연결 성공");
    })
    .catch(console.error);
passportConfig();

//미들웨어 -> 위치 중요
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(hpp());
    app.use(helmet())
    app.use(cors({
        origin : 'http://donghwi-reactbird.shop',
        credentials: true,
    }))
} else {
    app.use(morgan("dev"));
    app.use(cors({
        origin : true,
        credentials: true,
    }))
}
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
        saveUninitialized: false,
        resave: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly : true,
            secure : false,
            domain: process.env.NODE_ENV === 'production' && '.donghwi-reactbird.shop'
        }
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("hello express");
});

app.use("/post", postRouter); // -> 중복된 post를 prefix로 뽑아줌
app.use("/posts", postsRouter); // -> 중복된 posts를 prefix로 뽑아줌
app.use("/user", userRouter); // -> 중복된 user를 prefix로 뽑아줌
app.use("/hashtag", hashtagRouter); // -> 중복된 hashtag를 prefix로 뽑아줌

app.listen(80, () => {
    console.log("서버 실행 중");
});
