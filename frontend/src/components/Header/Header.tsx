import { HeaderContainer, LoginLink, SignUpButton, Logo, StyledAvatar, ProfilePicture } from "./style";
import LogoIcon from "../../assets/logo.png";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../../api/profile";

const Header = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");

  const handleMenuOpen = (e: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(e.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const handleLogoClick = () => {
    if (sessionStorage.getItem(process.env.REACT_APP_TOKEN!)) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };
  
  const fetchUserDetails = async () => {
    try {
      const data = await getProfile(parseInt(
        sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!
      ));
      setName(data.name);
      setProfilePicture(data.profilePicture);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem(process.env.REACT_APP_TOKEN!)) {
      // only do so if user is logged in
      fetchUserDetails();
    }
  }, []);

  return (
    <HeaderContainer>
      <Logo src={LogoIcon} alt='logo' onClick={handleLogoClick}/>
      {sessionStorage.getItem(process.env.REACT_APP_TOKEN!)
        ? 
          (
            <>
              {!!profilePicture
                ? <ProfilePicture src={profilePicture} onClick={handleMenuOpen} alt='profile' />
                : (
                  <StyledAvatar onClick={handleMenuOpen}>
                    {name.length >= 2 
                      ? name.split(' ')[0][0] + name.split(' ')[1][0]
                      : name.split(' ')[0][0]
                    }
                  </StyledAvatar>
                )
              }
              <Menu
                open={menuOpen}
                anchorEl={anchorEl}
                onClose={handleMenuClose}
              >
                {/* todo: update with logos */}
                <MenuItem onClick={() => navigate(`/profile/${sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)}`)}>
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