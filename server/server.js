// paste cd .\server
//       node server.js
// to start api server, port 3001

const express = require('express');
const app = express();
const port = 3001;
const PASSWORD = "legend";

//Express 4.16.0버전 부터 body-parser의 일부 기능이 익스프레스에 내장 body-parser 연결 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

/**
 * 파라미터 변수 뜻
 * req : request 요청
 * res : response 응답
 */

app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

// 유저 정보 불러오기
let userInfoRoute = '/userInfo/'
app.get(userInfoRoute, (req, res) => {
    let userInfo = require('../web/src/data/userinfo.json');

    res.json(userInfo);
    console.log(userInfo);
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});