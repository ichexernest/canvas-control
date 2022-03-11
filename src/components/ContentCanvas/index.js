import { React, useEffect, useRef,useState } from "react";
import { Wrapper, Canvas,Loading } from './ContentCanvas.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { PanZoom } from 'react-easy-panzoom'

const ContentCanvas = ({currFile,target,isAlign}) => {
    const canvasRef = useRef(null);
    const [load, setLoad]= useState(false);
    useEffect(() => {
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d');
        const img = new Image();
        img.src = currFile;
        img.onload = () => {
            //setLoad(false);
            canvasObj.height = img.height;
            canvasObj.width = img.width;
            ctx.drawImage(img, 0, 0);
            if(isAlign){
                ctx.lineWidth = 3;
                ctx.strokeStyle = "red";
                ctx.strokeRect(               
                    target.X, 
                    target.Y, 
                    target.Width, 
                    target.Height, );
            }
            setLoad(true);
        }
    },[load,currFile,target,isAlign]);
    return (
        <Wrapper>
            <PanZoom
                boundaryRatioVertical={0.9}
                boundaryRatioHorizontal={0.9}
                enableBoundingBox>
                <Loading hasLoad={load}>
                    <FontAwesomeIcon className="icon" icon={faSpinner} size="4x" spin />
                </Loading>
                <Canvas ref={canvasRef} />
            </PanZoom>
        </Wrapper>
    )
}

export default ContentCanvas;