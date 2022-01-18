import styled from "styled-components";
export const Wrapper = styled.div`
padding: 0;

table {
    border-spacing: 0;
    border: 1px solid black;
    width:100%;

    tr {
        :last-child {
        td {
            border-bottom: 0;
            }
        }
    }

    th,
    td {
        margin: 0;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;

        :last-child {
            border-right: 0;
        }
    }
}
`
export const BWrapper = styled.div`
background-color: var(--lightGrey);
display:flex;
align-items: center;
height: 50px;
padding: 0 12px;
`;

export const BContent = styled.div`
position: relative;
max-width: var(--maxWidth);
width: 100%;
height: 30px;
margin: 0 auto;
border-radius: 40px;
border:1px solid var(--medGrey);
background-color: var(--white);
color: var(--darkGrey);
.icon{
    position: absolute;
    left: 15px;
    top:6px;
    width: 30px;
    color: var(--medGrey);
}
input{
    font-size: var(--fontSmall);
    position: absolute;
    left: 15px;
    margin: 6px 0;
    padding: 0 0 0 30px;
    border: 0;
    width: 95%;
    background: transparent;
    height: 16px;
    color: var(--darkGrey);
    :focus{
    outline:none;
}
}
`;
