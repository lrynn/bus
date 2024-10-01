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
const deptinfo = readJsonFile('../web/src/data/deptinfo.json');

const app = express();
const server = https.createServer(options, app);
const port = 3001;

//Express 4.16.0버전 부터 body-parser의 일부 기능이 익스프레스에 내장 body-parser 연결 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['https://localhost:3000', 'https://hyunverse.kro.kr', 'http://localhost'],  // React 앱의 출처
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
    numbsballData,
    sumData;
const gameDataList = [
    khuonbirdData,
    tetrisData,
    msweeperData,
    snakeData,
    pacmanData,
    popcatData,
    numbsballData
];

const numOfGames = gameDataList.length;

for (let i = 0; i < numOfGames; i += 1) {
    const filePath = `../web/src/data/${gameList[i]}.json`;
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        gameDataList[i] = JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error parsing JSON file at ${filePath}:`, error);
    }
}
sumData = JSON.parse(fs.readFileSync('../web/src/data/sum.json', 'utf-8'));

// 파일 읽기 함수
function readJsonFile(path=gamedataFilePath) {
    try {
        const rawData = fs.readFileSync(path, 'utf-8'); // 문자열로 읽기
        return JSON.parse(rawData); // JSON 파싱
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

let i = -1;
// 1분마다 JSON 파일 업데이트
setInterval(() => {
    if (i < numOfGames-1) i += 1;
    else i = 0;

    gamedataFilePath = path.join(__dirname, `../web/src/data/${gameList[i]}.json`);
    console.log("set gamedataFilePath to " + gamedataFilePath + ", set i to " + i);

    writeJsonFile(gameDataList[i]);
    setTimeout(() => {
        gamedataFilePath = path.join(__dirname, '../web/src/data/sum.json');
        writeJsonFile(sumData);
    }, 3000);
}, 6000);

function updateGameResult(userinfo, game, score) {
    let collegeName = userinfo[0];
    let deptName = userinfo[1];
    let userName = userinfo[2];

    // 과
    if (gameDataList[game][collegeName][2][deptName][0] < score) {
        gameDataList[game][collegeName][2][deptName][0] = score;
        gameDataList[game][collegeName][2][deptName][1] = userName;
        // 합 및 단과대
        if (gameDataList[game][collegeName][0] < score) {
            sumData[collegeName] += (score - gameDataList[game][collegeName]);
            sumData[collegeName][deptName] += (score - gameDataList[game][collegeName][deptName]);

            gameDataList[game][collegeName][0] = score;
            gameDataList[game][collegeName][1] = userName;
        }
    }
}

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

// for Web
app.get('/web', (req, res) => {
    const { gameName } = req.query;
    console.log("웹 에서 " + gameName + " 리퀘스트 옴");
    if (gameName == "sum") {
        res.json(sumData);
        return 200;
    }
    else
        res.json(gameDataList[gameList.indexOf(gameName)]);
});

// for Unity
app.post('/unity', (req, res)=>{
    const { userinfo, game, score } = req.body;
    if (userinfo[2].length > 16) return;
    try {
        if (Object.keys(deptinfo).indexOf(userinfo[0]) || Object.values(deptinfo).indexOf(userinfo[1])) {
            if (gameList.indexOf(game) > -1) {
                updateGameResult(userinfo, game, score);
                console.log("유니티 전송 데이터 처리: " + userinfo + ' ' + game + ' ' + score);
            }
        }
    }
    catch {
        console.log("받은 데이터에 무언가 문제가 있습니다. "+userinfo)
    }
});

app.get('/asdf', (req, res) => {
    let { userinfo, game, score } = req.query;

    try {
        if (Object.keys(deptinfo).indexOf(userinfo[0]) || Object.values(deptinfo).indexOf(userinfo[1])) {
            if (gameList.indexOf(game) > -1) {
                updateGameResult(userinfo, game, score);
                console.log("처리: " + userinfo + ' ' + game + ' ' + score);
            }
        }
    }
    catch (error) {
        console.log("받은 데이터에 무언가 문제가 있습니다. " + userinfo)
        console.log(error)
    }
});

module.exports = server;