import React,{ useEffect, useState,useContext } from "react";
import classNames from 'classnames';
import { Wrapper, ActionGroup, ControlBar, ContentWrapper, DetailWrapper, ContentList, Button, DetailInfo, InfoContent, CheckContent } from './ContentArea.styles';

import ContentCanvas from '../ContentCanvas';
import DetailCanvas from '../DetailCanvas';

const ContentArea = ({ content, fileName }) => {
    const [activeTargetId, setActiveTargetId] = useState(0); //active ocr area
    const [activePathId, setActivePathId] = useState(0); //active file display Display
    const [isAlign, setIsAlign] = useState(true); //Only align pattern show detection block
    const [disabled, setDisabled] = useState(true); //check button disabled
    const [hide, setHide] = useState(false); 
    

    const handleSelectTarget = (i) => {
        setActiveTargetId(i);
        let currentTarget = content.Sets[i];
        setDisabled(currentTarget.Pass || currentTarget.OcrSSIM === 1 ? true : false);
    }
    const handleCurrFile = (i) => {
        setActivePathId(i);
        i !== 0 ? setIsAlign(false) : setIsAlign(true);
    }
    const handleCheck = (i) => {
        console.log(i);
    }
    const changeList = () => {
        setHide(!hide);
    }

    useEffect(() => {
        console.log(`here's content ${JSON.stringify(content)}`)
    }, [])


    return (
        <Wrapper>
            <ControlBar>
                <h3>{content && `${fileName} page:${content.Page}`}</h3>
                <ActionGroup>
                    {content && content.FilePathSets.map((item, index) => {
                        const btnTextIndex = ["align overlay", "original overlay", "source", "reference", "source(align)"];
                        let btnClasses = classNames({
                            'active': (activePathId === index) ? true : false,
                        });
                        return (
                            <Button key={"filePath_" + index} className={btnClasses} onClick={() => handleCurrFile(index)}>{btnTextIndex[index]}</Button>
                        )
                    })}
                </ActionGroup>
            </ControlBar>
            <ContentWrapper>
                <ContentList>
                    <button onClick={() => changeList()}>show all/issue only </button>
                    <ul>
                        {content && content.Sets.map((item, index) => {

                            let liClasses = classNames({
                                'success': (item.OcrSSIM < 1 && item.Pass) ? true : false,
                                'error': (item.OcrSSIM < 1 && !item.Pass) ? true : false,
                                'active': (activeTargetId === index) ? true : false,
                                'd-none': (item.OcrSSIM === 1) ? hide : false,
                            });
                            return (
                                <li key={item.BoxIndex} className={liClasses} onClick={() => handleSelectTarget(index)} title={`ocr:${item.OcrSSIM}/src:${item.SrcText}`}>{item.BoxIndex}. {item.SrcText}:{item.OcrSSIM}</li>
                            )
                        })}
                    </ul>
                </ContentList>
                {content ?
                    <ContentCanvas currFile={content.FilePathSets[activePathId]} target={content.Sets[activeTargetId].Rect} isAlign={isAlign} />
                    :
                    <ContentCanvas currFile={""} target={{}} />
                }
            </ContentWrapper>
            <DetailWrapper>
                <DetailInfo>
                    {content &&
                        <InfoContent>
                            <strong>src:</strong>{content.Sets[activeTargetId].SrcText}<br />
                            <strong>ref:</strong>{content.Sets[activeTargetId].RefText}<br />
                            <strong>ocr SSIM:</strong>{content.Sets[activeTargetId].OcrSSIM}<br />
                            <strong>SSIM:</strong>{content.Sets[activeTargetId].Ssim}<br />
                            <strong>qatm score:</strong>{content.Sets[activeTargetId].Qatm_score}<br />
                        </InfoContent>
                    }
                    <CheckContent>
                        <Button disabled={disabled} onClick={() => handleCheck(content.Sets[activeTargetId].BoxIndex)}>manual checked</Button>
                    </CheckContent>
                </DetailInfo>
                {content ?
                    <DetailCanvas srcFile={content.FilePathSets[4]} refFile={content.FilePathSets[3]} target={content.Sets[activeTargetId].Rect} />
                    :
                    <DetailCanvas srcFile={""} refFile={""} target={{}} />
                }
            </DetailWrapper>
        </Wrapper>
    )
}

export default ContentArea;