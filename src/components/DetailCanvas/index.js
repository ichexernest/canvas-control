import { React, useEffect, useRef,useState } from "react";
import { Wrapper, Box, Canvas, BoxText } from './DetailCanvas.styles';
//import testImg from '../../images/caseA0827_save_ref_1.jpg';
import { PanZoom } from 'react-easy-panzoom'

const DetailCanvas = ({srcFile,refFile, target}) => {
    const canvasRef = useRef(null);
    const canvasSrc = useRef(null);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {drawCanvaDetail();});
        const drawCanvaDetail = ()=>{
            let count = 2;
                //source canvas area
                const canvasSrcObj = canvasSrc.current;
                const canvasSrcCtx = canvasSrcObj.getContext('2d');
                const imgSrc = new Image();
                imgSrc.style = loaded ? {} : { display: 'none' };
                imgSrc.src = srcFile;
                imgSrc.onload = () => {
                    canvasSrcObj.width = target.Width;
                    canvasSrcObj.height = target.Height;
                    canvasSrcCtx.drawImage(
                        imgSrc, 
                        target.X, 
                        target.Y, 
                        target.Width, 
                        target.Height, 
                        0, 0, 
                        target.Width, 
                        target.Height
                        );
                        count--;
                }

                //reference canvas area
                const canvasRefObj = canvasRef.current;
                const canvasRefCtx = canvasRefObj.getContext('2d');
                const imgRef = new Image();
                imgRef.style = loaded ? {} : { display: 'none' };
                imgRef.src = refFile;
                imgRef.onload = () => {
                    canvasRefObj.width = target.Width;
                    canvasRefObj.height = target.Height;
                    canvasRefCtx.drawImage(
                        imgRef, 
                        target.X, 
                        target.Y, 
                        target.Width, 
                        target.Height, 
                        0, 0, 
                        target.Width, 
                        target.Height
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