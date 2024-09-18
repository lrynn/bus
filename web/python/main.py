### 학부, 학과 정보 크롤링 용 코드
### 절대 함부로 실행하지 마세요!!

import requests
from bs4 import BeautifulSoup
import json

DEBUG = 1

headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('https://www.khu.ac.kr/kor/user/contents/view.do?menuNo=200105',headers=headers)

soup = BeautifulSoup(data.text, 'html.parser')

table = soup.find('tbody')
if DEBUG:
    print("Type of variable 'table':", type(table))

def findCollegeName(line):
    pass

contents = {}

for line in table:
    lineSplit = str(line).split('</a>')
    for i in range(len(lineSplit)):
        lineSplit[i] = lineSplit[i][lineSplit[i].find('"새 창 열림"')+9:]
    if (DEBUG):
        print("loaded line", lineSplit)

    if ('대학' in lineSplit[0] or '학부' in lineSplit[0] or '학과' in lineSplit[0]):
        collegeName = lineSplit[0]
        contents[collegeName] = []
        for i in lineSplit[1:]:
            if ('학부' in i or '과' in i or '전공' in i):
                contents[collegeName].append(i)

if DEBUG:
    print(contents)

with open('./web/src/data/deptinfo.json', 'w', encoding='utf8') as f:
    json.dump(contents, f, ensure_ascii=False, indent='\t')