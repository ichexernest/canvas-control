import styled from "styled-components";
import { React, useEffect, useState } from "react";
//import Sidebar from "./Sidebar";
import classNames from 'classnames';
import ContentArea from "./ContentArea";
const Home = () => {
    const Wrapper = styled.div`
        max-height: 100vh;
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: stretch;
    `;
    const Sidebar = styled.div`
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
    const Title = styled.div`
        background: var(--bgColor);
        position: sticky;
        top: 0;
        width: 100%;
        z-index:100;
    `;
    const [activePageId, setActivePageId] = useState(0); //active ocr area
    const [pages, setPages] = useState(null); //main data
    useEffect(() => {
        fetchPageList();
    }, [])

    const fetchPageList = () => {
        const responseData = {
            "fileName": "Case08統一藥品自我檢測驗孕盤_紙盒",
            "pageSize": 3,
            "pages": [
                {
                    "page": 1,
                    "filePathSets": "https://www.yunchun.com.tw/upload/20191017113153s1agd1.png",
                },
                {
                    "page": 2,
                    "filePathSets": "https://www.yunchun.com.tw/upload/20191017113153s1agd1.png",
                },
                {
                    "page": 3,
                    "filePathSets": "https://www.yunchun.com.tw/upload/20191017113153s1agd1.png",
                },
            ]
        };
        setPages(responseData);
    };
    const handleSelectTarget = (i) => {
        setActivePageId(i);
    }

    return (
        <Wrapper>
            <Sidebar>
                <Title>
                    <h3>文件辨識檢視系統</h3>
                </Title>
                <ul>
                    {pages !== null &&
                        pages.pages.map((item, index) => {
                            let liClasses = classNames({
                                'active': (activePageId === index) ? true : false,
                            });
                            return (
                                <li key={item + 1} className={liClasses} onClick={() => handleSelectTarget(index)} >
                                    <img src={item.filePathSets} alt={item.page} />
                                    page: {item.page}
                                </li>)
                        })}
                </ul>
            </Sidebar>
            {pages !== null && <ContentArea fileName={pages.fileName} pageIndex={pages.pages[activePageId].page} />}
        </Wrapper>
    );
}

export default Home;
