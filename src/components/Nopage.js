import styled from "styled-components";
import { React, useEffect, useState } from "react";
import API from '../API';
const Wrapper = styled.div`
max-height: 92vh;
height: 92vh;
width: 100vw;
overflow-y:auto;
`;

const Nopage = () => {
    return (
        <Wrapper>
            <h1>Nopage</h1>
        </Wrapper>
    );
}

export default Nopage;
