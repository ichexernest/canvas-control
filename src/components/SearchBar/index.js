import React, { useState, useEffect, useRef } from "react";
//import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar} from '@fortawesome/free-solid-svg-icons'
//Styles
import { Wrapper, Content, Button } from "../SearchBar/SearchBar.styles";

const SearchBar = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const handleClickEvent = ()=>{
        alert(`search date range ${startDate} to ${endDate}.`);
        };

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
    </Wrapper>
    )
}

// SearchBar.propTypes = {
//     callback: PropTypes.func
// }

export default SearchBar;
