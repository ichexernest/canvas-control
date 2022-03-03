import React, { useState } from "react";
//import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faSync } from '@fortawesome/free-solid-svg-icons'
//Styles
import { Wrapper, Content, Button } from "../SearchBar/SearchBar.styles";

const SearchBar = ({ setSearchTermS, setSearchTermE }) => {
    const tranDateToString = (begin) => {
        let date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year,result;
        if(begin)
            year = date.getFullYear() - 1;
        else
            year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        return result = year + "-" + month + "-" + day;
    };
    const today =tranDateToString(false);
    const yearRange =tranDateToString(true);
    const [startDate, setStartDate] = useState(yearRange);
    const [endDate, setEndDate] = useState(today);
    const handleClickEvent = () => {
        if (startDate > endDate || startDate === endDate) {
            alert(`wrong range!!!!try again!!!!${startDate} to ${endDate}`);
            return;
        }
        console.log(`search date range ${startDate} to ${endDate}.`);
        setSearchTermS(startDate);
        setSearchTermE(endDate);
    };
    const handleRefreshEvent = () => {
        setSearchTermS('');
        setSearchTermE('');
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
            <Button onClick={handleRefreshEvent}><FontAwesomeIcon className="icon" icon={faSync} /></Button>
        </Wrapper>
    )
}

// SearchBar.propTypes = {
//     callback: PropTypes.func
// }

export default SearchBar;
