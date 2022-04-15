import React from 'react';
//routing
import { Routes, Route, Navigate } from 'react-router-dom';

import { GlobalStyle } from './GlobalStyle';
import Home from './components/Home';
import Detail from './components/Detail';
import Header from './components/Header';
import CreateNew from './components/CreateNew';
const Layout = (props) => (
  <>
    <Header />
    {props.children}
  </>
)
const App = () => {
  //let homePage = "/";
  return(
  <>
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:caseNo/:createDTime' element={<Detail />} />
        <Route path='/CreateNew' element={<CreateNew />} />
        <Route path='*' element={<Navigate to={'/'} replace />} />
      </Routes>
    </Layout>
    <GlobalStyle />
  </>

)}

export default App;
