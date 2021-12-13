import { useState } from "react";
import styled from "styled-components";

//const { useState } = React;
import Sidebar from "./Sidebar";
import ContentArea from "./ContentArea";
import ContentCanvas from './ContentCanvas';
import DetailCanvas from './DetailCanvas';


const Home = () => {
    const Wrapper = styled.div`
        max-height: 100vh;
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: stretch;
    `;
    return (
        <Wrapper>
            <Sidebar />
            <ContentArea />
        </Wrapper>
    );
}

export default Home;
