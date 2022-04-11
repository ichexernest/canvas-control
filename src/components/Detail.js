import styled from "styled-components";
import React, { useState, createContext } from "react";
import classNames from 'classnames';
import ContentArea from "./ContentArea";
import { CaseContextProvider, useAPI } from "./apiContext";
const Wrapper = styled.div`
max-height: 92vh;
height: 92vh;
width: 100%;
display: flex;
flex-direction: row;
flex: 1;
justify-content: stretch;
`;
const SidebarWrapper = styled.div`
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

export const CaseContext = createContext({});
const Detail = () => {
    const [activePageId, setActivePageId] = useState(0); //active ocr area

    return (
        <CaseContextProvider>
            <Wrapper>
                <Sidebar activePageId={activePageId} setActivePageId={setActivePageId} />
                <ContentArea activePageId={activePageId} />
            </Wrapper>
        </CaseContextProvider>
    );
}

const Sidebar = ({ setActivePageId, activePageId }) => {
    const { pages } = useAPI();

    const handleSelectTarget = (i) => {
        setActivePageId(i);
    }

    return (
        <SidebarWrapper>
            <ul>
                {pages.pageList &&
                    pages.pageList.map((item, index) => {
                        let liClasses = classNames({
                            'active': (activePageId === index) ? true : false,
                        });
                        return (
                            <li key={item.Page} className={liClasses} onClick={() => handleSelectTarget(index)} >
                                <img src={item.FilePathSets[0]} alt={item.Page} />
                                page: {item.Page}
                            </li>)
                    })}
            </ul>
        </SidebarWrapper>
    );
}

export default Detail;
