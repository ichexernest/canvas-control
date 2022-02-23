import styled from "styled-components";
export const Wrapper = styled.div`
display:flex;
flex-direction:column;
padding: 0;
table {
    border-spacing: 0;
    border: 1px solid var(--lightGrey);
    width:100%;
    thead{
        font-weight:bold;
        color: var(--primary);
        line-height:1.5rem
    }
    tr {
        background-color:#e9e9e9;
        &:nth-of-type(odd){
            background: var(--white);
        }
        :hover{
            background: var(--tableActionColor);
        }
        :last-child {
        td {
            border-bottom: 0;
            }
        }
    }

    th,
    td {
        margin: 0;
        padding: 0.2rem;
        border-bottom: 1px solid var(--lightGrey);
        border-right: 1px solid var(--lightGrey);


        :last-child {
            border-right: 0;
        }
    }
}
`
export const SearchWrapper = styled.div`
background-color: var(--listActionColor);
display:flex;
flex-grow:1;
align-items: center;
height: 50px;
padding: 0 12px;
`;

export const GlobalContent = styled.div`
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
export const PageWrapper = styled.div`
display:flex;
justify-content:end;
align-items: center;
height: 50px;
padding: 0 12px;
span{
    font-size:.8rem;
    color:var(--primary);
    margin:0 15px ;
}
`;
export const PageContent = styled.div`
position: relative;
max-width: var(--maxWidth);
height: 30px;
width: 10%;
margin: 0 5px;
border-radius: 40px;
border:1px solid var(--medGrey);
background-color: var(--white);
color: var(--darkGrey);
.icon{
    position: absolute;
    top:6px;
    width: 30px;
    color: var(--medGrey);
}
input{
    font-size: var(--fontSmall);
    position: absolute;
    margin: 6px 0;
    padding: 0 0 0 30px;
    border: 0;
    left:20px;
    width: 80%;
    background: transparent;
    height: 16px;
    color: var(--darkGrey);
    :focus{
    outline:none;
}
}
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