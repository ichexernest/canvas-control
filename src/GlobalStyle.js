import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root {
    --maxWidth:100%;
    --white: #fff;
    --lightGrey: rgb(189, 187, 196);
    --medGrey: #353535;
    --darkGrey: #1c1c1c;
    --fontSuperBig: 2.5rem;
    --fontBig:1.5rem;
    --fontMed: 1.2rem;
    --fontSmall:1rem;
    --primary:rgb(34, 20, 95);
    --bgColor:rgb(254, 254, 255);
    --listActionColor:rgb(219, 216, 232);
    --btnActionColor:rgb(126, 109, 199);
    --btnDisabledColor:rgb(163, 159, 179);
    --bgMaskColor: #dddddd;
    --bgError: rgb(242, 102, 102);
    --bgSuccess:rgb(0, 196, 10);
}

*{
    box-sizing: border-box;
    font-family: 'Abel', sans-serif;
}

body{
    margin:0;
    padding:0;
    h1{
        font-size:2rem;
        font-weight:600;
        color: var(--white);
    }
    h2{
        font-size:1.4rem;
        font-weight:600;
    }
    h3{
        font-size:1.1rem;
        font-weight:600;
        color:rgb(34, 20, 95);
        margin: 8px;
        padding:8px;
    }
    p{
        font-size:1rem;
        color: var(--white);
    }
    ul{
        display: flex;
        flex-direction: column;
        padding-left: 0;
        margin:0 5px;
        .error{
            color: var(--bgError);
        }
        .success{
            color: var(--bgSuccess);
        }
        .active{
            background-color: var(--listActionColor);
            -webkit-user-select:none;
            -moz-user-select:none;
            -o-user-select:none;
            user-select:none;   
            cursor: pointer;
        }
    }
    li{
        position: relative;
        display: block;
        padding: 0.8rem 1rem;
        margin:0.1rem;
        color: #212529;
        text-decoration: none;
        border-radius: 0.25rem;
        list-style-position:inside;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;  
        background-color: var(--bgColor);
        :hover{
            background-color: var(--listActionColor);
            -webkit-user-select:none;
            -moz-user-select:none;
            -o-user-select:none;
            user-select:none;   
            cursor: pointer;
        }
    }
}`
