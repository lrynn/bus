import React, { Children, Component, createContext, useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './page/header'
import Main from './page/main'
import LoginPage from './page/login';

import Announcement from './page/article/announcement';
import Archive from './page/article/archive';
import Intro from './page/article/intro';
import Services from './page/article/services';

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
      <div className='App'>
        <BrowserRouter>
          <Header nick={ useUserInfo() } />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/page/article/announcement' element={<Announcement />} />
            <Route path='/page/article/archive' element={<Archive />} />
            <Route path='/page/article/intro' element={<Intro />} />
            <Route path='/page/article/services' element={<Services />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserInfoProvider>
	);
};

export default App;