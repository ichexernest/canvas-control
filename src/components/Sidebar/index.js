import { React, useEffect, useState } from "react";
import { Wrapper,Title} from './Sidebar.styles';
import background from '../../images/835029.jpg';
const Sidebar = () => {
    const counters = Array.from({ length: 14 }, (_, index) => index);
    const initList = {
        "pageSize": 0,
        "pages": [
            {"page":0,"srcPath":""},
        ]
    };
    const [pages, setPages] = useState(initList); //main data
    useEffect(() => {
        fetchPageList();
    }, [])
    
    const fetchPageList = () => {
        const responseData = {
            "pageSize": 3,
            "pages": [
                {"page":1,"srcPath":"https://www.yunchun.com.tw/upload/20191017113153s1agd1.png"},
                {"page":2,"srcPath":"https://www.yunchun.com.tw/upload/20191017113153s1agd1.png"},
                {"page":3,"srcPath":"https://www.yunchun.com.tw/upload/20191017113153s1agd1.png"},
            ]
        };
        setPages(responseData);
    };
    return (
        <Wrapper>
            <Title>
                <h3>文件辨識結果檢視系統</h3>
            </Title>
                <ul>
                    {pages.pages.map((item,index) => (
                        <li key={item + 1}>
                            <img src={item.srcPath} alt={item.page}/>
                            page: {item.page}
                        </li>
                    ))}
                </ul>
        </Wrapper>
    )
}

export default Sidebar;