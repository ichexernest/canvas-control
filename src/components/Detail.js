import styled from "styled-components";
import { useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
//import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner} from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames';
import ContentArea from "./ContentArea";
//import API from '../API';
const Detail = () => {
    const Wrapper = styled.div`
        max-height: 92vh;
        height: 92vh;
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
    const Loading = styled.div`
width:100%;
height:100%;
display:flex;
justify-content:center;
align-items: center;
color:var(--primary);
`;
    const { caseNo,createDTime } = useParams();
    const [activePageId, setActivePageId] = useState(0); //active ocr area
    const [pages, setPages] = useState(null); //main data
    useEffect(() => {
        fetchPageList();
    }, [])

    const fetchPageList = () => {
        console.log(`here gets caseNo: ${caseNo} & createDTime: ${createDTime}`);
        fetch(
            'http://lbftcaivm01/FPGProcessService/DocSimilar/DocPage.asmx/GetAllPage',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'p_szCaseNo': caseNo,
                    'p_szCreateDTime': createDTime
                })
            }).then((response) => response.json())
            .then((data) => {
                // response in data
                console.log(JSON.parse(data.d));
                setPages(JSON.parse(data.d));
            }).catch((error) => {
                //handle your error
            });
            // const responseData = {
            //     "fileName": "Case08統一藥品自我檢測驗孕盤_紙盒",
            //     "pageSize": 3,
            //     "pages": [
            //         {
            //             "page": 1,
            //             "filePathSets": "https://www.yunchun.com.tw/upload/20191017113153s1agd1.png",
            //         },
            //         {
            //             "page": 2,
            //             "filePathSets": "https://www.yunchun.com.tw/upload/20191017113153s1agd1.png",
            //         },
            //         {
            //             "page": 3,
            //             "filePathSets": "https://www.yunchun.com.tw/upload/20191017113153s1agd1.png",
            //         },
            //         {
            //             "page": 4,
            //             "filePathSets": "https://www.yunchun.com.tw/upload/20191017113153s1agd1.png",
            //         },
            //     ]
            // };
    };

    const handleSelectTarget = (i) => {
        setActivePageId(i);
    }

    return (
        
        <Wrapper>
            <Sidebar>
                <ul>
                    {pages !== null &&
                        pages.map((item, index) => {
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
            </Sidebar>
            {pages !== null ? <ContentArea content={pages[activePageId]} fileName={caseNo} pageIndex={pages[activePageId].Page} />:<Loading><FontAwesomeIcon className="icon" icon={faSpinner}  size="4x"  spin /></Loading>}
        </Wrapper>
    );
}

export default Detail;
