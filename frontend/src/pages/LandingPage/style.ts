import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { Palette } from "../../components/Palette";

export const LandingPageContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 3rem;
  text-align: center;
`;

export const GetStartedButton = styled(Button)`
  background-color: ${Palette.mainTeal};
  font-weight: bold;
  font-size: 1.25rem;
  padding: 0.5rem 1.5rem;
  text-transform: capitalize;
  margin-top: 0.5rem;

  &:hover {
    background-color: ${Palette.darkTeal};
  }

  > span {
    font-size: 2rem;
  }
`;