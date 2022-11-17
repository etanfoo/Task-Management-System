import { styled } from "@mui/material";

export const HappinessTrackerContainer = styled("div")`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 15%;
`;

export const EmotionContainer = styled("div")`
  display: flex;
  justify-content: space-evenly;

  > img {
    height: 2.7rem;
    width: 2.7rem;
    cursor: pointer;

    &:hover {
      transform: scale(1.25);
    }
  }
`;

export const BottomContainer = styled("div")`
  width: 55%;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;

  > h3 {
    text-align: center;
    font-weight: normal;
  }
`;
