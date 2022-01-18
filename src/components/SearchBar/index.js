import React, { useState, useEffect, useRef } from "react";
//import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter} from '@fortawesome/free-solid-svg-icons'
//Image
//import searchIcon from '../../images/search-icon.svg';
//Styles
import { Wrapper, Content, Button } from "../SearchBar/SearchBar.styles";

const SearchBar = ({ setSearchTerm }) => {
    const [state, setState] = useState('');
    const initial = useRef(true);

    //skip init render: useRef
    useEffect(() => {
        if (initial.current) {
            initial.current = false;
            return;
        }
        const timer = setTimeout(() => {
            //setSearchTerm(state);
        }, 500)

        //     return ()=>clearTimeout(timer)
        // },[setSearchTerm, state])
        return () => clearTimeout(timer)
    }, [state])
    return (
        <Wrapper>
            <Content>
                <FontAwesomeIcon className="icon" icon={faSearch} />
                <input
                    type='text'
                    placeholder='Search...'
                    onChange={event => setState(event.currentTarget.value)}
                    value={state}
                />
                <FontAwesomeIcon className="icon" icon={faSearch} />
            </Content>
            <Button>
            <FontAwesomeIcon className="icon" icon={faFilter} />
            </Button>
        </Wrapper>
    )
}

// SearchBar.propTypes = {
//     callback: PropTypes.func
// }

export default SearchBar;
