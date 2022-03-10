import styled from "styled-components";
import { useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
//import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import ContentArea from "./ContentArea";
//import API from '../API';
const Wrapper = styled.div`
max-height: 92vh;
height: 92vh;
width: 100%;
display: flex;
flex-direction: row;
flex: 1;
justify-content: stretch;
`;
const Sidebar = styled.div`
background: var(--bgColor);
position: relative;
display: flex;
overflow-y: auto;
flex-direction: column;
flex: 1;
border-right: 1px solid var(--lightGrey);
img {
    width: 200px;
    height: 200px;
    object-fit: contain;
    }
li{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
}
`;
const Loading = styled.div`
width:100%;
height:100%;
display:flex;
justify-content:center;
align-items: center;
color:var(--primary);
`;
const Detail = () => {
    const { caseNo,createDTime } = useParams();
    const [activePageId, setActivePageId] = useState(0); //active ocr area
    const [pages, setPages] = useState(null); //main data
    const navigate = useNavigate();

    useEffect(() => {
        //fetchPageList();
        fetchPageListTest();
    }, [])

    const back = ()=>{
        navigate(-1);
    }
    const fetchPageList = () => {
        console.log(`here gets caseNo: ${caseNo} & createDTime: ${createDTime}`);
        fetch(
            'http://lbftcaivm01/FPGProcessService/DocSimilar/DocPage.asmx/GetAllPage',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'p_szCaseNo': caseNo,
                    'p_szCreateDTime': createDTime
                })
            }).then((response) => response.json())
            .then((data) => {
                // response in data
                //console.log(`data d parsr ::${JSON.parse(data.d).length}::: ${JSON.stringify(data.d)}`);
                if(JSON.parse(data.d).length===0 ||JSON.parse(data.d) === null){
                    alert(`no page data`);
                    back();
                }else{ setPages(JSON.parse(data.d));}
            }).catch((error) => {
                //handle your error
                alert(`fetch failed : ${error}`);
                back();
            });
    };
    //fake data test
    const fetchPageListTest = () => {
        console.log(`here gets caseNo: ${caseNo} & createDTime: ${createDTime}`);
        let data = [
            {"Page":0,
            "FilePathSets":[
                "https://i.epochtimes.com/assets/uploads/2021/11/id13392306-3526-2021-11-23-093833.jpg",
                "http://upload.wikimedia.org/wikipedia/commons/3/32/EVD_Document1.jpg",
                "https://i.epochtimes.com/assets/uploads/2021/11/id13392306-3526-2021-11-23-093833.jpg",
                "http://upload.wikimedia.org/wikipedia/commons/3/32/EVD_Document1.jpg",
                "https://i.epochtimes.com/assets/uploads/2021/11/id13392306-3526-2021-11-23-093833.jpg",
            ],
            "Sets":[
                {"Index":0,"Ssim":0.0,"Qatm_score":0.0,"Rect":{"X":28,"Y":50,"Width":232,"Height":54},"Page":0,"BoxIndex":1,"OcrSSIM":1.0,"SrcText":"MeDiPro","RefText":"MeDiPro","Pass":false},
                {"Index":0,"Ssim":0.0,"Qatm_score":0.0,"Rect":{"X":570,"Y":52,"Width":132,"Height":30},"Page":0,"BoxIndex":2,"OcrSSIM":0.375,"SrcText":"保存侏什2-8C","RefText":"(保存條件2-","Pass":false},
                {"Index":0,"Ssim":0.0,"Qatm_score":0.0,"Rect":{"X":481,"Y":59,"Width":76,"Height":42},"Page":0,"BoxIndex":3,"OcrSSIM":0.0,"SrcText":"WD","RefText":"IL","Pass":false},
                {"Index":0,"Ssim":0.0,"Qatm_score":0.0,"Rect":{"X":280,"Y":66,"Width":194,"Height":36},"Page":0,"BoxIndex":4,"OcrSSIM":1.0,"SrcText":"AC-00013-05","RefText":"AC-00013-05","Pass":false},
                {"Index":0,"Ssim":0.0,"Qatm_score":0.0,"Rect":{"X":576,"Y":76,"Width":76,"Height":36},"Page":0,"BoxIndex":5,"OcrSSIM":0.4,"SrcText":"10 ml","RefText":" 10 n","Pass":false},
                {"Index":0,"Ssim":0.0,"Qatm_score":0.0,"Rect":{"X":130,"Y":98,"Width":40,"Height":12},"Page":0,"BoxIndex":6,"OcrSSIM":"-Infinity","SrcText":"","RefText":"Diagno","Pass":false},
                {"Index":0,"Ssim":0.0,"Qatm_score":0.0,"Rect":{"X":9,"Y":116,"Width":392,"Height":66},"Page":0,"BoxIndex":7,"OcrSSIM":0.95652173913043481,"SrcText":"Antibody screening cell","RefText":"Anfibody screening cell","Pass":false},
                {"Index":0,"Ssim":0.0,"Qatm_score":0.0,"Rect":{"X":0,"Y":162,"Width":142,"Height":115},"Page":0,"BoxIndex":8,"OcrSSIM":-1.0,"SrcText":"I","RefText":"III","Pass":false},
                {"Index":0,"Ssim":0.0,"Qatm_score":0.0,"Rect":{"X":127,"Y":187,"Width":236,"Height":42},"Page":0,"BoxIndex":9,"OcrSSIM":0.84615384615384615,"SrcText":"血球濃度 : 3i0.5%","RefText":"血球濃度 : 3+0. 5%","Pass":false},
                {"Index":0,"Ssim":0.0,"Qatm_score":0.0,"Rect":{"X":379,"Y":205,"Width":72,"Height":40},"Page":0,"BoxIndex":10,"OcrSSIM":0.25,"SrcText":"Lot:","RefText":"L","Pass":false},
                {"Index":0,"Ssim":0.0,"Qatm_score":0.0,"Rect":{"X":379,"Y":255,"Width":63,"Height":45},"Page":0,"BoxIndex":11,"OcrSSIM":0.0,"SrcText":"Exp","RefText":"臼","Pass":false},
                {"Index":0,"Ssim":0.0,"Qatm_score":0.0,"Rect":{"X":315,"Y":318,"Width":439,"Height":53},"Page":0,"BoxIndex":12,"OcrSSIM":-1.5833333333333335,"SrcText":"日里土醫科枝服份有呎公司","RefText":"oawosk Ho MebicAt fedhNotosyfo昂","Pass":false},
                {"Index":0,"Ssim":0.0,"Qatm_score":0.0,"Rect":{"X":318,"Y":356,"Width":436,"Height":32},"Page":0,"BoxIndex":13,"OcrSSIM":0.0,"SrcText":"FORMU5A BloMtDICAL TEGHHotn6y CORI","RefText":"","Pass":false}
            ]}];
            
            console.log(`heres get fake pages ${data}`)
            setPages(data);
    };
    const handleSelectTarget = (i) => {
        setActivePageId(i);
    }

    return (
        
        <Wrapper>
            <Sidebar>
                <ul>
                    {pages &&
                        pages.map((item, index) => {
                            let liClasses = classNames({
                                'active': (activePageId === index) ? true : false,
                            });
                            return (
                                <li key={item.Page} className={liClasses} onClick={() => handleSelectTarget(index)} >
                                    <img src={item.FilePathSets[0]} alt={item.Page} />
                                    page: {item.Page}
                                </li>)
                        })}
                </ul>
            </Sidebar>
            {pages ? <ContentArea content={pages[activePageId]} fileName={caseNo} pageIndex={pages[activePageId].Page} />:<Loading><FontAwesomeIcon className="icon" icon={faSpinner}  size="4x"  spin /></Loading>}
        </Wrapper>
    );
}

export default Detail;
