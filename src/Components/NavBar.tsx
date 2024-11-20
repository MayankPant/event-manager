
import '../types/custom.d.ts'
import eventmanager from '../assets/event-manager.svg';
import '../styles/NavBar.css'
import NavItem from "./NavItem";
import { IconButton, useTheme } from "@mui/material";
import { Logout } from '@mui/icons-material';
import { useContext } from 'react';
import { TokenContext } from '../context/TokenContext';
import { Navigate } from 'react-router-dom';
type PropType = {
    logo: string,
    title: string,
}

const Logo = ({ logo, title}: PropType) => {
    return (
      <div className="logo">
        <img src={logo} alt={title} width={'48px'} height={'48px'} />
        <label>{title.toUpperCase()}</label>
      </div>
    );
  };


const NavBar = () => {
    const {logout, isAuthenticated} = useContext(TokenContext);
    const theme = useTheme();
    const navBarStyles =  {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        borderBottom: `1px ${theme.palette.text.primary} solid`
    }
    

    return (
        <div style={navBarStyles} className="navbar-wrapper">
            <div className="branding">
                <Logo logo={eventmanager} title="EVENT MANAGER"/>
            </div>
            <div className="navitems-wrapper">
                <NavItem navItemName="Dashboard" styles={{color: theme.palette.text.primary}} routeTo="dashboard" />
                <NavItem navItemName="Documentation" styles={{color: theme.palette.text.primary}} routeTo="documentation" />
                <NavItem navItemName="Community" styles={{color: theme.palette.text.primary}} routeTo="community"  />
                <NavItem navItemName="Sign in" styles={{backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary}} routeTo="signup" />
                <IconButton children={<Logout/>}  onClick={logout}/>
            </div>
            
        </div>
    )
}

export default NavBar;