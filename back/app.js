const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const passportConfig = require("./passport");

const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);
passportConfig();

//미들웨어 -> 위치 중요
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: "nodebirdsecret",
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/posts", (req, res) => {
  res.json([
    {
      id: 1,
      content: "hello",
    },
    {
      id: 2,
      content: "hello2",
    },
    {
      id: 3,
      content: "hello3",
    },
  ]);
});

app.use("/post", postRouter); // -> 중복된 post를 prefix로 뽑아줌
app.use("/user", userRouter); // -> 중복된 user를 prefix로 뽑아줌

app.listen(3065, () => {
  console.log("서버 실행 중");
});
