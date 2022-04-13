import { React, useEffect, useRef,useState } from "react";
import { Wrapper, Box, Canvas, BoxText } from './DetailCanvas.styles';
import { useAPI } from "../apiContext";
import { PanZoom } from 'react-easy-panzoom';


const DetailCanvas = ({index,pageIndex}) => {
    const canvasRef = useRef(null);
    const canvasSrc = useRef(null);
    const { pages } = useAPI();
    const pageBase = pages.pageList[pageIndex];
    
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {drawCanvaDetail()},[index,pageIndex]);
        
    const drawCanvaDetail = ()=>{
            let count = 2;
                //source canvas area
                const canvasSrcObj = canvasSrc.current;
                const canvasSrcCtx = canvasSrcObj.getContext('2d');
                const imgSrc = new Image();
                imgSrc.style = loaded ? {} : { display: 'none' };
                imgSrc.src = pageBase.FilePathSets[4];
                imgSrc.onload = () => {
                    canvasSrcObj.width = pageBase.Sets[index].Rect.Width;
                    canvasSrcObj.height = pageBase.Sets[index].Rect.Height;
                    canvasSrcCtx.drawImage(
                        imgSrc, 
                        pageBase.Sets[index].Rect.X, 
                        pageBase.Sets[index].Rect.Y, 
                        pageBase.Sets[index].Rect.Width, 
                        pageBase.Sets[index].Rect.Height, 
                        0, 0, 
                        pageBase.Sets[index].Rect.Width, 
                        pageBase.Sets[index].Rect.Height
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
                    canvasRefObj.width = pageBase.Sets[index].Rect.Width;
                    canvasRefObj.height = pageBase.Sets[index].Rect.Height;
                    canvasRefCtx.drawImage(
                        imgRef, 
                        pageBase.Sets[index].Rect.X, 
                        pageBase.Sets[index].Rect.Y, 
                        pageBase.Sets[index].Rect.Width, 
                        pageBase.Sets[index].Rect.Height, 
                        0, 0, 
                        pageBase.Sets[index].Rect.Width, 
                        pageBase.Sets[index].Rect.Height
                        );
                        count--;
                }
                if(count===0) setLoaded(true);
    }
    return (
        <Wrapper>
            <Box>
                <BoxText>source</BoxText>
                <PanZoom
                    boundaryRatioVertical={0.9}
                    boundaryRatioHorizontal={0.9}
                    enableBoundingBox>
                    <Canvas ref={canvasSrc} />
                </PanZoom>
            </Box>
            <Box>
                <BoxText>reference</BoxText>
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