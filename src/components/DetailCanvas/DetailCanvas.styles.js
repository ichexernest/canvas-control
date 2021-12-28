import styled from "styled-components";

export const Wrapper = styled.div`
background-color: var(--bgMaskColor);
overflow:hidden;
display:flex;
flex-direction:column;
flex: 4;
`;
export const Box = styled.div`
border-bottom:1px solid var(--lightGrey);
position:relative;
overflow:hidden;
flex:1;
`;
export const BoxText = styled.div`
    position:absolute;
    bottom:0;
    z-index:500;
    width:80px;
    font-size:14px;
    padding:5px;
    color:var(--white);
    background-color: var(--primary);
    opacity:.5;
    text-align:center;
`;
export const Canvas = styled.canvas`
background-color: var(--bgMaskColor);
border: 5px;
width: 100%;
height: 100%;
border-color: var(--lightGrey);
`;      