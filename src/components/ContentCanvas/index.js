import { React, useEffect, useRef } from "react";
import { Wrapper, Canvas } from './ContentCanvas.styles';
//import testImg from '../../images/caseA0827_save_ref_1.jpg';
import { PanZoom } from 'react-easy-panzoom'

const ContentCanvas = ({currImage,target}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d');
        const img = new Image();
        img.src = currImage;
        img.onload = () => {
            canvasObj.height = img.height;
            canvasObj.width = img.width;
            ctx.drawImage(img, 0, 0);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "red";
            ctx.strokeRect(               
                target.x, 
                target.y, 
                target.width, 
                target.height, );
        }
    });
    return (
        <Wrapper>
            <PanZoom
                boundaryRatioVertical={0.9}
                boundaryRatioHorizontal={0.9}
                enableBoundingBox>
                <Canvas ref={canvasRef} />
            </PanZoom>
        </Wrapper>
    )
}

export default ContentCanvas;