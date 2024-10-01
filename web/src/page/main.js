import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Unity, useUnityContext } from "react-unity-webgl";
import { Link } from 'react-router-dom';

import './main.css';
import { useUserInfo } from '../App';
import ImageSlider from './ImageSlider';

export const gameList = [
  'khuonbird',
  'tetris',
  'msweeper',
  'snake',
  'pacman',
  'popcat',
  'numbsball'
];
export const gameListKR = [
  '플래피 쿠옹',
  '테트리스',
  '지뢰 찾기',
  '스네이크',
  '팩맨',
  '쿠옹이 팝캣',
  '숫자야구'
];

function Main() {
  return (
    <div className='divContents'>
      <Routes>
        <Route path='/' element={<ImageSlider />}/>
        <Route path='/game/*' element={<Game />}/>
      </Routes>
      <Content />
    </div>
  );
}

function Content() {
  return (
    <div className='allGamesList'>
      <table>
        <tr>
          <td>
            <Link to={`/game/${gameList[0]}`}>
              {gameListKR[0]}
            </Link>
          </td>
          <td>
            <Link to={`/game/${gameList[1]}`}>
              {gameListKR[1]}
            </Link>
          </td>
          <td>
            <Link to={`/game/${gameList[2]}`}>
              {gameListKR[2]}
            </Link>
          </td>
          <td>
            <Link to={`/game/${gameList[3]}`}>
              {gameListKR[3]}
            </Link>
          </td>
        </tr>
        <tr>
          <td>
            <Link to={`/game/${gameList[4]}`}>
              {gameListKR[4]}
            </Link>
          </td>
          <td>
            <Link to={`/game/${gameList[5]}`}>
              {gameListKR[5]}
            </Link>
          </td>
          <td>
            <Link to={`/game/${gameList[6]}`}>
              {gameListKR[6]}
            </Link>
          </td>
          <td>출시 예정</td>
        </tr>
      </table>
    </div>
  );
}

function Game() {
  const { userInfo } = useUserInfo();
  const userCollege = userInfo[0];
  const userDept = userInfo[1];
  const userName = userInfo[2];
  return (
      <div>
        게임임
        <Routes>
            {/* <Route path='khuonbird' element={<Khuonbird />} />
            <Route path='tetris'    element={<Tetris />}    />
            <Route path='msweeper'  element={<Msweeper />}  />
            <Route path='snake'     element={<Snake />}     />
            <Route path='pacman'    element={<Pacman />}    />
            <Route path='popcat'    element={<Popcat />}    /> */}
            <Route path='numbsball' element={<Numbsball />} />
        </Routes>
      </div>
  );
};

function Numbsball() {
  const { unityProvider } = useUnityContext({
      loaderUrl: "WebServiceGame/Build/WebServiceGame.loader.js",
      dataUrl: "WebServiceGame/Build/WebServiceGame.data",
      frameworkUrl: "WebServiceGame/Build/WebServiceGame.framework.js",
      codeUrl: "WebServiceGame/Build/WebServiceGame.wasm",
  });

  return(
      <div className="Unity">
          asdf
          <Unity unityProvider={unityProvider}
              style={{width: '1500px', height: '800px'}}
          />
      </div>
  );
}

export default Main;