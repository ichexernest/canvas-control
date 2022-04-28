import React, { useEffect, useState } from "react";
import { Wrapper, Info, CheckDiv, Button } from './DetailInfo.styles';
import { useAPI } from "../apiContext";
import API from '../../API';
const DetailInfo = ({ targetIndex, pageIndex }) => {
    const [disabled, setDisabled] = useState(true); //check button disabled
    const { pages, setDispatch } = useAPI();
    const handleCheck = (i) => {
        console.log(i);
        //post Change
        const modifiedBoxPass = async (caseNo,createDTime,page,boxIndex) => {
            try {
                const iCount = await API.modifiedBoxPass(caseNo, createDTime, page, boxIndex);
                console.log(iCount);
            } catch (error) {
                alert(error);
            }
        };
        modifiedBoxPass(pages.caseNo,pages.createDTime,pageIndex,i).then(()=>{
            setDispatch({
                type: "pass_check",
                pageNum: pageIndex,
                boxIndex: i
            })
        })
    }
    useEffect(() => {
        setDisabled(
            pages.pageList[pageIndex].Sets[targetIndex].Pass
            || pages.pageList[pageIndex].Sets[targetIndex].OcrSSIM === 1 ? true : false);
    }, [pages.pageList, pageIndex, targetIndex])

    return (
        <Wrapper>
            <Info>
                <strong>src:</strong>{pages.pageList[pageIndex].Sets[targetIndex].SrcText}<br />
                <strong>ref:</strong>{pages.pageList[pageIndex].Sets[targetIndex].RefText}<br />
                <strong>ocr SSIM:</strong>{pages.pageList[pageIndex].Sets[targetIndex].OcrSSIM}<br />
                <strong>SSIM:</strong>{pages.pageList[pageIndex].Sets[targetIndex].Ssim}<br />
                <strong>qatm score:</strong>{pages.pageList[pageIndex].Sets[targetIndex].Qatm_score}<br />
            </Info>
            <CheckDiv>
                <Button disabled={disabled} onClick={() => handleCheck(pages.pageList[pageIndex].Sets[targetIndex].BoxIndex)}>manual checked</Button>
            </CheckDiv>
        </Wrapper>
    )
};
export default DetailInfo;