import styled from "styled-components";
import { React, useEffect, useState } from "react";
//import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import MainTable from "./MainTable";
import MTable from "./MTable";
const Home = () => {
    const Wrapper = styled.div`
        max-height: 92vh;
        height: 92vh;
        width: 100vw;
        overflow-y:auto;
    `;
    const Button = styled.button`
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
    return (
        <Wrapper>
            <Button>+ 立案</Button>
                <MTable />
        </Wrapper>
    );
}

export default Home;
