import React, { useState, useEffect } from "react";
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
    const { pages } = useAPI();
    const handleCurrFile = (i) => {
        setActivePathId(i);
        i !== 0 ? setIsAlign(false) : setIsAlign(true);
    }
    useEffect(() => {
        setActiveTargetId(0)
    }, [activePageId])

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
                <ListItem
                    activeTargetId={activeTargetId}
                    pageIndex={activePageId}
                    setActiveTargetId={setActiveTargetId} />
                {pages.pageList[activePageId].Sets[activeTargetId] ?
                    <ContentCanvas
                        index={activeTargetId}
                        pageIndex={activePageId}
                        pathIndex={activePathId}
                        isAlign={isAlign} /> :
                    <ContentCanvas
                        index={0}
                        pageIndex={activePageId}
                        pathIndex={activePathId}
                        isAlign={isAlign} />}
            </Grid>
            <Grid isMain={false}>
                {pages.pageList[activePageId].Sets[activeTargetId] ?
                    <DetailInfo
                        index={activeTargetId}
                        pageIndex={activePageId} />
                    : <DetailInfo
                        index={0}
                        pageIndex={activePageId} />
                }
                {pages.pageList[activePageId].Sets[activeTargetId] ?
                    <DetailCanvas
                        index={activeTargetId}
                        pageIndex={activePageId} />
                    :
                    <DetailCanvas
                        index={0}
                        pageIndex={activePageId} />
                }

            </Grid>
        </Wrapper>
    )
}

const ListItem = ({ setActiveTargetId, activeTargetId, pageIndex }) => {
    const [hide, setHide] = useState(false);
    const { pages } = useAPI();
    const handleSelectTarget = (i) => {
        console.log(`listItem clicked ${i}${pages.pageList[pageIndex].Sets.length}`)
        //切頁超過最大筆數會抓不到
        setActiveTargetId(i);
    }
    const changeList = () => {
        setHide(!hide);
    }

    return (
        <ContentList>
            <ToggleButton onClick={() => changeList()}>show all/issue only </ToggleButton>
            <ul>
                {pages.pageList[pageIndex].Sets.map((item, index) => {
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
                    )
                })}
            </ul>
        </ContentList>
    );
}

export default ContentArea;