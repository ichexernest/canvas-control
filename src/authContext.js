import API from './API';
import { getAuthToken, setAuthToken } from "./Util";
import React, { useState, useEffect, createContext, useContext } from 'react';
//routing
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import ModalCard from "./components/ModalCard";

const fetchAuth = async (username, password) => {
    try {
        console.log(`here gets username: ${username} & password: ${password}`);
        const data = await API.login(username, password);
        //const data = {UserId:'ss01'};
        console.log(data);
        return data;
    } catch (error) {
        console.log(`login fail`);
    }
};
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [show, setShow] = useState(false);
    const [token, setToken] = useState(null);
    const message = '登入失敗，請確認您的帳號密碼!';

    useEffect(() => {
        let loggedInUser = getAuthToken();
        if (loggedInUser) {
            setToken(JSON.stringify(loggedInUser));
        }
    }, []);

    const handleLogin = async (username, password) => {
        //const token = await fakeAuth();
        const userData = await fetchAuth(username, password);
        if (userData) {
            console.log("getuserdata"+JSON.stringify(userData));
            setToken(userData);
            setAuthToken(JSON.stringify(userData));
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
        console.log(`logouting` + token)
        setToken(null);
        console.log(`logouted` + token)
        localStorage.clear();
        return <Navigate to="/Login" replace state={{ from: location }} />;

    };

    const value = {
        token,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            <ModalCard show={show} setShow={setShow} content={message} showLoading={false}></ModalCard>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    return useContext(AuthContext);
};
const AuthContext = createContext(null);