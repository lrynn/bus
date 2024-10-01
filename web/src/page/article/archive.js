
import {useState} from 'react'

import GradeTable from "./gradetable";
import './article.css';
import { gameList, gameListKR } from '../main';

function Main() {
    const [selectedGame, setSelectedGame] = useState(gameList[0]);
    return (
        <div className='divContents'>
            <div className="gradeTable">
                <h1>순위표</h1>
                <div>
                    <button style={{ width: '99.995%' }} onClick={() => setSelectedGame('sum')}>합산 점수</button>
                </div>
                <div className="gameButtonDiv">
                    <button className='gameButton' onClick={() => setSelectedGame(gameList[0])}>{gameListKR[0]}</button>
                    <button className='gameButton' onClick={() => setSelectedGame(gameList[1])}>{gameListKR[1]}</button>
                    <button className='gameButton' onClick={() => setSelectedGame(gameList[2])}>{gameListKR[2]}</button>
                    <button className='gameButton' onClick={() => setSelectedGame(gameList[3])}>{gameListKR[3]}</button>
                    <button className='gameButton' onClick={() => setSelectedGame(gameList[4])}>{gameListKR[4]}</button>
                    <button className='gameButton' onClick={() => setSelectedGame(gameList[5])}>{gameListKR[5]}</button>
                    <button className='gameButton' onClick={() => setSelectedGame(gameList[6])}>{gameListKR[6]}</button>
                </div>
            </div>
            <GradeTable selectedGame={selectedGame} />
        </div>
    );
}

export default Main;