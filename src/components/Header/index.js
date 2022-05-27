import { React } from "react";
import { Wrapper,Logo,Button } from './Header.styles';
import { Link  } from "react-router-dom";
import { useAuth } from "../../authContext";
import { getAuthToken } from "../../Util";

const Header = () => {
    const {token, onLogout} = useAuth();
    const userLogin= getAuthToken();
    return (
        <Wrapper>
            <Link to='/Home' style={{ textDecoration: 'none' }}>
            <Logo>{process.env.REACT_APP_NAME}</Logo>
            </Link >
            {userLogin && (
              <>              
              {/* <span>{token.HumanName}</span> */}
              <Button type="button" onClick={onLogout}>
                登出
              </Button>
              </>
      )}
        </Wrapper>
    )
}

export default Header;