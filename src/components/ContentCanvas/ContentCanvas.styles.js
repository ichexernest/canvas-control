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
export const S = styled.div`
background-color: var(--primary);
position:absolute;
width: 100%;
height: 100%;
z-index:5000;
`;