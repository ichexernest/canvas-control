import React, { useState,useEffect,useContext } from "react";
import classNames from 'classnames';
import { Wrapper, ActionGroup, ControlBar, Grid, ContentList, Button, ToggleButton } from './ContentArea.styles';
import ContentCanvas from '../ContentCanvas';
import DetailCanvas from '../DetailCanvas';
import DetailInfo from '../DetailInfo';
import { useAPI } from "../apiContext";

const ContentArea = ({ activePageId }) => {
    const [activeTargetId, setActiveTargetId] = useState(0); //active ocr area
    const [activePathId, setActivePathId] = useState(0); //active file display Display
    const [isAlign, setIsAlign] = useState(true); //Only align pattern show detection block
    const [hide, setHide] = useState(false);
    const { pages } = useAPI();
    const handleCurrFile = (i) => {
        setActivePathId(i);
        i !== 0 ? setIsAlign(false) : setIsAlign(true);
    }
    const changeList = () => {
        setHide(!hide);
    }

    const modifiedBoxPass = async () => {
        try {
            //console.log(`here gets caseNo: ${caseNo} & createDTime: ${createDTime} &page: ${pageContent.Page} &boxIndex: ${pageContent.Sets[activeTargetId].BoxIndex}`);
            //const iCount = await API.modifiedBoxPass(caseNo, createDTime, pageContent.Page, pageContent.Sets[activeTargetId].BoxIndex);
            
            // if(iCount!==0){
            //     //success
            // }else{
            //     //error
            // }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Wrapper>
            <ControlBar>
                <h3>{`${pages.caseNo} page:${pages.pageList[activePageId].Page}`}</h3>
                <ActionGroup>
                    {pages.pageList[activePageId].FilePathSets.map((item, index) => {
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
                        {pages.pageList[activePageId].Sets.map((item, index) =>
                            <ListItem key={item.BoxIndex} item={item} index={index} setActiveTargetId={setActiveTargetId} activeTargetId={activeTargetId} hide={hide} />
                        )}
                    </ul>
                </ContentList>
                <ContentCanvas
                    currFile={pages.pageList[activePageId].FilePathSets[activePathId]}
                    target={pages.pageList[activePageId].Sets[activeTargetId].Rect}
                    isAlign={isAlign} />
            </Grid>
            <Grid isMain={false}>
                <DetailInfo
                    index={activeTargetId}
                    srcText={pages.pageList[activePageId].Sets[activeTargetId].SrcText}
                    refText={pages.pageList[activePageId].Sets[activeTargetId].RefText}
                    ocrSSIM={pages.pageList[activePageId].Sets[activeTargetId].OcrSSIM}
                    ssim={pages.pageList[activePageId].Sets[activeTargetId].Ssim}
                    qatm_score={pages.pageList[activePageId].Sets[activeTargetId].Qatm_score}
                    boxIndex={pages.pageList[activePageId].Sets[activeTargetId].BoxIndex}
                    pass={pages.pageList[activePageId].Sets[activeTargetId].Pass}
                    //setPageContent={setPageContent}
                    modifiedBoxPass={modifiedBoxPass} />
                <DetailCanvas
                    srcFile={pages.pageList[activePageId].FilePathSets[4]}
                    refFile={pages.pageList[activePageId].FilePathSets[3]}
                    target={pages.pageList[activePageId].Sets[activeTargetId].Rect} />
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