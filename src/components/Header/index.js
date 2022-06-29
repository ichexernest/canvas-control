import { React } from "react";
import { Wrapper,Logo,Button,  AccountArea } from './Header.styles';
import { Link  } from "react-router-dom";
import { useAuth } from "../../authContext";
import { getAuthToken } from "../../Util";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  const APP_NAME = process.env.REACT_APP_NAME;
    const {onLogout} = useAuth();
    const userLogin= JSON.parse(getAuthToken());
    return (
        <Wrapper>
            <Link to='/Home' style={{ textDecoration: 'none' }}>
            <Logo>{APP_NAME}</Logo>
            </Link >
            {userLogin && (
              <AccountArea>    
              <FontAwesomeIcon className="icon" icon={faUser} />          
              <span>{userLogin.d.HumanName}</span>
              <Button type="button" onClick={onLogout}>
                登出
              </Button>
              </AccountArea>
      )}
        </Wrapper>
    )
}

export default Header;