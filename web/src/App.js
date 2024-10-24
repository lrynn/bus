import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './page/header'
import Main from './page/main'
import LoginPage from './page/login';

import Announcement from './page/article/announcement';
import Archive from './page/article/archive';
import Intro from './page/article/intro';
import Services from './page/article/services';

import './App.css'
function Bottom(){
  return (
    <footer>
      <p>
        HyunBus Software ⓒ 2024
      </p>
      <p>
        Web Version : 10.4.27
      </p>
    </footer>
  );
}

export const deptInfo = require("./data/deptinfo.json");
export const collegeList = Object.keys(deptInfo);

const UserInfoContext = createContext();
export function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState([false, false, 'InitialNickname']);
  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
}
export function useUserInfo() {
  return useContext(UserInfoContext);
}

const App = () => {
  return (
    <UserInfoProvider>
      <BrowserRouter>
        <div className='app-main'>
          <div className='app-top'>
            <Header nick={ useUserInfo() } />
            <Routes>
              <Route path='/*' element={<Main />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/page/article/announcement' element={<Announcement />} />
              <Route path='/page/article/archive' element={<Archive />} />
              <Route path='/page/article/intro' element={<Intro />} />
              <Route path='/page/article/services' element={<Services />} />
            </Routes>
          </div>
          <div className='app-bottom'>
            <Bottom />
          </div>
        </div>
      </BrowserRouter>
    </UserInfoProvider>
	);
};

export default App;