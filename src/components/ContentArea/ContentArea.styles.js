import styled from "styled-components";

export const Wrapper = styled.div`
position: relative;
display: flex;
flex-direction: column;
height: 92vh;
flex: 5;
`;
export const ControlBar = styled.div`
display: flex;
justify-content: space-between;
background-color: var(--bgColor);
align-items: center;
max-height: 7%;
min-height: 7%;
border-bottom: 1px solid var(--lightGrey);
`;
export const Grid = styled.div`
width: 100%;
max-height:  ${props => props.isMain ? "53%" : "40%"};
min-height:  ${props => props.isMain ? "53%" : "40%"};
display: flex;
flex-direction: row;
flex: 1;
justify-content: stretch;
border-bottom: 1px solid var(--lightGrey);
`;
export const ActionGroup = styled.div`
position: relative;
display: inline-flex;
vertical-align: middle;
padding:0 5px;
a{
    padding:10px;
}
a:hover{
    background: var(--lightGrey);
}
.active{
    background-color: var(--btnActionColor);
}
`;
export const ContentList = styled.div`
position: relative;
display: flex;
flex-direction: column;
overflow-y: auto;
flex: 1;
background-color: var(--bgColor);
border-right: 1px solid var(--lightGrey);
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
export const ToggleButton = styled.button`
background-color:  var(--tableActionColor);
border:0;
color: var(--primary);
padding: 5px 10px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 14px;
margin: 8px 8px;
transition-duration: 0.1s;
cursor: pointer;
border-radius: 5px;
:hover{
    background-color: var(--btnActionColor);
    color: var(--white);
}
`;
export const DetailInfo = styled.div`
position: relative;
display: flex;
flex-direction: column;
justify-content:space-between;
background: var(--bgColor);
flex: 1;
border-right: 1px solid var(--lightGrey);
`;
export const InfoContent = styled.div`
display: flex;
padding:10px;
flex-direction: column;
max-height:300px;
overflow-y: auto;
background: var(--bgColor);
`;
export const CheckContent = styled.div`
display: flex;
padding:5px 10px;
flex-direction: column;
`;