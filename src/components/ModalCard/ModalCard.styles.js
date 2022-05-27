import styled from "styled-components";


export const CardWrapper = styled.div`
position:absolute;
height: 100%;
width: 100%;
z-index:500;
top:0;
backdrop-filter: blur(2px);
display: flex;
background:rgba(0,0,0,0.3);
justify-content:center;
align-items:center;
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
export const Card = styled.div`
width:500px;
height:200px;
background:var(--white);
box-shadow: 3px 6px 20px rgba(0,0,0,0.3);
border-radius:10px;
display:flex;
flex-direction:column;
align-items:center;
margin:0 10px;
p{
    color:var(--black);
    margin:auto;
}
h2{color:var(--primary)}
`;

export const Loading = styled.div`
width:100%;
height:100%;
display:flex;
justify-content:center;
align-items: center;
color:var(--primary);
`;