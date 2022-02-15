import { React, useState } from "react";
import classNames from 'classnames';
import { Wrapper, ActionGroup, ControlBar, ContentWrapper, DetailWrapper, ContentList, Button, DetailInfo, InfoContent, CheckContent } from './ContentArea.styles';

import ContentCanvas from '../ContentCanvas';
import DetailCanvas from '../DetailCanvas';

const ContentArea = ({ content,fileName, pageIndex }) => {
    const [activeTargetId, setActiveTargetId] = useState(0); //active ocr area
    const [activePathId, setActivePathId] = useState(0); //active file display Display
    const [isAlign, setIsAlign] = useState(true); //active file display Display
    const [disabled, setDisabled] = useState(true); //check button disabled
    //const [targets, setTargets] = useState(null); //main data

    // useEffect(() => {
    //         fetchTargetList(pageIndex)

    // }, [pageIndex])

    // const fetchTargetList = (pageIndex) => {
    //     const responseData = {
    //                 "page": 1,
    //                 "filePathSets": [
    //                     "https://avatars.githubusercontent.com/u/8511318?v=4",
    //                     "https://avatars.githubusercontent.com/u/14338007?v=4",
    //                     "https://avatars.githubusercontent.com/u/1450567?v=4",
    //                     "https://avatars.githubusercontent.com/u/10567?v=4",
    //                 ],
    //                 "sets": [
    //                     { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 1978, "y": 179, "width": 265, "height": 58 }, "page": 0, "boxIndex": 1, "ocrSSIM": 1.0, "srcText": "\u885B\u7F72\u91AB\u5668\u88FD\u5B57", "refText": "\u885B\u7F72\u91AB\u5668\u88FD\u5B57", "pass": false },
    //                     { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 189, "y": 186, "width": 1101, "height": 97 }, "page": 0, "boxIndex": 2, "ocrSSIM": 0.8888888888888888, "srcText": "\u53F0\u5851\u751F\u91AB\u4EBA\u5DE5\u4EE3\u7528\u9AA8(\u518D\u5438\u6536\u9AA8\u586B\u5145\u7269)", "refText": "\u53F0\u5851\u751F\u91AB\u4EBA\u4E8C\u4EE3\u7528\u9AA8(\u518D\u5438\u6536\u9AA8\u586B\u5145\u7269", "pass": true },
    //                     { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 1981, "y": 233, "width": 254, "height": 56 }, "page": 0, "boxIndex": 3, "ocrSSIM": 1.0, "srcText": "\u7B2C 002768 \u865F", "refText": "\u7B2C 002768 \u865F", "pass": false },
    //                     { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 1982, "y": 286, "width": 260, "height": 46 }, "page": 0, "boxIndex": 4, "ocrSSIM": 0.9166666666666666, "srcText": "V6.0 2013/08", "refText": "/6.0 2013/08", "pass": false },
    //                     { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 187, "y": 290, "width": 202, "height": 67 }, "page": 0, "boxIndex": 5, "ocrSSIM": 1.0, "srcText": "Formosa", "refText": "Formosa", "pass": false },
    //                     { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 423, "y": 291, "width": 1090, "height": 67 }, "page": 0, "boxIndex": 6, "ocrSSIM": 0.9375, "srcText": "Bone Graft -CALTRIX Resorbable Bone Void Filler)", "refText": "Bone Graft-CALTRIX Resorbable Bone oid Filler", "pass": false },
    //                 ]
    //             };

    //     setTargets(content);
    // };

    const handleSelectTarget = (i) => {
        setActiveTargetId(i);
        let currentTarget = content.Sets[i];
        setDisabled(currentTarget.Pass || currentTarget.OcrSSIM === 1 ? true : false);
    }
    const handleCurrFile = (i) => {
        setActivePathId(i);
        i!==0?setIsAlign(false):setIsAlign(true);
    }
    const handleCheck = (i) => {
    }


    return (
        <Wrapper>
            <ControlBar>
                <h3>{content !== null && `${fileName} page:${content.Page}`}</h3>
                <ActionGroup>
                    {content !== null && content.FilePathSets.map((item, index) => {
                        const btnTextIndex = ["align overlay","original overlay","source", "reference", "source(align)"];
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
                    <ul>
                        {content !== null && content.Sets.map((item, index) => {

                            let liClasses = classNames({
                                'success': (item.OcrSSIM < 1 && item.Pass) ? true : false,
                                'error': (item.OcrSSIM < 1 && !item.Pass) ? true : false,
                                'active': (activeTargetId === index) ? true : false,
                            });
                            return (
                                <li key={index} className={liClasses} onClick={() => handleSelectTarget(index)} title={`ocr:${item.OcrSSIM}/src:${item.SrcText}`}>{item.SrcText}:{item.OcrSSIM}</li>
                            )
                        })}
                    </ul>
                </ContentList>
                {content !== null ?
                    <ContentCanvas currFile={content.FilePathSets[activePathId]} target={content.Sets[activeTargetId].Rect} isAlign={isAlign}/>
                    :
                    <ContentCanvas currFile={""} target={{}} />
                }
            </ContentWrapper>
            <DetailWrapper>
                <DetailInfo>
                    {content !== null &&
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
                {content !== null ?
                    <DetailCanvas srcFile={content.FilePathSets[4]} refFile={content.FilePathSets[3]} target={content.Sets[activeTargetId].Rect} />
                    :
                    <DetailCanvas srcFile={""} refFile={""} target={{}} />
                }
            </DetailWrapper>
        </Wrapper>
    )
}

export default ContentArea;