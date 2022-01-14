import styled from "styled-components";

export const Wrapper = styled.div`
background-color: var(--lightGrey);
display:flex;
align-items: center;
height: 50px;
padding: 0 12px;
`;

export const Content = styled.div`
position: relative;
max-width: var(--maxWidth);
width: 100%;
height: 30px;
margin: 0 auto;
border-radius: 40px;
border:1px solid var(--medGrey);
background-color: var(--white);
color: var(--darkGrey);
img{
    position: absolute;
    left: 15px;
    top:14px;
    width: 30px;
}
input{
    font-size: var(--fontSmall);
    position: absolute;
    left: 0;
    margin: 8px 0;
    padding: 0 0 0 30px;
    border: 0;
    width: 95%;
    background: transparent;
    height: 14px;
    color: var(--darkGrey);
    :focus{
    outline:none;
}
}
`;
