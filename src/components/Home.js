import styled from "styled-components";
import { React, useEffect, useState } from "react";
import MTable from "./MTable";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
const Wrapper = styled.div`
max-height: 92vh;
height: 92vh;
width: 100vw;
overflow-y:auto;
`;
const ControlWrapper = styled.div`
display:flex;
justify-content:space-between;
align-items: center;
padding: 0 12px;
`;
const Loading = styled.div`
width:100%;
height:100%;
display:flex;
justify-content:center;
align-items: center;
color:var(--primary);
`;
const NewBtn = styled.button`
background-color: var(--white);
border: 1px solid var(--white);
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
transition: all 0.3s cubic-bezier(.25,.8,.25,1);
color: var(--primary);
padding: 5px 25px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: var(--fontBig);
margin: 15px;
transition-duration: 0.4s;
cursor: pointer;
border-radius: 50px;
:hover{
box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
[disabled=disabled], :disabled {
background-color: var(--btnDisabledColor);
:hover{
    background-color: var(--btnDisabledColor);
    cursor:no-drop;
}
}
`;
const Home = () => {
    const tranDateToString = (begin) => {
        let date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year;

        if (begin)
            year = date.getFullYear() - 1;
        else
            year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        return year + "-" + month + "-" + day;
    };
    const initEDate = tranDateToString(false);
    const initSDate = tranDateToString(true);
    const [data, setData] = useState(null);
    const [sDate, setSDate] = useState(initSDate);
    const [eDate, setEDate] = useState(initEDate);

    useEffect(() => {
        fetchCase(sDate, eDate);
        //fetchCaseTest(sDate, eDate);
    }, [])
    const fetchCase = (searchTermS, searchTermE) => {
        let szSCreateDTime = '', szECreateDTime = '';
        if (searchTermS && searchTermE) {
            szSCreateDTime = searchTermS.replaceAll("-", "");
            szECreateDTime = searchTermE.replaceAll("-", "");
        }
        console.log(`heres get range ${szSCreateDTime} to ${szECreateDTime}`)
        fetch(
            'http://lbftcaivm01/FPGProcessService/DocSimilar/DocPage.asmx/FindCase',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'p_szSCrateDTime': szSCreateDTime,
                    'p_szECrateDTime': szECreateDTime
                })
            }).then((response) => response.json())
            .then((data) => {
                // response in data
                console.log(data.d);
                setData(JSON.parse(data.d));
                setSDate(searchTermS);
                setEDate(searchTermE);
            }).catch((error) => {
                //handle your error
                console.log(error);
            });
    };
    //fake data test
    const fetchCaseTest = (searchTermS, searchTermE) => {
        let szSCreateDTime = '', szECreateDTime = '';
        if (searchTermS && searchTermE) {
            szSCreateDTime = searchTermS.replaceAll("-", "");
            szECreateDTime = searchTermE.replaceAll("-", "");
        }
        console.log(`heressss get range ${szSCreateDTime} to ${szECreateDTime}`)
        let data1 = [
            { "Id": 2, "Vhno": "Case01", "CreateTime": "20210924093816032", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "Case01_src.png", "RefFileName": "Case01_ref.png", "Description": "測試", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20210924093816035" },
            { "Id": 6, "Vhno": "a6d3048f-4b77-4a3b-bda2-5993254f6ed4", "CreateTime": "20210927155949084", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "a6d3048f-4b77-4a3b-bda2-5993254f6ed4_src.png", "RefFileName": "a6d3048f-4b77-4a3b-bda2-5993254f6ed4_ref.png", "Description": "", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20210927155949084" },
            { "Id": 7, "Vhno": "a0f3762a-d2ad-42eb-b23d-ca9a11ff5b24", "CreateTime": "20210928123959969", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "a0f3762a-d2ad-42eb-b23d-ca9a11ff5b24_src.png", "RefFileName": "a0f3762a-d2ad-42eb-b23d-ca9a11ff5b24_ref.png", "Description": "", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20210928123959969" },
            { "Id": 8, "Vhno": "72eb23c0-a7c5-426c-bb11-86dd02b26c16", "CreateTime": "20210928125023245", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "72eb23c0-a7c5-426c-bb11-86dd02b26c16_src.png", "RefFileName": "72eb23c0-a7c5-426c-bb11-86dd02b26c16_ref.png", "Description": "", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20210928125023245" },
            { "Id": 9, "Vhno": "276d8729-ca07-44f9-ac6b-55bfbfe6dd46", "CreateTime": "20210928132637615", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "276d8729-ca07-44f9-ac6b-55bfbfe6dd46_src.png", "RefFileName": "276d8729-ca07-44f9-ac6b-55bfbfe6dd46_ref.png", "Description": "", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20210928132637615" },
            { "Id": 10, "Vhno": "a2600e5a-e72c-4fd3-ae93-9605f0018127", "CreateTime": "20210928135039322", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "a2600e5a-e72c-4fd3-ae93-9605f0018127_src.pdf", "RefFileName": "a2600e5a-e72c-4fd3-ae93-9605f0018127_ref.pdf", "Description": "", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20210928135039323" },
            { "Id": 11, "Vhno": "feec2a38-c469-42ea-93f6-1884c2c721cb", "CreateTime": "20210928140714799", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "feec2a38-c469-42ea-93f6-1884c2c721cb_src.pdf", "RefFileName": "feec2a38-c469-42ea-93f6-1884c2c721cb_ref.pdf", "Description": "", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20210928140714800" },
            { "Id": 12, "Vhno": "c8db963f-c4ba-4630-a59b-7f506355833d", "CreateTime": "20210929085319001", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "c8db963f-c4ba-4630-a59b-7f506355833d_src.pdf", "RefFileName": "c8db963f-c4ba-4630-a59b-7f506355833d_ref.pdf", "Description": "", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20210929085319002" },
            { "Id": 13, "Vhno": "44d539a9-fd67-4772-a3a7-031e1ca326a2", "CreateTime": "20211006101731145", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "44d539a9-fd67-4772-a3a7-031e1ca326a2_src.png", "RefFileName": "44d539a9-fd67-4772-a3a7-031e1ca326a2_ref.png", "Description": "FDFD", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20211006101731146" },
            { "Id": 14, "Vhno": "b6a8393b-89c9-4761-8f15-5cdbe3721f6e", "CreateTime": "20211027134150672", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "b6a8393b-89c9-4761-8f15-5cdbe3721f6e_src.png", "RefFileName": "b6a8393b-89c9-4761-8f15-5cdbe3721f6e_ref.png", "Description": "", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20211027134150673" },
            { "Id": 15, "Vhno": "068e4609-9a5c-4357-8d96-eb6b2b4535bc", "CreateTime": "20211028142203775", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "068e4609-9a5c-4357-8d96-eb6b2b4535bc_src.png", "RefFileName": "068e4609-9a5c-4357-8d96-eb6b2b4535bc_ref.png", "Description": "test", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20211028142203776" },
            { "Id": 16, "Vhno": "a2aa78b8-a675-4905-a8f7-517c2836fe5e", "CreateTime": "20211118120029405", "CreateEmp": "N000126091", "Co": "XD", "Dp": "", "SrcFileName": "a2aa78b8-a675-4905-a8f7-517c2836fe5e_src.pdf", "RefFileName": "a2aa78b8-a675-4905-a8f7-517c2836fe5e_ref.pdf", "Description": "", "Email": "N000126091@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000126091", "Txtm": "20211118120029406" },
            { "Id": 17, "Vhno": "52f6dde0-6d04-4f3b-aad6-fa3f71474f02", "CreateTime": "20211118120147498", "CreateEmp": "N000126091", "Co": "XD", "Dp": "", "SrcFileName": "52f6dde0-6d04-4f3b-aad6-fa3f71474f02_src.pdf", "RefFileName": "52f6dde0-6d04-4f3b-aad6-fa3f71474f02_ref.pdf", "Description": "", "Email": "N000126091@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000126091", "Txtm": "20211118120147499" },
            { "Id": 18, "Vhno": "9450f592-f41f-4409-86d9-6d0ab1619519", "CreateTime": "20211202160215389", "CreateEmp": "N000126091", "Co": "XD", "Dp": "", "SrcFileName": "9450f592-f41f-4409-86d9-6d0ab1619519_src.png", "RefFileName": "9450f592-f41f-4409-86d9-6d0ab1619519_ref.png", "Description": "", "Email": "N000126091@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000126091", "Txtm": "20211202160215392" },
            { "Id": 19, "Vhno": "e90b4f36-0811-46a1-8e29-50688b2ad5d2", "CreateTime": "20211202160302306", "CreateEmp": "N000126091", "Co": "XD", "Dp": "", "SrcFileName": "e90b4f36-0811-46a1-8e29-50688b2ad5d2_src.png", "RefFileName": "e90b4f36-0811-46a1-8e29-50688b2ad5d2_ref.png", "Description": "", "Email": "N000126091@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000126091", "Txtm": "20211202160302306" }
        ];
        setData(data1);
        console.log(`heres get fake data ${data1}`)
        setSDate(searchTermS);
        setEDate(searchTermE);
    };

    return (
        <Wrapper>
            <ControlWrapper>
                <Link to={`/CreateNew`}>
                    <NewBtn>+ 立案</NewBtn>
                </Link>
                <SearchBar fetchCase={fetchCase} sDate={sDate} eDate={eDate} initSDate={initSDate} initEDate={initEDate} />
            </ControlWrapper>
            {data !== null ?
                <MTable data={data} /> : 
                <Loading><FontAwesomeIcon className="icon" icon={faSpinner} size="4x" spin /></Loading>}
        </Wrapper>
    );
}

export default Home;
