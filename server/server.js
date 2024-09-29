// paste cd .\server
//       node server.js
// to start api server, port 3001

const express = require('express');
const cors = require('cors');

const fs = require('fs');
const path = require('path');
const https = require('https');

const PASSWORD = require('./pw');
const options = {
  key: fs.readFileSync('../web/src/rootca-key.pem'),
  cert: fs.readFileSync('../web/src/rootca-crt.pem')
};

const app = express();
const server = https.createServer(options, app);
const port = 3001;

//Express 4.16.0버전 부터 body-parser의 일부 기능이 익스프레스에 내장 body-parser 연결 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['https://localhost:3000', 'https://hyunverse.kro.kr'],  // React 앱의 출처
  credentials: true,                  // 쿠키를 사용하려면 true로 설정
}));

const gameList = [
    'khuonbird',
    'tetris',
    'msweeper',
    'snake',
    'pacman',
    'popcat',
    'numbsball'
];
let gamedataFilePath = path.join(__dirname, '../web/src/data/1.json');

let khuonbirdData,
    tetrisData,
    msweeperData,
    snakeData,
    pacmanData,
    popcatData,
    numbsballData;

const gameDataList = [
    khuonbirdData,
    tetrisData,
    msweeperData,
    snakeData,
    pacmanData,
    popcatData,
    numbsballData
];

for (let i = 0; i < 7; i += 1) {
    const filePath = `../web/src/data/${gameList[i]}.json`;
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        gameDataList[i] = JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error parsing JSON file at ${filePath}:`, error);
    }
}

// 파일 읽기 함수
function readJsonFile() {
    try {
        const rawData = fs.readFileSync(gamedataFilePath, 'utf-8'); // 문자열로 읽기
        return rawData; // JSON 파싱
    } catch (error) {
        console.error('JSON 파일을 읽는 중 에러가 발생했습니다:', error);
        return {}; // 에러 발생 시 빈 객체 반환
    }
}

// 파일 쓰기 함수
function writeJsonFile(data) {
    try {
        fs.writeFileSync(gamedataFilePath, JSON.stringify(data, null, 2), 'utf-8'); // JSON 문자열로 변환 후 저장
        console.log('JSON 파일이 성공적으로 업데이트되었습니다: '+gamedataFilePath);
    } catch (error) {
        console.error('JSON 파일을 쓰는 중 에러가 발생했습니다:', error);
    }
}

let i = 0;
// 1분마다 JSON 파일 업데이트
setInterval(() => {
    if (i < 7) {
        gamedataFilePath = path.join(__dirname, `../web/src/data/${gameList[i]}.json`);
    }
    else i = 0;
    console.log("set gamedataFilePath to " + gamedataFilePath + ", set i to " + i);
    
    // debug
    gameDataList[i]['소프트웨어융합대학'][2]['컴퓨터공학부(컴퓨터공학과, 인공지능학과)'][0] = 100;
    gameDataList[i]['소프트웨어융합대학'][2]['컴퓨터공학부(컴퓨터공학과, 인공지능학과)'][1] = '버스';
    gameDataList[i]['소프트웨어융합대학'][0] = 100;
    gameDataList[i]['소프트웨어융합대학'][1] = '버스';

    // JSON 파일 쓰기
    writeJsonFile(gameDataList[i]);
    i += 1;
}, 6000);

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

server.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});

// Debugging
app.get('/debug', (req, res) => {
    const { value } = req.query;

    res.json(gameDataList[gameList.indexOf(value)]);
});

// for Web
app.get('/web', (req, res) => {
    const { gameName } = req.query;
    res.json(gameDataList[gameList.indexOf(gameName)]);
    console.log("웹 에서 "+gameName+" 리퀘스트 옴");
});

// for Unity
app.get('/unity', (req, res) => {
    const { value } = req.query;

    res.json(gameDataList[gameList.indexOf(value)]);
});

module.exports = server;