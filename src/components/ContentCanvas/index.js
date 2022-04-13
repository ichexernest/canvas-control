import { React, useEffect, useRef,useState } from "react";
import { Wrapper, Canvas,Loading } from './ContentCanvas.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useAPI } from "../apiContext";
import { PanZoom } from 'react-easy-panzoom'

const ContentCanvas = ({index,pageIndex,pathIndex,isAlign}) => {
    const canvasRef = useRef(null);
    const { pages } = useAPI();
    const pageBase = pages.pageList[pageIndex];

    const [load, setLoad]= useState(false);
    useEffect(() => {
        console.log(`879789789789789789789789798`)
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d');
        const img = new Image();
        img.src = pageBase.FilePathSets[pathIndex];
        img.onload = () => {
            //setLoad(false);
            canvasObj.height = img.height;
            canvasObj.width = img.width;
            ctx.drawImage(img, 0, 0);
            if(isAlign){
                ctx.lineWidth = 3;
                ctx.strokeStyle = "red";
                ctx.strokeRect(               
                    pageBase.Sets[index].Rect.X, 
                    pageBase.Sets[index].Rect.Y, 
                    pageBase.Sets[index].Rect.Width, 
                    pageBase.Sets[index].Rect.Height, );
            }
            setLoad(true);
        }
    },[load,
        index,
        pageIndex,
        isAlign]);
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