import React, { useState } from "react";
//import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faSync } from '@fortawesome/free-solid-svg-icons'
//Styles
import { Wrapper, Content, Button } from "../SearchBar/SearchBar.styles";

const SearchBar = ({ fetchCase, sDate, eDate, initSDate, initEDate}) => {

    const [inputSDate, setInputSDate] = useState(sDate);
    const [inputEDate, setInputEDate] = useState(eDate);
    const handleClickEvent = () => {
        if (inputSDate > inputEDate || inputSDate === inputEDate) {
            alert(`wrong range!!!!try again!!!!${inputSDate} to ${inputEDate}`);
            return;
        }
        console.log(`search date range ${inputSDate} to ${inputEDate}.`);
        fetchCase(inputSDate, inputEDate);
    };
    const handleRefreshEvent = () => {
        fetchCase(initSDate,initEDate);
    };

    return (
        <Wrapper>
            <Content>
                <input
                    type='date'
                    placeholder={`Start Date`}
                    value={inputSDate}
                    onChange={(e) => setInputSDate(e.target.value)}
                />
                <FontAwesomeIcon className="icon" icon={faCalendar} />
            </Content>
            至
            <Content>
                <FontAwesomeIcon className="icon" icon={faCalendar} />
                <input
                    type='date'
                    placeholder={`End Date`}
                    value={inputEDate}
                    onChange={(e) => setInputEDate(e.target.value)}
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
