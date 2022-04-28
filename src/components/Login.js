import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useAuth } from "../authContext";
const Wrapper = styled.div`
width: 960px;
margin:100px auto 0;
display: flex;
flex-direction: column;
justify-content:start;
align-items:center;
h1{color:var(--primary)}
form{display: flex;flex-direction: column;justify-content:center;}
`;
const InputLabel = styled.label`

margin:10px 2px 2px;

`;
const Title = styled.div`
font-size: var(--fontBig);
color: var(--primary);
font-weight:bold;
margin: 50px auto;
`;
const InputContent = styled.div`
position: relative;
max-width: var(--maxWidth);
height: 32px;
width: 250px;
margin: 0 5px 10px;
border-radius: 8px;
border:1px solid var(--medGrey);
background-color: var(--white);
color: var(--darkGrey);
input{
font-size: var(--fontSmall);
position: absolute;
left: 0px;
margin: 6px 0;
padding: 0 0 0 20px;
border: 0;
width: 95%;
background: transparent;
height: 20px;
color: var(--darkGrey);
:focus{
outline:none;
}
}
`;
const Button = styled.button`
background-color: rgb(34, 20, 95);
border: 1px solid rgb(124, 110, 185);
color: white;
padding: 5px 15px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin: 20px 5px;
transition-duration: 0.4s;
cursor: pointer;
border-radius: 5px;
:hover{
    background-color: var(--btnActionColor);
}
[disabled=disabled], :disabled {
    background-color: var(--btnDisabledColor);
    :hover{
        background-color: var(--btnDisabledColor);
        cursor:no-drop;
    }
}
`;
const Login = () => {
    const { onLogin } = useAuth();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        onLogin(username, password);
    }

    return (
        <Wrapper>
            <Title>{process.env.REACT_APP_NAME}</Title>
            <form onSubmit={handleSubmit}>
                <InputLabel>Username</InputLabel>
                <InputContent><input type="text" onChange={e => setUsername(e.target.value)} /></InputContent>
                <InputLabel>Password</InputLabel>
                <InputContent><input type="password" onChange={e => setPassword(e.target.value)} /></InputContent>
                <Button type="submit">登入</Button>
            </form>
        </Wrapper>
    );
}
export default Login;
