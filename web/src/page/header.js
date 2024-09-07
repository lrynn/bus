import React from 'react';
import { Link } from 'react-router-dom';

import './main.css';
import busLogo from '../bus_logo.png';

function Header(){
  let logo = {imageLink:busLogo, link:'/'}; // 타이틀 버튼
  let loginButton = {title:'로그인', link:'/login'}; // 로그인 버튼

  let rButtonList = [ // 상단바 우측 버튼 링크
    {id:0, title:'소개', link:'/page/article/intro'},
    {id:1, title:'공지사항', link:'/page/article/announcement'},
    {id:2, title:'자료실', link:'/page/article/archive'},
    {id:3, title:'고객센터', link:'/page/article/services'}
  ];
  return (
    <div>
      <header className="top">
        <div className="topLeft">
            <Link to={logo.link}>
              <img className="logo" src={logo.imageLink} alt="도현버스 로고"/>
            </Link>
        </div>
        <div className='buttons-container'>
          <li className="loginButton">
            <Link to={loginButton.link} title={loginButton.title}>
              {loginButton.title}
            </Link>
          </li>
          <div className="topRight">
            <li className="topButtons">
              <Link to={rButtonList[0].link} title={rButtonList[0].title}>
                {rButtonList[0].title}
              </Link>
            </li>
            <li className="topButtons">
              <Link to={rButtonList[1].link} title={rButtonList[1].title}>
                {rButtonList[1].title}
              </Link>
            </li>
            <li className="topButtons">
              <Link to={rButtonList[2].link} title={rButtonList[2].title}>
                {rButtonList[2].title}
              </Link>
            </li>
            <li className="topButtons">
              <Link to={rButtonList[3].link} title={rButtonList[3].title}>
                {rButtonList[3].title}
              </Link>
            </li>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;