// paste cd .\server
//       node server.js
// to start api server, port 3001

const express = require('express');
const app = express();
const port = 3001;
const PASSWORD = require('./pw');

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

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});

// Debugging
app.get('/debug', (req, res) => {
    let deptInfo = require('../web/src/data/deptinfo.json');
    const { value } = req.query;

    if (value === "deptInfo") { // http://localhost:3001/debug?value=deptInfo
        res.json(deptInfo);
        console.log(deptInfo);
    }
    else if (value != null)
        console.log("ERROR: Parser Value Invalid");
    else
        console.log(PASSWORD);
});

// for Unity
app.get('/unity', (req, res) => {
    const { value } = req.query;
});