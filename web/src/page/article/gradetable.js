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
        if (typeof data !== 'object') continue;

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
            colldump[coll] = deptdump;
        }
    }
    return colldump;
}

export default function GradeTable(props) {
    const [data, setData] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
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

        setDataLoading(true); // 새 게임 선택 시 로딩 시작
        response(props.selectedGame);
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

    return (
        <div>
            {JSON.stringify(data, null, 2)}
            <br />
        </div>
    );
};