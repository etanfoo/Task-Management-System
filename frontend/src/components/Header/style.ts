import { Avatar, Badge, BadgeProps, Button, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { Palette } from "../Palette";

export const HeaderContainer = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0 2rem;
  height: 5rem;
  margin-bottom: 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Logo = styled("img")`
  height: 4rem;
  cursor: pointer;
`;

export const SignUpButton = styled(Button)`
  text-transform: capitalize;
  background-color: ${Palette.mainTeal};

  &:hover {
    background-color: ${Palette.darkTeal};
  }
`;

export const LoginLink = styled(Link)`
  margin: 0 1.5rem 0 auto;
  text-decoration: none;
  color: black;
  font-size: 1rem;
  transition: all 0.3s ease 0s;

  &:hover {
    color: ${Palette.mainTeal};
  }
`;

export const ProfilePicture = styled("img")`
  height: 3rem;
  width: 3rem;
  border-radius: 5rem;
  cursor: pointer;
`;

export const StyledAvatar = styled(Avatar)`
  height: 3rem;
  width: 3rem;
  background-color: ${Palette.mainTeal};
  cursor: pointer;
`;

export const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  marginLeft: "auto",

  "& .MuiBadge-badge": {
    right: 25,
    top: 13,
  },
}));

export const StyledIconButton = styled(IconButton)`
  margin-left: auto;
  margin-right: 1rem;
`;

export const CreateButton = styled(Button)`
  background-color: ${Palette.mainTeal};
  margin-right: 1rem;
  text-transform: capitalize;

  &:hover {
    background-color: ${Palette.darkTeal};
  }
`;
