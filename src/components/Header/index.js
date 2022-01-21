import { React, useEffect, useRef } from "react";
import { Wrapper,Logo } from './Header.styles';
import { Link  } from "react-router-dom";
const Header = () => {
    return (
        <Wrapper>
            <Link to='/' style={{ textDecoration: 'none' }}>
            <Logo>文件辨識檢視系統</Logo>
            </Link >
        </Wrapper>
    )
}

export default Header;