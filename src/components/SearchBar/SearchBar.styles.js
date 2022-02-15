import styled from "styled-components";

export const Wrapper = styled.div`
display:flex;
align-items: center;
height: 50px;
padding: 0 12px;
`;
export const Content = styled.div`
position: relative;
max-width: var(--maxWidth);
height: 32px;
width: 300px;
margin: 0 5px;
border-radius: 8px;
border:1px solid var(--medGrey);
background-color: var(--white);
color: var(--darkGrey);
.icon{
    position: absolute;
    right: 14px;
    background-color: var(--white);
    border-radius:50px;
    top:2px;
    width: 25px;
    height:25px;
    padding:5px;
    color: var(--primary);
    z-index:100;
    pointer-events: none;
    :hover{
        background-color: var(--primary);
        color: var(--primary);
    }
}
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
export const Button = styled.button`
background-color: rgb(34, 20, 95);
border: 1px solid rgb(124, 110, 185);
color: white;
padding: 5px 15px;
height:34px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin: 4px 2px;
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