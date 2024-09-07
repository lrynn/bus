import React, {Component} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Header from './page/header'
import Main from './page/main'
import LoginPage from './page/login';

import userinfo from './data/userinfo';
<script type='module' src='./data/userinfo'></script>

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
	);
};

export default App;