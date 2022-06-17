import React,{ useEffect, useRef, useState, useCallback } from "react";
import { Wrapper, Canvas, Loading } from './ContentCanvas.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useAPI } from "../apiContext";
import { PanZoom } from 'react-easy-panzoom'

const ContentCanvas = ({ targetIndex, pageIndex, pathIndex }) => {
    const canvasRef = useRef(null);
    const { pages } = useAPI();
    const pageBase = pages.pageList[pageIndex];

    const [loaded, setLoaded] = useState(false);
    const drawCanva = useCallback(() => {
        //let count = 1;
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d');
        const img = new Image();
        img.src = pageBase.FilePathSets[pathIndex];
        img.onload = () => {
            //setLoad(false);
            canvasObj.height = img.height;
            canvasObj.width = img.width;
            ctx.drawImage(img, 0, 0);
            if (pathIndex===0) {
                ctx.lineWidth = 3;
                ctx.strokeStyle = "red";
                ctx.strokeRect(
                    pageBase.Sets[targetIndex].Rect.X,
                    pageBase.Sets[targetIndex].Rect.Y,
                    pageBase.Sets[targetIndex].Rect.Width,
                    pageBase.Sets[targetIndex].Rect.Height);
                //count--;
            }
            setLoaded(true);
        }
    },[targetIndex,pathIndex,pageBase]);
    useEffect(() => { drawCanva() }, [drawCanva]);
    return (
        <Wrapper>
            <PanZoom
                boundaryRatioVertical={0.9}
                boundaryRatioHorizontal={0.9}
                enableBoundingBox>
                <Loading hasLoad={loaded}>
                <FontAwesomeIcon className="icon" icon={faSpinner} size="4x" spin />
                </Loading>
                <Canvas ref={canvasRef} />
            </PanZoom>
        </Wrapper>
    )
}

export default ContentCanvas;