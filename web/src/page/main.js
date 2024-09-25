import React from 'react';

import './main.css';
import ImageSlider from './ImageSlider';

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
            <td>게임1</td>
            <td>게임2</td>
            <td>게임3</td>
            <td>게임4</td>
          </tr>
          <tr>
            <td>게임5</td>
            <td>게임6</td>
            <td>게임7</td>
            <td>게임8</td>
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