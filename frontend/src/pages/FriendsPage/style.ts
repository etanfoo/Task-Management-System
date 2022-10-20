import { styled } from "@mui/system";

export const FriendsPageContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 3rem;
  text-align: center;
`;

export const BodyContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;

  h1 {
    font-size: 5rem;
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  div {
    width: 80%;
    align-items: center;
  }

  button {
  }

  .connectionsCardButton {
    text-transform: none;
    color: black;
    width: 80%;
    height: 4rem;
    border: 1px solid black;
    display: block;
  }

  .connectButton {
    margin: 1rem;
  }
`;

