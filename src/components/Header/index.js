import { React } from "react";
import { Wrapper,Logo,Button } from './Header.styles';
import { Link  } from "react-router-dom";
import { useAuth } from "../../App";
const Header = () => {
    const {token, onLogout} = useAuth();
    return (
        <Wrapper>
            <Link to='/Home' style={{ textDecoration: 'none' }}>
            <Logo>文件辨識檢視系統</Logo>
            </Link >
            {token && (
        <Button type="button" onClick={onLogout}>
          Sign Out
        </Button>
      )}
        </Wrapper>
    )
}

export default Header;