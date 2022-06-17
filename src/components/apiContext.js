import React, { useContext, useEffect, createContext, useReducer, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import API from '../API';
import ModalCard from "./ModalCard";
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
    const [show, setShow]= useState(false);
    const message = "file fetch error !!";
    useEffect(() => {
        const fetchPageList = async () => {
            try {
                console.log(`here gets caseNo: ${caseNo} & createDTime: ${createDTime}`);
                const data = await API.getPageList(caseNo, createDTime);
                const pageList = JSON.parse(data.d);
                //console.log(`data d parsr ::${pageList.length}::: ${pageList[0].Sets}`);
                if (pageList.length === 0 || pageList === null) {
                    alert("error: no page data");
                    back();
                } else if (pageList[0].Sets.length === 0) {
                    alert("error: no page set data");
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
        const back = () => {
            navigate(-1);
        };

        fetchPageList();
    }, [caseNo,createDTime,navigate]);
    return (
        <CaseContext.Provider value={{ pages: state, setDispatch: dispatch }}>
            <ModalCard show={show} setShow={setShow} content={message}  showLoading={false}></ModalCard>
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

