import React, { useContext, useEffect, createContext, useReducer } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import API from '../API';
const CaseContext = createContext();
const initialState = {
    caseNo: '',
    createDTime: '',
    pageList: [
        {
            "Page": 0,
            "FilePathSets": [
                "", "", "", "", "",
            ],
            "Sets": [
                { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 28, "Y": 50, "Width": 232, "Height": 54 }, "Page": 0, "BoxIndex": 1, "OcrSSIM": 1.0, "SrcText": "MeDiPro", "RefText": "MeDiPro", "Pass": false }],
            "PassSets": [
                {
                    "Page": 0,
                    "BoxIndex": 1,
                    "Pass": true,
                },
            ]
        }
    ]
};
const reducer = (state, action) => {
    switch (action.type) {
        case 'fetch_success':
            console.log(`REDUCER FETCH_SUCCESS : ${action.pageList}`);
            return {
                caseNo: action.caseNo,
                createDTime: action.createDTime,
                pageList: action.pageList,
            };
        case 'pass_check':
            console.log(`REDUCER pass_check : ${state.caseNo} //// ${state.createDTime} index: ${action.boxIndex} page: ${action.pageNum}`);
            let checkedState = Object.assign({}, state);
            checkedState.pageList[action.pageNum].Sets.forEach(PassSet => {
                if (PassSet.BoxIndex === action.boxIndex) {
                    PassSet.Pass = true;
                }
            });
            return checkedState;
        default:
            return state;
    }
}
export const CaseContextProvider = ({ children }) => {
    const { caseNo, createDTime } = useParams();
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        fetchPageList();
        //fetchPageListTest();
    }, []);
    const fetchPageList = async () => {
        try {
            console.log(`here gets caseNo: ${caseNo} & createDTime: ${createDTime}`);
            const data = await API.getPageList(caseNo, createDTime);
            const pageList = JSON.parse(data.d);
            //console.log(`data d parsr ::${pageList.length}::: ${pageList[0].Sets}`);
            if (pageList.length === 0 || pageList === null) {
                alert(`no page data`);
                back();
            } else if (pageList[0].Sets.length === 0) {
                alert(`no Sets in page`);
                back();
            } else {
                //turn to pass 
                console.log(`PassSets 0 ${JSON.stringify(pageList[0].PassSets)}`)
                for (let i = 0; i < pageList.length; i++) {
                    pageList[i].PassSets.forEach(PassSet => {
                        const isPass = (element) => element.BoxIndex === PassSet.boxIndex;
                        let passIndex = pageList[0].Sets.findIndex(isPass);
                        if (passIndex !== -1) {
                            pageList[i].Sets[passIndex].Pass = true;
                        }
                    });
                }
                //setPages({ caseNo: caseNo, createDTime: createDTime, pageList: pageList });
                dispatch({ type: 'fetch_success', caseNo: caseNo, createDTime: createDTime, pageList: pageList })
            }
        } catch (error) {
            alert(error);
            back();
        }
    };
    //fake data test
    const fetchPageListTest = () => {
        console.log(`here gets caseNo: ${caseNo} & createDTime: ${createDTime}`);
        let data = [
            {
                "Page": 0,
                "FilePathSets": [
                    "https://i.epochtimes.com/assets/uploads/2021/11/id13392306-3526-2021-11-23-093833.jpg",
                    "http://upload.wikimedia.org/wikipedia/commons/3/32/EVD_Document1.jpg",
                    "https://web-tuts.com/abc_content/uploads/2021/01/jQuery-Get-Image-Src-and-Set-Image-Src.fw-min-750x445.png",
                    "https://c0.wallpaperflare.com/preview/104/979/585/india-sikkim-lake-mountent-thumbnail.jpg",
                    "https://w0.peakpx.com/wallpaper/370/878/HD-wallpaper-hogwarts-express-potter-harry-viaduct-glenfinnan.jpg",
                ],
                "Sets": [
                    { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 28, "Y": 50, "Width": 232, "Height": 54 }, "Page": 0, "BoxIndex": 1, "OcrSSIM": 1.0, "SrcText": "MeDiPro", "RefText": "MeDiPro", "Pass": false },
                    { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 570, "Y": 52, "Width": 132, "Height": 30 }, "Page": 0, "BoxIndex": 2, "OcrSSIM": 0.375, "SrcText": "保存侏什2-8C", "RefText": "(保存條件2-", "Pass": false },
                    { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 481, "Y": 59, "Width": 76, "Height": 42 }, "Page": 0, "BoxIndex": 3, "OcrSSIM": 0.0, "SrcText": "WD", "RefText": "IL", "Pass": false },
                    { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 280, "Y": 66, "Width": 194, "Height": 36 }, "Page": 0, "BoxIndex": 4, "OcrSSIM": 1.0, "SrcText": "AC-00013-05", "RefText": "AC-00013-05", "Pass": false },
                    { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 576, "Y": 76, "Width": 76, "Height": 36 }, "Page": 0, "BoxIndex": 5, "OcrSSIM": 0.4, "SrcText": "10 ml", "RefText": " 10 n", "Pass": false },
                    { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 130, "Y": 98, "Width": 40, "Height": 12 }, "Page": 0, "BoxIndex": 6, "OcrSSIM": "-Infinity", "SrcText": "", "RefText": "Diagno", "Pass": false },
                    { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 9, "Y": 116, "Width": 392, "Height": 66 }, "Page": 0, "BoxIndex": 7, "OcrSSIM": 0.95652173913043481, "SrcText": "Antibody screening cell", "RefText": "Anfibody screening cell", "Pass": false },
                    { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 0, "Y": 162, "Width": 142, "Height": 115 }, "Page": 0, "BoxIndex": 8, "OcrSSIM": -1.0, "SrcText": "I", "RefText": "III", "Pass": false },
                    { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 127, "Y": 187, "Width": 236, "Height": 42 }, "Page": 0, "BoxIndex": 9, "OcrSSIM": 0.84615384615384615, "SrcText": "血球濃度 : 3i0.5%", "RefText": "血球濃度 : 3+0. 5%", "Pass": false },
                    { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 379, "Y": 205, "Width": 72, "Height": 40 }, "Page": 0, "BoxIndex": 10, "OcrSSIM": 0.25, "SrcText": "Lot:", "RefText": "L", "Pass": false },
                    { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 379, "Y": 255, "Width": 63, "Height": 45 }, "Page": 0, "BoxIndex": 11, "OcrSSIM": 0.0, "SrcText": "Exp", "RefText": "臼", "Pass": false },
                    { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 315, "Y": 318, "Width": 439, "Height": 53 }, "Page": 0, "BoxIndex": 12, "OcrSSIM": -1.5833333333333335, "SrcText": "日里土醫科枝服份有呎公司", "RefText": "oawosk Ho MebicAt fedhNotosyfo昂", "Pass": false },
                    { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 318, "Y": 356, "Width": 436, "Height": 32 }, "Page": 0, "BoxIndex": 13, "OcrSSIM": 0.0, "SrcText": "FORMU5A BloMtDICAL TEGHHotn6y CORI", "RefText": "", "Pass": false }
                ],
                "PassSets": [
                    {
                        "Page": 0,
                        "BoxIndex": 2,
                        "Pass": true,
                    },
                    {
                        "Page": 0,
                        "BoxIndex": 5,
                        "Pass": true,
                    },
                ]
            }, {
                "Page": 1,
                "FilePathSets": [
                    "https://i.epochtimes.com/assets/uploads/2021/11/id13392306-3526-2021-11-23-093833.jpg",
                    "http://upload.wikimedia.org/wikipedia/commons/3/32/EVD_Document1.jpg",
                    "https://i.epochtimes.com/assets/uploads/2021/11/id13392306-3526-2021-11-23-093833.jpg",
                    "http://upload.wikimedia.org/wikipedia/commons/3/32/EVD_Document1.jpg",
                    "https://i.epochtimes.com/assets/uploads/2021/11/id13392306-3526-2021-11-23-093833.jpg",
                ],
                "Sets": [
                    { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 28, "Y": 50, "Width": 232, "Height": 54 }, "Page": 0, "BoxIndex": 1, "OcrSSIM": 1.0, "SrcText": "MeDiPro", "RefText": "MeDiPro", "Pass": false },
                    { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 570, "Y": 52, "Width": 132, "Height": 30 }, "Page": 0, "BoxIndex": 2, "OcrSSIM": 0.375, "SrcText": "保存侏什2-8C", "RefText": "(保存條件2-", "Pass": false },
                    { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 481, "Y": 59, "Width": 76, "Height": 42 }, "Page": 0, "BoxIndex": 3, "OcrSSIM": 0.0, "SrcText": "WD", "RefText": "IL", "Pass": false },
                    { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 280, "Y": 66, "Width": 194, "Height": 36 }, "Page": 0, "BoxIndex": 4, "OcrSSIM": 1.0, "SrcText": "AC-00013-05", "RefText": "AC-00013-05", "Pass": false },
                    { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 576, "Y": 76, "Width": 76, "Height": 36 }, "Page": 0, "BoxIndex": 5, "OcrSSIM": 0.4, "SrcText": "10 ml", "RefText": " 10 n", "Pass": false },
                    { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 130, "Y": 98, "Width": 40, "Height": 12 }, "Page": 0, "BoxIndex": 6, "OcrSSIM": "-Infinity", "SrcText": "", "RefText": "Diagno", "Pass": false },
                    { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 9, "Y": 116, "Width": 392, "Height": 66 }, "Page": 0, "BoxIndex": 7, "OcrSSIM": 0.95652173913043481, "SrcText": "Antibody screening cell", "RefText": "Anfibody screening cell", "Pass": false },
                ],
                "PassSets": [
                    {
                        "Page": 0,
                        "BoxIndex": 2,
                        "Pass": true,
                    },
                    {
                        "Page": 0,
                        "BoxIndex": 5,
                        "Pass": true,
                    },
                    {
                        "Page": 0,
                        "BoxIndex": 6,
                        "Pass": true,
                    },
                    {
                        "Page": 0,
                        "BoxIndex": 7,
                        "Pass": true,
                    },
                ]
            }
        ];
        for (let i = 0; i < data.length; i++) {
            data[i].PassSets.forEach(PassSet => {
                const isPass = (element) => element.BoxIndex === PassSet.BoxIndex;
                let passIndex = data[0].Sets.findIndex(isPass);
                if (passIndex !== -1) {
                    data[i].Sets[passIndex].Pass = true;
                }
            });
        }
        console.log(`heres get fake pages ${data}`)
        // setPages({ caseNo: caseNo, createDTime: createDTime, pageList: data });
        dispatch({ type: 'fetch_success', caseNo: caseNo, createDTime: createDTime, pageList: data })
    };
    const back = () => {
        navigate(-1);
    }
    return (
        <CaseContext.Provider value={{ pages: state, setDispatch: dispatch }}>
            {children}
        </CaseContext.Provider>
    );
}

export const useAPI = () => {
    const context = useContext(CaseContext);
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}

