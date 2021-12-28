import { React, useEffect, useState } from "react";
import { Wrapper,Title} from './Sidebar.styles';
const Sidebar = () => {

    const [pages, setPages] = useState(null); //main data
    useEffect(() => {
        fetchPageList();
    }, [])
    
    const fetchPageList = () => {
        const responseData = {
            "fileName":"aaa",
            "pageSize": 3,
            "pages": [
                {
                    "page": 1,
                    "filePathSets": [
                        "https://www.yunchun.com.tw/upload/20191017113153s1agd1.png",
                        "https://avatars.githubusercontent.com/u/14338007?v=4",
                        "https://avatars.githubusercontent.com/u/1450567?v=4",
                        "https://avatars.githubusercontent.com/u/10567?v=4",
                    ],
                    "sets": [
                        { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 1978, "y": 179, "width": 265, "height": 58 }, "page": 0, "boxIndex": 1, "ocrSSIM": 1.0, "srcText": "\u885B\u7F72\u91AB\u5668\u88FD\u5B57", "refText": "\u885B\u7F72\u91AB\u5668\u88FD\u5B57", "pass": false },
                        { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 189, "y": 186, "width": 1101, "height": 97 }, "page": 0, "boxIndex": 2, "ocrSSIM": 0.8888888888888888, "srcText": "\u53F0\u5851\u751F\u91AB\u4EBA\u5DE5\u4EE3\u7528\u9AA8(\u518D\u5438\u6536\u9AA8\u586B\u5145\u7269)", "refText": "\u53F0\u5851\u751F\u91AB\u4EBA\u4E8C\u4EE3\u7528\u9AA8(\u518D\u5438\u6536\u9AA8\u586B\u5145\u7269", "pass": true },
                        { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 1981, "y": 233, "width": 254, "height": 56 }, "page": 0, "boxIndex": 3, "ocrSSIM": 1.0, "srcText": "\u7B2C 002768 \u865F", "refText": "\u7B2C 002768 \u865F", "pass": false },
                        { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 1982, "y": 286, "width": 260, "height": 46 }, "page": 0, "boxIndex": 4, "ocrSSIM": 0.9166666666666666, "srcText": "V6.0 2013/08", "refText": "/6.0 2013/08", "pass": false },
                        { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 187, "y": 290, "width": 202, "height": 67 }, "page": 0, "boxIndex": 5, "ocrSSIM": 1.0, "srcText": "Formosa", "refText": "Formosa", "pass": false },
                        { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 423, "y": 291, "width": 1090, "height": 67 }, "page": 0, "boxIndex": 6, "ocrSSIM": 0.9375, "srcText": "Bone Graft -CALTRIX Resorbable Bone Void Filler)", "refText": "Bone Graft-CALTRIX Resorbable Bone oid Filler", "pass": false },
                    ]
                },
                {
                    "page": 2,
                    "filePathSets": [
                        "https://www.yunchun.com.tw/upload/20191017113153s1agd1.png",
                        "https://avatars.githubusercontent.com/u/14338007?v=4",
                        "https://avatars.githubusercontent.com/u/1450567?v=4",
                        "https://avatars.githubusercontent.com/u/10567?v=4",
                    ],
                    "sets": [
                        { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 1978, "y": 179, "width": 265, "height": 58 }, "page": 0, "boxIndex": 1, "ocrSSIM": 1.0, "srcText": "\u885B\u7F72\u91AB\u5668\u88FD\u5B57", "refText": "\u885B\u7F72\u91AB\u5668\u88FD\u5B57", "pass": false },
                        { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 189, "y": 186, "width": 1101, "height": 97 }, "page": 0, "boxIndex": 2, "ocrSSIM": 0.8888888888888888, "srcText": "\u53F0\u5851\u751F\u91AB\u4EBA\u5DE5\u4EE3\u7528\u9AA8(\u518D\u5438\u6536\u9AA8\u586B\u5145\u7269)", "refText": "\u53F0\u5851\u751F\u91AB\u4EBA\u4E8C\u4EE3\u7528\u9AA8(\u518D\u5438\u6536\u9AA8\u586B\u5145\u7269", "pass": true },
                        { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 1981, "y": 233, "width": 254, "height": 56 }, "page": 0, "boxIndex": 3, "ocrSSIM": 1.0, "srcText": "\u7B2C 002768 \u865F", "refText": "\u7B2C 002768 \u865F", "pass": false },
                        { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 1982, "y": 286, "width": 260, "height": 46 }, "page": 0, "boxIndex": 4, "ocrSSIM": 0.9166666666666666, "srcText": "V6.0 2013/08", "refText": "/6.0 2013/08", "pass": false },
                        { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 187, "y": 290, "width": 202, "height": 67 }, "page": 0, "boxIndex": 5, "ocrSSIM": 1.0, "srcText": "Formosa", "refText": "Formosa", "pass": false },
                        { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 423, "y": 291, "width": 1090, "height": 67 }, "page": 0, "boxIndex": 6, "ocrSSIM": 0.9375, "srcText": "Bone Graft -CALTRIX Resorbable Bone Void Filler)", "refText": "Bone Graft-CALTRIX Resorbable Bone oid Filler", "pass": false },
                    ]
                },
                {
                    "page": 3,
                    "filePathSets": [
                        "https://www.yunchun.com.tw/upload/20191017113153s1agd1.png",
                        "https://avatars.githubusercontent.com/u/14338007?v=4",
                        "https://avatars.githubusercontent.com/u/1450567?v=4",
                        "https://avatars.githubusercontent.com/u/10567?v=4",
                    ],
                    "sets": [
                        { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 1978, "y": 179, "width": 265, "height": 58 }, "page": 0, "boxIndex": 1, "ocrSSIM": 1.0, "srcText": "\u885B\u7F72\u91AB\u5668\u88FD\u5B57", "refText": "\u885B\u7F72\u91AB\u5668\u88FD\u5B57", "pass": false },
                        { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 189, "y": 186, "width": 1101, "height": 97 }, "page": 0, "boxIndex": 2, "ocrSSIM": 0.8888888888888888, "srcText": "\u53F0\u5851\u751F\u91AB\u4EBA\u5DE5\u4EE3\u7528\u9AA8(\u518D\u5438\u6536\u9AA8\u586B\u5145\u7269)", "refText": "\u53F0\u5851\u751F\u91AB\u4EBA\u4E8C\u4EE3\u7528\u9AA8(\u518D\u5438\u6536\u9AA8\u586B\u5145\u7269", "pass": true },
                        { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 1981, "y": 233, "width": 254, "height": 56 }, "page": 0, "boxIndex": 3, "ocrSSIM": 1.0, "srcText": "\u7B2C 002768 \u865F", "refText": "\u7B2C 002768 \u865F", "pass": false },
                        { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 1982, "y": 286, "width": 260, "height": 46 }, "page": 0, "boxIndex": 4, "ocrSSIM": 0.9166666666666666, "srcText": "V6.0 2013/08", "refText": "/6.0 2013/08", "pass": false },
                        { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 187, "y": 290, "width": 202, "height": 67 }, "page": 0, "boxIndex": 5, "ocrSSIM": 1.0, "srcText": "Formosa", "refText": "Formosa", "pass": false },
                        { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 423, "y": 291, "width": 1090, "height": 67 }, "page": 0, "boxIndex": 6, "ocrSSIM": 0.9375, "srcText": "Bone Graft -CALTRIX Resorbable Bone Void Filler)", "refText": "Bone Graft-CALTRIX Resorbable Bone oid Filler", "pass": false },
                    ]
                },
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
                    {pages !== null ?
                    pages.pages.map((item,index) => (
                        <li key={item + 1}>
                            <img src={item.filePathSets[0]} alt={item.page}/>
                            page: {item.page}
                        </li>
                    ))
                    :null}
                </ul>
        </Wrapper>
    )
}

export default Sidebar;