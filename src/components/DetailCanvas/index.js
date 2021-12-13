import { React, useEffect, useRef, useState } from "react";
import { useCanvas } from '../../hooks/useCanvas';
import { Wrapper, Box, Canvas, BoxText } from './DetailCanvas.styles';
import testImg from '../../images/caseA0827_save_ref_1.jpg';
import { PanZoom } from 'react-easy-panzoom'

const DetailCanvas = ({target}) => {
    const canvasRef = useRef(null);
    const canvasSrc = useRef(null);
    //const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d');
        // clear the canvas area before rendering the coordinates held in state
        //ctx.clearRect( 0,0, canvasWidth, canvasHeight );

        // // draw all coordinates held in state
        // coordinates.forEach((coordinate)=>{draw(ctx, coordinate)});
        const img = new Image();
        img.src = testImg;
        img.onload = () => {
            canvasObj.width = target.width;
            canvasObj.height = target.height;
            ctx.drawImage(
                img, 
                target.x, 
                target.y, 
                target.width, 
                target.height, 
                0, 0, 
                target.width, 
                target.height
                );
        }

        const canvasObj2 = canvasSrc.current;
        const ctx2 = canvasObj2.getContext('2d');
        // clear the canvas area before rendering the coordinates held in state
        //ctx.clearRect( 0,0, canvasWidth, canvasHeight );

        // // draw all coordinates held in state
        // coordinates.forEach((coordinate)=>{draw(ctx, coordinate)});
        const img2 = new Image();
        img2.src = testImg;
        img2.onload = () => {
            canvasObj2.width = target.width;
            canvasObj2.height = target.height;
            ctx2.drawImage(
                img, 
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
                    <Canvas ref={canvasRef} />
                </PanZoom>
            </Box>
            <Box>
                <BoxText>reference</BoxText>
                <PanZoom
                    boundaryRatioVertical={0.9}
                    boundaryRatioHorizontal={0.9}
                    enableBoundingBox>
                    <Canvas ref={canvasSrc} />
                </PanZoom>
            </Box>
        </Wrapper>
    )
}

export default DetailCanvas;