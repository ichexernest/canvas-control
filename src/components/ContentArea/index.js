import { React, useState, useEffect } from "react";
import classNames from 'classnames';
import { Wrapper, ActionGroup, ControlBar, ContentWrapper, DetailWrapper, ContentList, Button, DetailInfo, InfoContent, CheckContent } from './ContentArea.styles';

import ContentCanvas from '../ContentCanvas';
import DetailCanvas from '../DetailCanvas';

const ContentArea = () => {
    const targetList = {
        "page": 10,
        "srcPath": "https://avatars.githubusercontent.com/u/8511318?v=4",
        "refPath": "https://avatars.githubusercontent.com/u/14338007?v=4",
        "ogPath": "https://avatars.githubusercontent.com/u/1450567?v=4",
        "alignfPath": "https://avatars.githubusercontent.com/u/10567?v=4",
        "sets": [
            { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 1978, "y": 179, "width": 265, "height": 58 }, "page": 0, "boxIndex": 1, "ocrSSIM": 1.0, "srcText": "\u885B\u7F72\u91AB\u5668\u88FD\u5B57", "refText": "\u885B\u7F72\u91AB\u5668\u88FD\u5B57", "pass": false },
            { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 189, "y": 186, "width": 1101, "height": 97 }, "page": 0, "boxIndex": 2, "ocrSSIM": 0.8888888888888888, "srcText": "\u53F0\u5851\u751F\u91AB\u4EBA\u5DE5\u4EE3\u7528\u9AA8(\u518D\u5438\u6536\u9AA8\u586B\u5145\u7269)", "refText": "\u53F0\u5851\u751F\u91AB\u4EBA\u4E8C\u4EE3\u7528\u9AA8(\u518D\u5438\u6536\u9AA8\u586B\u5145\u7269", "pass": true },
            { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 1981, "y": 233, "width": 254, "height": 56 }, "page": 0, "boxIndex": 3, "ocrSSIM": 1.0, "srcText": "\u7B2C 002768 \u865F", "refText": "\u7B2C 002768 \u865F", "pass": false },
            { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 1982, "y": 286, "width": 260, "height": 46 }, "page": 0, "boxIndex": 4, "ocrSSIM": 0.9166666666666666, "srcText": "V6.0 2013/08", "refText": "/6.0 2013/08", "pass": false },
            { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 187, "y": 290, "width": 202, "height": 67 }, "page": 0, "boxIndex": 5, "ocrSSIM": 1.0, "srcText": "Formosa", "refText": "Formosa", "pass": false },
            { "index": 0, "ssim": 0.0, "qatm_score": 0.0, "rect": { "x": 423, "y": 291, "width": 1090, "height": 67 }, "page": 0, "boxIndex": 6, "ocrSSIM": 0.9375, "srcText": "Bone Graft -CALTRIX Resorbable Bone Void Filler)", "refText": "Bone Graft-CALTRIX Resorbable Bone oid Filler", "pass": false },
        ]
    };
    const [activeId, setActiveId] = useState();
    const [targets, setTargets] = useState(targetList);
    const [target, setTarget] = useState(
        {
            "index": 0,
            "ssim": 0.0,
            "qatm_score": 0.0,
            "rect": {
                "x": -1,
                "y": -1,
                "width": -1,
                "height": -1
            },
            "page": -1,
            "boxIndex": 0,
            "ocrSSIM": 0,
            "srcText": "",
            "refText": "",
            "pass": false
        });
    const [currImage, setCurrImage] = useState("https://avatars.githubusercontent.com/u/8511318?v=4");   
    const handleSelectTarget = (i) => {
        setActiveId(i)
        let currentTarget = targets.sets[i];
        console.log(`click index ${i} `)
        setTarget({
            ...currentTarget
        })
    }
    const handleCurrImage = (img) => {
        setCurrImage(img);
    }
    const handleCheck = () => {
    }


    return (
        <Wrapper>
            <ControlBar>
                <h3>page_title</h3>
                <ActionGroup>
                    <Button onClick={() => handleCurrImage(targets.srcPath)}>input</Button>
                    <Button onClick={() => handleCurrImage(targets.refPath)}>reference</Button>
                    <Button onClick={() => handleCurrImage(targets.ogPath)}>original overlay</Button>
                    <Button onClick={() => handleCurrImage(targets.alignfPath)}>align overlay</Button>
                </ActionGroup>
            </ControlBar>
            <ContentWrapper>
                <ContentList>
                    <ul>
                        {targets.sets.map((item, index) => {

                            let liClasses = classNames({
                                'error': (item.ocrSSIM < 1 && item.pass) ? true : false,
                                'active': (activeId === index) ? true : false,
                            });
                            return (
                                <li key={index} className={liClasses} onClick={() => handleSelectTarget(index)} title={`ocr:${item.ocrSSIM}/src:${item.srcText}`}>{item.srcText}:{item.ocrSSIM}</li>
                            )
                        })}
                    </ul>
                </ContentList>
                <ContentCanvas currImage={currImage} target={target.rect} />
            </ContentWrapper>
            <ControlBar>
                <h3>detection_check_area</h3>
            </ControlBar>
            <DetailWrapper>
                <DetailInfo>
                    <InfoContent>
                        <strong>src:</strong>{target.srcText}<br />
                        <strong>ref:</strong>{target.refText}<br />
                        <strong>ocr SSIM:</strong>{target.ocrSSIM}<br />
                        <strong>SSIM:</strong>{target.ssim}<br />
                        <strong>qatm score:</strong>{target.qatm_score}<br />
                    </InfoContent>
                    <CheckContent>
                        <Button disabled={target.pass || (target.ocrSSIM > 0.9 && !target.pass)} onClick={() => handleCheck()}>manual checked</Button>
                    </CheckContent>
                </DetailInfo>
                <DetailCanvas currImage={currImage} target={target.rect} />
            </DetailWrapper>

        </Wrapper>
    )
}

export default ContentArea;