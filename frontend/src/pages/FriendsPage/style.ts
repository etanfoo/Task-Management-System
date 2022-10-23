import { styled } from "@mui/system";
import { Palette } from "../../components/Palette";

export const FriendsPageContainer = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 3rem;
  text-align: center;
`;

export const BodyContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;

  > h1 {
    font-size: 5rem;
    margin-top: 0.5rem;
    margin-bottom: 0;
    font-weight: normal;
    color: ${Palette.mainTeal};
  }

  > p {
    color: ${Palette.thGray};
  }

  > div {
    width: 50%;
  }

  .connectButton {
    margin-top: 1rem;
    margin-bottom: 0.9rem;
    background-color: ${Palette.mainTeal};
  }
`;
