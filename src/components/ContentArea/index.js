import React, { useState } from "react";
import classNames from 'classnames';
import { Wrapper, ActionGroup, ControlBar, Grid, ContentList, Button, ToggleButton } from './ContentArea.styles';

import ContentCanvas from '../ContentCanvas';
import DetailCanvas from '../DetailCanvas';
import DetailInfo from '../DetailInfo';

const ContentArea = ({ content, fileName }) => {
    const [activeTargetId, setActiveTargetId] = useState(0); //active ocr area
    const [activePathId, setActivePathId] = useState(0); //active file display Display
    const [isAlign, setIsAlign] = useState(true); //Only align pattern show detection block
    const [hide, setHide] = useState(false);
    const [pageContent, setPageContent]=useState(content);

    const handleCurrFile = (i) => {
        setActivePathId(i);
        i !== 0 ? setIsAlign(false) : setIsAlign(true);
    }
    const changeList = () => {
        setHide(!hide);
    }

    return (
        <Wrapper>
            <ControlBar>
                <h3>{`${fileName} page:${pageContent.Page}`}</h3>
                <ActionGroup>
                    {pageContent.FilePathSets.map((item, index) => {
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
            <Grid isMain={true}>
                <ContentList>
                    <ToggleButton onClick={() => changeList()}>show all/issue only </ToggleButton>
                    <ul>
                        {pageContent.Sets.map((item, index) =>
                            <ListItem key={item.BoxIndex} item={item} index={index} setActiveTargetId={setActiveTargetId} activeTargetId={activeTargetId} hide={hide} />
                        )}
                    </ul>
                </ContentList>
                <ContentCanvas
                    currFile={pageContent.FilePathSets[activePathId]}
                    target={pageContent.Sets[activeTargetId].Rect}
                    isAlign={isAlign} />
            </Grid>
            <Grid isMain={false}>
                <DetailInfo
                    index={activeTargetId}
                    srcText={pageContent.Sets[activeTargetId].SrcText}
                    refText={pageContent.Sets[activeTargetId].RefText}
                    ocrSSIM={pageContent.Sets[activeTargetId].OcrSSIM}
                    ssim={pageContent.Sets[activeTargetId].Ssim}
                    qatm_score={pageContent.Sets[activeTargetId].Qatm_score}
                    pass={pageContent.Sets[activeTargetId].Pass}
                    setPageContent={setPageContent} />
                <DetailCanvas
                    srcFile={pageContent.FilePathSets[4]}
                    refFile={pageContent.FilePathSets[3]}
                    target={pageContent.Sets[activeTargetId].Rect} />
            </Grid>
        </Wrapper>
    )
}

const ListItem = ({ item, index, setActiveTargetId, activeTargetId, hide }) => {
    const handleSelectTarget = (i) => {
        setActiveTargetId(i);
    }
    let liClasses = classNames({
        'success': (item.OcrSSIM < 1 && item.Pass) ? true : false,
        'error': (item.OcrSSIM < 1 && !item.Pass) ? true : false,
        'active': (activeTargetId === index) ? true : false,
        'd-none': (item.OcrSSIM === 1) ? hide : false,
    });
    return (
        <li
            key={item.BoxIndex}
            className={liClasses}
            onClick={() => handleSelectTarget(index)}
            title={`ocr:${item.OcrSSIM}/src:${item.SrcText}`}>{item.BoxIndex}. {item.SrcText}:{item.OcrSSIM}</li>
    );
}

export default ContentArea;