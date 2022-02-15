import React, { useState } from "react";
//import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar,faSync} from '@fortawesome/free-solid-svg-icons'
//Styles
import { Wrapper, Content, Button } from "../SearchBar/SearchBar.styles";

const SearchBar = ({setSearchTermS,setSearchTermE}) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const handleClickEvent = ()=>{
        if(startDate > endDate || startDate === endDate){
            alert(`wrong range!!!!try again!!!!${startDate} to ${endDate}`); 
            return; 
        }
        console.log(`search date range ${startDate} to ${endDate}.`);
            setSearchTermS(startDate);
            setSearchTermE(endDate);
        };
        const handleRefreshEvent = ()=>{
                setSearchTermS('');
                setSearchTermE('');
            };
            //skip init render: useRef
    // useEffect(()=>{
    //     handleClickEvent();
    // },[setSearchTermS, setSearchTermE])


    return (
        <Wrapper>
        <Content>
            <input
                type='date'
                placeholder={`Start Date`}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <FontAwesomeIcon className="icon" icon={faCalendar} />
        </Content>
        至
        <Content>
            <FontAwesomeIcon className="icon" icon={faCalendar} />
            <input
                type='date'
                placeholder={`End Date`}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
        </Content>
        <Button onClick={handleClickEvent}>搜尋</Button>
        <Button onClick={handleRefreshEvent}><FontAwesomeIcon className="icon" icon={faSync} /></Button>
    </Wrapper>
    )
}

// SearchBar.propTypes = {
//     callback: PropTypes.func
// }

export default SearchBar;
