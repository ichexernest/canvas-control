import React, { useState, createContext, useContext } from 'react';
//routing
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { GlobalStyle } from './GlobalStyle';
import Home from './components/Home';
import Detail from './components/Detail';
import Header from './components/Header';
import CreateNew from './components/CreateNew';
import Login from './components/Login';
import API from './API';
const fakeAuth = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve('2342f2f1d131rf12'), 250);
  });
const fetchAuth = async (username, password) => {
  try {
    console.log(`here gets username: ${username} & password: ${password}`);
    const data = await API.authenticate(username, password);
    console.log(`here get the token`+JSON.stringify(data));
    return data;
  } catch (error) {
    alert(error);
  }
};
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);

  const handleLogin = async (username, password) => {
    //const token = await fakeAuth();
    const token = await fetchAuth(username, password);
    if (token) {
      setToken(token);
      const origin = location.state?.from?.pathname || '/Home';
      navigate(origin);
    }
    else {
      navigate('/Login');
    }
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      <Header />
      {children}
    </AuthContext.Provider>
  );
};
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();
  if (!token) {
    return <Navigate to="/Login" replace state={{ from: location }} />;
  }
  return children;
};
export const useAuth = () => {
  return useContext(AuthContext);
};
const AuthContext = createContext(null);
const App = () => {
  return (
    <AuthProvider>
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
export default App;
