import { Divider } from "@mui/material";
import { styled } from "@mui/system";
import { Palette } from "../../components/Palette";

export const InfoPageContainer = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 3rem;
`;

export const BodyContainer = styled("div")`
  padding: 2rem 3rem 0 3rem;

  > h1 {
    font-weight: normal;
    font-size: 4rem;
    margin: 0;
  }

  > p {
    margin: 0;
    color: ${Palette.thGray};
    margin-bottom: 2rem;
    width: 50%;
  }
`;

export const TierContainer = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;

  > h2 {
    font-weight: normal;
    font-size: 3rem;
    margin: 0;
  }

  > img {
    height: 3rem;
    width: 3rem;
    margin-right: 1rem;
  }
`;

export const StyledDivider = styled(Divider)`
  margin: 1rem 0 3rem 0;
  color: ${Palette.thGray};
`;
