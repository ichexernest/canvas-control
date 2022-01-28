import styled from "styled-components";
import { React, useEffect, useState } from "react";
import MTable from "./MTable";
import makeData from './MTable/makeData.js'
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
const Home = () => {
    const Wrapper = styled.div`
        max-height: 92vh;
        height: 92vh;
        width: 100vw;
        overflow-y:auto;
    `;
    const ControlWrapper = styled.div`
    display:flex;
    justify-content:space-between;
    align-items: center;
    padding: 0 12px;
`;
    const NewBtn = styled.button`
    background-color: var(--white);
    border: 1px solid var(--white);
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    color: var(--primary);
    padding: 5px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: var(--fontBig);
    margin: 15px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 50px;
    :hover{
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
    [disabled=disabled], :disabled {
        background-color: var(--btnDisabledColor);
        :hover{
            background-color: var(--btnDisabledColor);
            cursor:no-drop;
        }
    }
`;
    const data = makeData(1000);

    return (
        <Wrapper>
            <ControlWrapper>
                <Link to={`/CreateNew`}>
                    <NewBtn>+ 立案</NewBtn>
                </Link>
                <SearchBar />
            </ControlWrapper>
            <MTable data={data} />
        </Wrapper>
    );
}

export default Home;
