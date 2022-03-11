import styled from "styled-components";

export const Wrapper = styled.div`
background-color: var(--bgMaskColor);
border: 5px;
overflow:hidden;
border-color: black;
flex: 4;
`;
export const Canvas = styled.canvas`
background-color: var(--bgMaskColor);
border: 5px;
width: 100%;
height: 100%;
border-color: black;
position:relative;
`;      
export const Loading = styled.div`
background-color: var(--white);
position:absolute;
display: ${props => props.hasLoad ? "none" : "flex"};
justify-content:center;
align-items:center;
margin:auto;
color:var(--primary);
width: 100%;
height: 100%;
z-index:5000;
`;