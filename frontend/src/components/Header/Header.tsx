import { HeaderContainer, LoginLink, SignUpButton, Logo } from "./style";
import LogoIcon from "../../assets/COMP3900-Logo.png";
import ProfileIcon from "../../assets/profile.png";
import { Menu, IconButton, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
    setMenuOpen(true);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  }

  const handleLogout = () => {
    sessionStorage.removeItem(process.env.REACT_APP_TOKEN!);
    navigate('/');
  }

  const handleLogoClick = () => {
    if (sessionStorage.getItem(process.env.REACT_APP_TOKEN!)) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <HeaderContainer>
      <Logo src={LogoIcon} alt='logo' onClick={handleLogoClick}/>
      {sessionStorage.getItem(process.env.REACT_APP_TOKEN!)
        ? 
          (
            <>
              <IconButton
                onClick={handleMenuOpen}
                sx={{ marginLeft: "auto", height: "3rem" }}
              >
                <img src={ProfileIcon} style={{ height: '2.5rem' }} alt="profile" />
              </IconButton>
              <Menu
                open={menuOpen}
                anchorEl={anchorEl}
                onClose={handleMenuClose}
              >
                {/* todo: update with logos */}
                <MenuItem onClick={() => navigate('/profile')}>
                  Profile 
                </MenuItem>
                {/* todo: update with friends  */}
                <MenuItem onClick={() => navigate('/friends')}>
                  Look for a friend 
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  Logout 
                </MenuItem>
              </Menu>
            </>
          )
        : (
          <>
            <LoginLink to='/login'>
              Login
            </LoginLink>
            <SignUpButton variant='contained' onClick={() => navigate('/signup')}>
              Sign up
            </SignUpButton>
          </>
        )
      }

    </HeaderContainer>
  );
};

export default Header;