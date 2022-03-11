import React, { useEffect, useState } from "react";
import { Wrapper,Info,CheckDiv,Button } from './DetailInfo.styles';
const DetailInfo = ({ index, srcText, refText, ocrSSIM, ssim, qatm_score, pass }) => {
    const [disabled, setDisabled] = useState(true); //check button disabled
    const handleCheck = (i) => {
        console.log(i);
    }
    useEffect(() => {
        setDisabled(pass || ocrSSIM === 1 ? true : false);
    }, [pass, ocrSSIM])
    return (
        <Wrapper>
            <Info>
                <strong>src:</strong>{srcText}<br />
                <strong>ref:</strong>{refText}<br />
                <strong>ocr SSIM:</strong>{ocrSSIM}<br />
                <strong>SSIM:</strong>{ssim}<br />
                <strong>qatm score:</strong>{qatm_score}<br />
            </Info>
            <CheckDiv>
                <Button disabled={disabled} onClick={() => handleCheck(index)}>manual checked</Button>
            </CheckDiv>
        </Wrapper>
    )
};
export default DetailInfo;