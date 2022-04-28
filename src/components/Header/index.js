import { React } from "react";
import { Wrapper,Logo,Button } from './Header.styles';
import { Link  } from "react-router-dom";
import { useAuth } from "../../authContext";
const Header = () => {
    const {token, onLogout} = useAuth();
    return (
        <Wrapper>
            <Link to='/Home' style={{ textDecoration: 'none' }}>
            <Logo>{process.env.REACT_APP_NAME}</Logo>
            </Link >
            {token && (
              <>              
              <span>{token.HumanName}</span>
              <Button type="button" onClick={onLogout}>
                Sign Out
              </Button>
              </>
      )}
        </Wrapper>
    )
}

export default Header;