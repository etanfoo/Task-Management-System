import { HeaderContainer, LoginLink, SignUpButton, Logo, StyledAvatar, ProfilePicture, StyledIconButton, CreateButton, StyledBadge } from "./style";
import LogoIcon from "../../assets/logo.png";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../../api/profile";
import FriendsIcon from "../../assets/friends.png";
import { getInitials } from "../../helpers";
import { getRequestedConnections } from "../../api/connect";
import { IProfile } from "../../interfaces/api-response";

type HeaderProps = {
  triggerConnectionRequestsModal?: () => void;
  // todo: create task modal
  triggerCreateTaskModal?: () => void;
};

const Header = ({ triggerConnectionRequestsModal, triggerCreateTaskModal }: HeaderProps) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [requestConnections, setRequestConnections] = useState<IProfile[]>([]);

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
      navigate('/dashboard', {state:{initialPageState:"assigned tasks"}});
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

  const fetchRequestedConnections = async () => {
    try {
      const requests = await getRequestedConnections(
        parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!)
      );
      setRequestConnections(requests);
    } catch (err: any) {
      // todo: do some error handling
      console.log(err);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem(process.env.REACT_APP_TOKEN!)) {
      // only do so if user is logged in
      fetchUserDetails();
      fetchRequestedConnections();
    }
  }, [requestConnections]);

  return (
    <HeaderContainer>
      <Logo src={LogoIcon} alt='logo' onClick={handleLogoClick}/>
      {sessionStorage.getItem(process.env.REACT_APP_TOKEN!)
        ? 
          (
            <>
              {window.location.pathname === "/dashboard"
                ? (
                  <>
                    <StyledBadge badgeContent={requestConnections.length} color="secondary">
                      <StyledIconButton onClick={triggerConnectionRequestsModal}>
                        <img src={FriendsIcon} alt="friends" width='40' height='40' />
                      </StyledIconButton>
                    </StyledBadge>
                    <CreateButton variant='contained' onClick={triggerCreateTaskModal}>Create Task</CreateButton>
                    <CreateButton variant='contained' onClick={() => navigate('/project/create')}>Create Project</CreateButton>
                  </>
                ): null
              }
              {!!profilePicture
                ? <ProfilePicture
                    src={profilePicture}
                    onClick={handleMenuOpen}
                    alt='profile'
                    style={window.location.pathname !== "/dashboard" ? { marginLeft: 'auto' } : undefined}
                  />
                : (
                  <StyledAvatar
                    onClick={handleMenuOpen}
                    style={window.location.pathname !== "/dashboard" ? { marginLeft: 'auto' } : undefined}
                  >
                    {getInitials(name)}
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