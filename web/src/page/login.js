import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './main.css';

import { useUserInfo, deptInfo, collegeList } from '../App';

function SelectDept() {
  const { userInfo, setUserInfo } = useUserInfo();
  const [selectedCollege, setSelectedCollege] = useState(userInfo[0] ? userInfo[0] : collegeList[0]);
  const [selectedMajor, setSelectedMajor] = useState(userInfo[1] ? userInfo[1] : deptInfo['문과대학'][0]);

  const handleCollegeChange = (event) => {
    let key = event.target.value;
    setSelectedCollege(key);
    setSelectedMajor(deptInfo[key][0]);
  };
  const handleMajorChange = (event) => {
    setSelectedMajor(event.target.value); // 선택된 값 업데이트
  };
  const confirmButton = () => {
    setUserInfo([selectedCollege, selectedMajor, userInfo[2]]);
    alert(userInfo[0]+' '+userInfo[1]+' '+userInfo[2]);
  }
  return (
    <div>
      <label>
        Choose Your College:
        <select value={selectedCollege} onChange={handleCollegeChange}>
          {collegeList.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </label>
      <br></br>
      <label>
        Choose Your Major:
        <select value={selectedMajor} onChange={handleMajorChange}>
          {deptInfo[selectedCollege].map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </label>
      <p>Selected Department: {selectedCollege} {selectedMajor}</p>
      <button onClick={confirmButton}>단과대학/학과 변경</button>
    </div>
  );
}

export default function LoginPage() {
  const { userInfo, setUserInfo } = useUserInfo();
  let userDept = userInfo[0];
  let userMajor = userInfo[1];
  let userNickname = userInfo[2];

  const handleChangeNickname = (input) => {
    setUserInfo([userDept, userMajor, input]);
  };

  let textTemplate = userNickname == 'InitialNickname' ? "새로운 닉네임 입력" : "변경할 닉네임 입력";
  const [text, setText] = useState(textTemplate);

  const [inputNick, setInputNick] = useState('');
  const onChange = (e)=>{
      setInputNick(e.target.value);
  }
  const onReset = ()=>{
      setInputNick('');
  }
  const activeEnter = (e) => {
    if (e.key === "Enter") {
      handleChangeNickname(inputNick);
      onReset();
      setText("변경할 닉네임 입력");

      console.log(userNickname);
      alert('닉네임이 '+ inputNick +' (으)로 변경되었습니다!');
    }
  }

  return (
    <div className='divContents'>
      <h3>{text}</h3>
      <div>
        <input
          type="text"
          placeholder='최대 16byte'
          onChange={onChange}
          onKeyDown={(e) => activeEnter(e)}
          value={inputNick} />
        <button onClick={onReset}>초기화</button>
      </div>
      <SelectDept/>
    </div>
  );
}