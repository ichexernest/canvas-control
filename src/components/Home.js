import styled from "styled-components";
import React,{ useEffect, useState, useCallback } from "react";
import MTable from "./MTable";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import API from '../API';
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
    const filter = (collection, predicate) => {
        var result = [];
        var length = collection.length;

        for (var j = 0; j < length; j++) {
            if (predicate(collection[j]) === true) {
                result.push(collection[j]);
            }
        }

        return result;
    }
    const fetchCase = useCallback(async (searchTermS, searchTermE) => {
        try {
            let szSCreateDTime = searchTermS ? searchTermS.replaceAll('-', '') : '';
            let szECreateDTime = searchTermE ? searchTermE.replaceAll('-', '') : '';
            console.log(`here get range ${szSCreateDTime} to ${szECreateDTime}`)
            const data = await API.getCase(szSCreateDTime, szECreateDTime);
            //console.log(data.d);
            const result = filter(JSON.parse(data.d), function (element) {
                //if (element.Vhno === 'Case01')
                return true;
                //return false;
            });
            console.log(result);
            setData(result);
            setSDate(searchTermS);
            setEDate(searchTermE);
        } catch (error) {
            console.log(error);
        }
    },[]);
    useEffect(() => {
        fetchCase(sDate, eDate);
    }, [fetchCase,sDate,eDate])
    return (
        <Wrapper>
            <ControlWrapper>
                <Link to={`/CreateNew`}>
                    <NewBtn>+ 立案</NewBtn>
                </Link>
                {/* <button onClick={()=>{fetchAuth()}}>test auth</button> */}
                <SearchBar fetchCase={fetchCase} sDate={sDate} eDate={eDate} initSDate={initSDate} initEDate={initEDate} />
            </ControlWrapper>
            {data !== null ?
                <MTable data={data} /> :
                <Loading><FontAwesomeIcon className="icon" icon={faSpinner} size="4x" spin /></Loading>}
        </Wrapper>
    );
}

export default Home;
