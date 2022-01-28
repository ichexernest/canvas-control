import styled from "styled-components";

export const Wrapper = styled.div`
background: var(--bgColor);
width: 100%;
z-index:100;
max-height: 50px;
min-height:  50px;
padding:0;
display:flex;
align-items:center;
border-bottom: 1px solid var(--lightGrey);
`;
export const Logo = styled.button`
background-color: var(--white);
color: var(--primary);
border: 0;
font-weight: bold;
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
    background-color: var(--lightGrey);
}
:click{
    color:var(--lightGrey);
}
`;