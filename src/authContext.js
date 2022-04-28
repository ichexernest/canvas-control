import API from './API';
import { setAuthToken } from "./Util";
import React, { useState, createContext, useContext } from 'react';
//routing
import {  useNavigate, useLocation } from 'react-router-dom';
import ModalCard from "./components/ModalCard";

const fetchAuth = async (username, password) => {
    try {
        console.log(`here gets username: ${username} & password: ${password}`);
        const data = await API.login(username, password);
        console.log(data);
        return data;
    } catch (error) {
        alert(error);
    }
};
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [show, setShow] = useState(false);
    const [token, setToken] = useState(null);
    const message='登入失敗，請確認您的帳號密碼!';

    const handleLogin = async (username, password) => {
        //const token = await fakeAuth();
            const userData = await fetchAuth(username, password);
            if (userData) {
                setAuthToken(userData.token);
                setToken(userData);
                const origin = location.state?.from?.pathname || '/Home';
                navigate(origin);
            }
            else {
                setShow(true);
                navigate('/Login');
                //錯誤
            }
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.clear();
    };

    const value = {
        token,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            <ModalCard show={show} setShow={setShow} content={message}></ModalCard>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    return useContext(AuthContext);
};
const AuthContext = createContext(null);