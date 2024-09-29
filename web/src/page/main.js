import React from 'react';
import { Link } from 'react-router-dom';

import './main.css';
import ImageSlider from './ImageSlider';
import Game from './game';

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

function Content() {
  return (
    <div className='divContents'>
      <div className='mainGames'>
        <ImageSlider/>
      </div>
      <div className='allGamesList'>
        게임리스트
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
    </div>
  );
}

function Main() {
  return (
    <div>
      <Content/>
    </div>
  );
}

export default Main;