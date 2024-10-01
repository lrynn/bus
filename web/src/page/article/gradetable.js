import {useState, useEffect} from "react"
import axios from "axios";

import './article.css';

async function callApi(gameName) {
    try {
        const response = await axios.get("https://hyunverse.kro.kr:3001/web", { params: { gameName: gameName } });
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
    const [data, setData] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        setDataLoading(true);
        const response = async () => {
            try {
                const result = await callApi(props.selectedGame);
                setData(result);
                setDataLoading(false);
            } catch (error) {
                console.error('데이터를 가져오는 중 에러가 발생했습니다:', error);
                setDataLoading(false);
            }
        };
        response();
    }, [props.selectedGame]);

    useEffect(() => {
        if (!dataLoading) setData(chooseTrueValues(data));
    }, [dataLoading]);

    if (dataLoading) {
        return (
            <div>
                loading
            </div>
        );
    }
    else return (
        data && Object.entries(data).map(([collegeKey, collegeValue], index) => {
            {
                console.log(data);
                // console.log(collegeKey);
                // console.log(data[collegeKey]);
                // console.log(data[collegeKey][0]);
            }
            let collegeGrade = index + 1;
            return (
                <div>
                    <div className="collegeGameData" key={collegeKey}>
                        <div className="collegeGrade">
                            {collegeGrade}위
                            <span className="collegeName">
                                {collegeKey}
                            </span>
                        </div>
                        <div className="collegeRecord">
                            <span className="collegeRecordName">
                                {data[collegeKey][1]} -
                            </span>
                            <span className="collegeRecordScore">
                                <span className="score">{data[collegeKey][0]}</span> pts
                            </span>
                            {Object.entries(data[collegeKey][2]).map(([deptKey, deptValue], deptIndex) => (
                                <div key={deptKey}>
                                    <div className="deptGameData">
                                        <span className="deptGrade">
                                            {deptIndex + 1}위
                                        </span>
                                        <span className="deptName">
                                            {deptKey}
                                        </span>
                                        <div className="deptRecord">
                                            <span className="userName">
                                                {deptValue[1]} -
                                            </span>
                                            <span className="userScore">
                                                <span className="score">{deptValue[0]}</span> pts
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        })
    )
};