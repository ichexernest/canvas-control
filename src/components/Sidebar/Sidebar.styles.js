import styled from "styled-components";

export const Wrapper = styled.div`
background: var(--bgColor);
position: relative;
display: flex;
overflow-y: auto;
flex-direction: column;
flex: 1;
border-right: 1px solid var(--lightGrey);
img {
    width: 200px;
    height: 200px;
    object-fit: contain;
    }
li{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
}
`;
export const Title = styled.div`
background: var(--bgColor);
position: sticky;
top: 0;
width: 100%;
z-index:100;
`;
