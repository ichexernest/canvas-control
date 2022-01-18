import React from 'react';
//routing
import { Routes, Route } from 'react-router-dom';

import { GlobalStyle } from './GlobalStyle';
import Home from './components/Home';
import Detail from './components/Detail';
import Header from './components/Header';
const Layout = (props) => (
  <>
    <Header />
    {props.children}
  </>
)
const App = () => (
  <>
<Layout>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:fileId' element={<Detail />} />
    </Routes>
    </Layout>
    <GlobalStyle />
  </>

)

export default App;
