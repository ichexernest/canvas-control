import styled from "styled-components";

export const Wrapper = styled.div`
position: relative;
display: flex;
flex-direction: column;
justify-content:space-between;
background: var(--bgColor);
flex: 1;
border-right: 1px solid var(--lightGrey);
`;
export const Info= styled.div`
display: flex;
padding:10px;
flex-direction: column;
max-height:300px;
overflow-y: auto;
background: var(--bgColor);
`;
export const CheckDiv = styled.div`
display: flex;
padding:5px 10px;
flex-direction: column;
`;
export const Button = styled.button`
background-color: rgb(34, 20, 95);
border: 1px solid rgb(124, 110, 185);
color: white;
padding: 5px 15px;
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