import {useState, useEffect} from "react"
import axios from "axios";

import './article.css';

async function callApi(gameName) {
    try {
        const response = await axios.get("https://hyunverse.kro.kr:3001/web");
        return response.data;
    }
    catch (error) {
        console.log(error);
    };
};

function chooseTrueValues(data) {
    if (typeof data !== 'object') return null;

    let colldump = {};
    // 단과대 점수
    for (let coll of Object.keys(data)) {
        if (typeof data[coll] !== 'object') continue;

        let deptdump = {};
        if (data[coll][0] > 0) {
            colldump[coll] = [data[coll][0], data[coll][1]];

            // 학과 점수
            for (let dept of Object.keys(data[coll][2])) {
                if (data[coll][2][dept][0] > 0) {
                    deptdump[dept] = data[coll][2][dept];
                }
            }
        }
        if (Object.keys(deptdump).length > 0) {
            colldump[coll].push(deptdump);
        }
    }
    return colldump;
}

export default function GradeTable(props) {
    let [data, setData] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        setDataLoading(true);
        const response = async () => {
            try {
                const result = await callApi();
                setData(result);
                setDataLoading(false);
            } catch (error) {
                setDataLoading(false);
                return (<div><p>데이터를 가져오는 중 에러가 발생했습니다:</p><p>{error}</p></div>);
            }
        };
        response();
    }, [props.selectedGame]);

    if (dataLoading) {
        return (
            <div>
                loading
            </div>
        );
    }
    else {
        return (
            <div className="gradeTableDiv">
                <div>
                    플래피쿠옹 최고기록:
                </div>
                <div>
                    <span>
                        {data['data'][0]}
                    </span>
                    pts
                </div>
                <div>
                    테트리스 최고기록:
                </div>
                <div>
                    <span>
                        {data['data'][1]}
                    </span>
                    pts
                </div>
                <div>
                    지뢰찾기 최고기록:
                </div>
                <div>
                    <span>
                        {data['data'][2]}
                    </span>
                    pts
                </div>
                <div>
                    스네이크 최고기록:
                </div>
                <div>
                    <span>
                        {data['data'][3]}
                    </span>
                    pts
                </div>
                <div>
                    팩맨 최고기록:
                </div>
                <div>
                    <span>
                        {data['data'][4]}
                    </span>
                    pts
                </div>
                <div>
                    팝쿠 최고기록:
                </div>
                <div>
                    <span>
                        {data['data'][5]}
                    </span>
                    pts
                </div>
                <div>
                    숫자야구 최고기록:
                </div>
                <div>
                    <span>
                        {data['data'][6]}
                    </span>
                    pts
                </div>
                <div>
                    전공어택 최고기록:
                </div>
                <div>
                    <span>
                        {data['data'][7]}
                    </span>
                    pts
                </div>
            </div>
        )
    }
};