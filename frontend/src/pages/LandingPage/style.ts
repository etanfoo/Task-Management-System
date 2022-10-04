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

  > h1 {
    font-size: 3.5rem;
    width: 65%;
    margin-bottom: 0;
    font-weight: normal;

    > span {
      color: ${Palette.mainTeal};
    }

  };

  > h3 {
    font-weight: normal;
    color: ${Palette.thGray};
    font-size: 1.5rem;
  }
`;

export const GetStartedButton = styled(Button)`
  background-color: ${Palette.mainTeal};
  font-size: 1.25rem;
  padding: 0.25rem 1.5rem;
  text-transform: capitalize;
  margin-top: 0.5rem;

  &:hover {
    background-color: ${Palette.darkTeal};
  }

  > span {
    font-size: 2rem;
  }
`;

export const FeaturesContainer = styled('div')`
  margin: 3rem 0;
  background-color: ${Palette.lightGray};
  width: 100%;
  padding: 0 2rem 3rem 2rem;

  > h2 {
    font-size: 3rem;
    font-weight: normal;

    > span {
      color: ${Palette.mainTeal};
    }
  }
`;

export const GridContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
`;