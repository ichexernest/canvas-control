import React, { useState, createContext, useContext } from 'react';
//routing
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { GlobalStyle } from './GlobalStyle';
import Home from './components/Home';
import Detail from './components/Detail';
import Header from './components/Header';
import CreateNew from './components/CreateNew';
import Login from './components/Login';
import { AuthProvider, useAuth } from "./authContext";

const App = () => {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route index element={<Login />} />
        <Route path="Login" element={<Login />} />
        <Route path="Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/:caseNo/:createDTime' element={<ProtectedRoute><Detail /></ProtectedRoute>} />
        <Route path='/CreateNew' element={<ProtectedRoute><CreateNew /></ProtectedRoute>} />
        <Route path='*' element={<Navigate to={'/Home'} replace />} />
      </Routes>
      <GlobalStyle />
    </AuthProvider>

  )
}

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();
  if (!token) {
    return <Navigate to="/Login" replace state={{ from: location }} />;
  }
  return children;
};
export default App;
