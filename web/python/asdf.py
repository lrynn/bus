### 새 게임 data.json 추가용 코드
### 막 돌려서 데이터 날라가면 난 몰라

import json

gameNames = [
    'khuonbird',
    'tetris',
    'msweeper',
    'snake',
    'pacman',
    'popcat',
    'numbsball',
    'majorattack'
]

with open('./web/src/data/deptinfo.json', 'rt', encoding='utf8') as f:
    rawdata = json.load(f)

data = {}

for college, departments in rawdata.items():
    college_temp = [0, "None"]
    department_temp = {}
    
    for department in departments:
        department_temp[department] = [0, "None"]
    
    college_temp.append(department_temp)
    data[college] = college_temp

for gameName in gameNames:
    with open(f'./web/src/data/{gameName}.json', 'w', encoding='utf8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

data = {}
for college, departments in rawdata.items():
    depttemp={}
    for i in departments:
        depttemp[i]=0
    data[college]=[0, depttemp]

with open(f'./web/src/data/sum.json', 'w', encoding='utf8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)