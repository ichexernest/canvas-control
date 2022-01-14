import React from 'react';
//routing
import { Routes, Route } from 'react-router-dom';

import { GlobalStyle } from './GlobalStyle';
import Home from './components/Home';
import Detail from './components/Detail';
import Header from './components/Header';
const App = () => (
  <>
  <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:fileId' element={<Detail />} />
    </Routes>
    <GlobalStyle />
  </>

)

export default App;
