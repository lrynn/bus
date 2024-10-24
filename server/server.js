// paste cd .\server
//       node server.js
// to start api server, port 3001

const express = require('express');
const cors = require('cors');

const fs = require('fs');
const path = require('path');
const https = require('https');

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
app.use(cors());

// const gameList = [
//     'khuonbird',
//     'tetris',
//     'msweeper',
//     'snake',
//     'pacman',
//     'popcat',
//     'numbsball',
//     'majorattack'
// ];
let gamedataFilePath = path.join(__dirname, '../web/src/data/new.json');
let data;

try {
    const fileContent = fs.readFileSync(gamedataFilePath, 'utf-8');
    data = JSON.parse(fileContent);
} catch (error) {
    console.error(`Error parsing JSON file at ${gamedataFilePath}:`, error);
}

// let khuonbirdData,
//     tetrisData,
//     msweeperData,
//     snakeData,
//     pacmanData,
//     popcatData,
//     numbsballData,
//     majorattackData,
//     sumData;
// const gameDataList = [
//     khuonbirdData,
//     tetrisData,
//     msweeperData,
//     snakeData,
//     pacmanData,
//     popcatData,
//     numbsballData,
//     majorattackData
// ];

// const numOfGames = gameDataList.length;

// for (let i = 0; i < numOfGames; i += 1) {
//     gamedataFilePath = `../web/src/data/${gameList[i]}.json`;
//     try {
//         const fileContent = fs.readFileSync(gamedataFilePath, 'utf-8');
//         gameDataList[i] = JSON.parse(fileContent);
//     } catch (error) {
//         console.error(`Error parsing JSON file at ${gamedataFilePath}:`, error);
//     }
// }
// gamedataFilePath = '../web/src/data/sum.json';
// try {
//     const fileContent = fs.readFileSync(gamedataFilePath, 'utf-8');
//     sumData = JSON.parse(fileContent);
// } catch (error) {
//     console.error(`Error parsing JSON file at ${gamedataFilePath}:`, error);
// }

// 파일 읽기 함수
// function readJsonFile(path=gamedataFilePath) {
//     try {
//         const rawData = fs.readFileSync(path, 'utf-8'); // 문자열로 읽기
//         return JSON.parse(rawData); // JSON 파싱
//     } catch (error) {
//         console.error('JSON 파일을 읽는 중 에러가 발생했습니다:', error);
//         return {}; // 에러 발생 시 빈 객체 반환
//     }
// }

// 파일 쓰기 함수
function writeJsonFile(data) {
    try {
        fs.writeFileSync(gamedataFilePath, JSON.stringify(data, null, 2), 'utf-8'); // JSON 문자열로 변환 후 저장
        console.log('JSON 파일이 성공적으로 업데이트되었습니다: '+gamedataFilePath);
    } catch (error) {
        console.error('JSON 파일을 쓰는 중 에러가 발생했습니다:', error);
    }
}

// 1분마다 JSON 파일 업데이트
// setInterval(() => {
//     if (i < numOfGames-1) i += 1;
//     else {
//         i = 0;
//         gamedataFilePath = path.join(__dirname, `../web/src/data/sum.json`);
//         console.log("set gamedataFilePath to " + gamedataFilePath + ", set i to " + i);
    
//         sumData['grade'] = setGrade(-1);
//         writeJsonFile(sumData);
//     }

//     gamedataFilePath = path.join(__dirname, `../web/src/data/${gameList[i]}.json`);
//     console.log("set gamedataFilePath to " + gamedataFilePath + ", set i to " + i);

//     gameDataList[i]['grade'] = setGrade(i);
//     writeJsonFile(gameDataList[i]);
// }, 14000);

function updateGameResult(game, score) {
    if (data['data'][game] <= score) {
        data['data'][game] = score;
        return 0;
    }
    return 200;
}

setInterval(() => {
    writeJsonFile(data);
}, 14000);

// function updateGameResult(userinfo, game, score) {
//     let collegeName = userinfo[0];
//     let deptName = userinfo[1];
//     let userName = userinfo[2];

//     // 과
//     if (gameDataList[game][collegeName][2][deptName][0] < score) {
//         sumData[collegeName][1][deptName] += (score - gameDataList[game][collegeName][2][deptName][0]);

//         gameDataList[game][collegeName][2][deptName][0] = score;
//         gameDataList[game][collegeName][2][deptName][1] = userName;
//         // 단과대
//         if (gameDataList[game][collegeName][0] < score) {
//             sumData[collegeName] += (score - gameDataList[game][collegeName][0]);

//             gameDataList[game][collegeName][0] = score;
//             gameDataList[game][collegeName][1] = userName;

//             console.log("set new result by " + userinfo + ", " + game + ", " + score);
//         }
//         gameDataList[game]['grade'] = setGrade(game);
//     }
// }

// function setGrade(game) {
//     let isSum = (game == -1 ? true : false);
//     let result = [];
//     let collegeStack = Object.keys(isSum ? sumData : gameDataList[game]);
//     collegeStack.splice(collegeStack.indexOf('grade'), 1);
//     let deptResultArray = [];

//     while (collegeStack.length) {
//         // 단과대 수준
//         let best = collegeStack[0];
//         let i = 0;
//         for (i = 1; i < collegeStack.length; i++){
//             best = collegeStack[0];
//             if (isSum) {
//                 if (sumData[best][0] > sumData[collegeStack[i]][0]) {
//                     best = collegeStack[i];
//                 }
//             }
//             else {
//                 if (gameDataList[game][best][0] > gameDataList[game][collegeStack[i]][0]) {
//                     best = collegeStack[i];
//                 }
//             }
            
//             deptResultArray = [];
//             let deptStack = Object.keys(isSum?sumData[best][1]:gameDataList[game][best][2]);
//             let bestDept = deptStack[0];
//             while (deptStack.length) {
//                 // 학과 수준
//                 let j = 1;
//                 for (; j < deptStack.length; j++){
//                     bestDept = deptStack[0];
//                     if (isSum) {
//                         if (sumData[best][1][bestDept][0] > sumData[best][1][deptStack[j]][0]) {
//                             bestDept = deptStack[j];
//                         }
//                     }
//                     else {
//                         if (gameDataList[game][best][2][bestDept][0] > gameDataList[game][best][2][deptStack[j]][0]) {
//                             bestDept = deptStack[j];
//                         }
//                     }
//                 }
//                 deptResultArray.push(bestDept);
//                 deptStack.splice(deptStack.indexOf(bestDept), 1);
//             }
//         }
//         result.push([best, deptResultArray]);
//         collegeStack.splice(collegeStack.indexOf(best), 1);
//     }
//     return result;
// }

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
app.get('/web', cors(), (req, res) => {
    console.log("웹 에서 " + "리퀘스트 옴");
    res.json(data);
});

app.post('/sendResult', cors(), (req, res) => {
    const { gameCode, score } = req.body;
    // if (userName.length > 16) {
    //     console.log("사용자 닉네임 길이 한도 초과: " + userInfo[2]);
    //     return;
    // }
    // let userInfo = [userCollege, userMajor, userName];
    // console.log("send data: " + userInfo + gameCode + score);
    try {
        if (gameCode > -1 && gameCode < 8) {
            console.log("유니티 전송 데이터 처리: " + gameCode + ' ' + score);
            res.sendStatus(updateGameResult(gameCode,score));
        }
    }
    catch (error) {
        console.log("받은 데이터에 무언가 문제가 있습니다.");
        console.log(error)
    }
});

module.exports = server;