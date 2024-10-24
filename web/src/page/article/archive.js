
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
                <GradeTable selectedGame={selectedGame} />
            </div>
        </div>
    );
}

export default Main;