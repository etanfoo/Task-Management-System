import { styled } from "@mui/system";
import { Palette } from "../../components/Palette";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

export const DashboardPageContainer = styled('div')`

`;

export const ProfileButton = styled(Button)`
  variant: contained;
  background-color: ${Palette.mainTeal};
  &:hover {
    background-color: ${Palette.darkTeal};
  }
`;

export const ProfileLink = styled(Link)`
  text-decoration: none;
  font-color: white;
`;
