import styled from "styled-components";
import { React, useEffect, useState } from "react";
import MTable from "./MTable";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
const Home = () => {
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
    const [searchTermS, setSearchTermS] = useState('');
    const [searchTermE, setSearchTermE] = useState('');
    const [data, setData] = useState(null);
    //const data = makeData(1000);

    useEffect(() => {
        fetchCase(searchTermS, searchTermE);
    }, [searchTermS, searchTermE])
    
    const fetchCase = (searchTermS, searchTermE) => {
        let szSCreateDTime = searchTermS.replaceAll("-", "");
        let szECreateDTime = searchTermE.replaceAll("-", "");
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
            }).catch((error) => {
                //handle your error
            });
    };

    return (
        <Wrapper>
            <ControlWrapper>
                <Link to={`/CreateNew`}>
                    <NewBtn>+ 立案</NewBtn>
                </Link>
                <SearchBar setSearchTermS={setSearchTermS} setSearchTermE={setSearchTermE} />
            </ControlWrapper>
            {data !== null ?
            <MTable data={data} />:<Loading><FontAwesomeIcon className="icon" icon={faSpinner}  size="4x"  spin /></Loading>}
        </Wrapper>
    );
}

export default Home;
