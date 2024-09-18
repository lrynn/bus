### 새 게임 data.json 추가용 코드
### 'gameName' 변수를 꼭 먼저 확인하고 실행하세요

import json

gameName = '3'

with open('./web/src/data/deptinfo.json', 'rt', encoding='utf8') as f:
    data = json.load(f)

for key in data.keys():
    for i in range(len(data[key])):
        data[key][i] = [data[key][i], 0]

with open(f'./web/src/data/{gameName}.json', 'w') as f:
    json.dump(data, f, indent='\t', ensure_ascii=False)