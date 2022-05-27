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
    const { pages } = useAPI();
    const handleCurrFile = (i) => {
        setActivePathId(i);
    }
    useEffect(() => {
        setActiveTargetId(0)
    }, [activePageId])

    return (
        <Wrapper>
            <ControlBar>
                <h3>{`${pages.caseNo} 頁數:${pages.pageList[activePageId].Page}`}</h3>
                <ActionGroup>
                    {pages.pageList[activePageId].FilePathSets.map((item, index) => {
                        //const btnTextIndex = ["align overlay", "original overlay", "source", "reference", "source(align)"];
                        const btnTextIndexTC = ["對齊比對", "原始比對", "擬校稿文件", "參考文件", "擬校稿文件(對齊)"];
                        let btnClasses = classNames({
                            'active': (activePathId === index) ? true : false,
                        });
                        return (
                            <Button key={"filePath_" + index} className={btnClasses} onClick={() => handleCurrFile(index)}>{btnTextIndexTC[index]}</Button>
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
                        targetIndex={activeTargetId}
                        pageIndex={activePageId}
                        pathIndex={activePathId}
                    /> :
                    <ContentCanvas
                        targetIndex={0}
                        pageIndex={activePageId}
                        pathIndex={activePathId}
                    />}
            </Grid>
            <Grid isMain={false}>
                {pages.pageList[activePageId].Sets[activeTargetId] ?
                    <DetailInfo
                        targetIndex={activeTargetId}
                        pageIndex={activePageId} />
                    : <DetailInfo
                        targetIndex={0}
                        pageIndex={activePageId} />
                }
                {pages.pageList[activePageId].Sets[activeTargetId] ?
                    <DetailCanvas
                        targetIndex={activeTargetId}
                        pageIndex={activePageId} />
                    :
                    <DetailCanvas
                        targetIndex={0}
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
            <ToggleButton onClick={() => changeList()}>顯示全部 / 僅顯示標註項目</ToggleButton>
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