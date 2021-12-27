import { React, useEffect, useRef } from "react";
import { Wrapper, Box, Canvas, BoxText } from './DetailCanvas.styles';
//import testImg from '../../images/caseA0827_save_ref_1.jpg';
import { PanZoom } from 'react-easy-panzoom'

const DetailCanvas = ({srcFile,refFile, target}) => {
    const canvasRef = useRef(null);
    const canvasSrc = useRef(null);

    useEffect(() => {

        //source canvas area
        const canvasSrcObj = canvasSrc.current;
        const canvasSrcCtx = canvasSrcObj.getContext('2d');
        const imgSrc = new Image();
        imgSrc.src = srcFile;
        imgSrc.onload = () => {
            canvasSrcObj.width = target.width;
            canvasSrcObj.height = target.height;
            canvasSrcCtx.drawImage(
                imgSrc, 
                target.x, 
                target.y, 
                target.width, 
                target.height, 
                0, 0, 
                target.width, 
                target.height
                );
        }

        //reference canvas area
        const canvasRefObj = canvasRef.current;
        const canvasRefCtx = canvasRefObj.getContext('2d');
        const imgRef = new Image();
        imgRef.src = refFile;
        imgRef.onload = () => {
            canvasRefObj.width = target.width;
            canvasRefObj.height = target.height;
            canvasRefCtx.drawImage(
                imgRef, 
                target.x, 
                target.y, 
                target.width, 
                target.height, 
                0, 0, 
                target.width, 
                target.height
                );
        }
    });
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