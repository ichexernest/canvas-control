import React, { useEffect, useRef, useState,useCallback } from "react";
import { Wrapper, Box, Canvas, BoxText } from './DetailCanvas.styles';
import { useAPI } from "../apiContext";
import { PanZoom } from 'react-easy-panzoom';


const DetailCanvas = ({ targetIndex, pageIndex }) => {
    const canvasRef = useRef(null);
    const canvasSrc = useRef(null);
    const { pages } = useAPI();
    const pageBase = pages.pageList[pageIndex];
    const [loaded, setLoaded] = useState(false);
    const drawCanvaDetail = useCallback(() => {
        let count = 2;
        //source canvas area
        const canvasSrcObj = canvasSrc.current;
        const canvasSrcCtx = canvasSrcObj.getContext('2d');
        const imgSrc = new Image();
        imgSrc.style = loaded ? {} : { display: 'none' };
        imgSrc.src = pageBase.FilePathSets[4];
        imgSrc.onload = () => {
            canvasSrcObj.width = pageBase.Sets[targetIndex].Rect.Width;
            canvasSrcObj.height = pageBase.Sets[targetIndex].Rect.Height;
            canvasSrcCtx.drawImage(
                imgSrc,
                pageBase.Sets[targetIndex].Rect.X,
                pageBase.Sets[targetIndex].Rect.Y,
                pageBase.Sets[targetIndex].Rect.Width,
                pageBase.Sets[targetIndex].Rect.Height,
                0, 0,
                pageBase.Sets[targetIndex].Rect.Width,
                pageBase.Sets[targetIndex].Rect.Height
            );
            count--;
        }

        //reference canvas area
        const canvasRefObj = canvasRef.current;
        const canvasRefCtx = canvasRefObj.getContext('2d');
        const imgRef = new Image();
        imgRef.style = loaded ? {} : { display: 'none' };
        imgRef.src = pageBase.FilePathSets[3];
        imgRef.onload = () => {
            canvasRefObj.width = pageBase.Sets[targetIndex].Rect.Width;
            canvasRefObj.height = pageBase.Sets[targetIndex].Rect.Height;
            canvasRefCtx.drawImage(
                imgRef,
                pageBase.Sets[targetIndex].Rect.X,
                pageBase.Sets[targetIndex].Rect.Y,
                pageBase.Sets[targetIndex].Rect.Width,
                pageBase.Sets[targetIndex].Rect.Height,
                0, 0,
                pageBase.Sets[targetIndex].Rect.Width,
                pageBase.Sets[targetIndex].Rect.Height
            );
            count--;
        }
        if (count === 0) setLoaded(true);
    }, [targetIndex, loaded, pageBase]);
    
    useEffect(() => { drawCanvaDetail() }, [drawCanvaDetail]);

    return (
        <Wrapper>
            <Box>
                <BoxText>局部特寫(擬校稿文件)</BoxText>
                <PanZoom
                    boundaryRatioVertical={0.9}
                    boundaryRatioHorizontal={0.9}
                    enableBoundingBox>
                    <Canvas ref={canvasSrc} />
                </PanZoom>
            </Box>
            <Box>
                <BoxText>局部特寫(參考文件)</BoxText>
                <PanZoom
                    boundaryRatioVertical={0.9}
                    boundaryRatioHorizontal={0.9}
                    enableBoundingBox>
                    <Canvas ref={canvasRef} />
                </PanZoom>
            </Box>
        </Wrapper>
    )
}

export default DetailCanvas;