import styled from "styled-components";

export const UploadArea = styled.div`
display:flex;
justify-content:center;
align-items:center;
margin-bottom:20px;
label{
background-color: var(--white);
border: 2px dashed var(--primary);
border-radius:8px;
color: var(--primary);
display:flex;
flex-direction:column;
padding: 20px;
margin:15px;
width:100%;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
input{
    display:none;
}
p{color:var(--primary);
font-size:.8rem}
button{
    pointer-events: none;
    background-color: rgb(34, 20, 95);
    border: 1px solid rgb(124, 110, 185);
    color: white;
    padding: 5px 15px;
    height:34px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 5px;
    }
    :hover{
        cursor: pointer;
        background-color:var(--tableActionColor);
    }
}
}
`;