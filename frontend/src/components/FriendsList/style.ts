import { styled } from "@mui/material";
import { Palette } from "../../components/Palette";

// export const FriendsListContainer = styled('div')`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   height: 100%;
//   min-height: 100vh;
//   position: relative;
//   padding-bottom: 3rem;
//   text-align: center;
// `;

export const FriendsListContainer = styled('div')`
  border-right: 1px solid ${Palette.gray};
  border-top: 1px solid ${Palette.gray};
  height: 100vh;
  width: 25rem;
  border-radius: 0.5rem;
  padding: 1rem;

  > h2 {
    font-weight: normal;
  }
`;

export const FriendsContainer = styled('div')`
  overflow-y: auto;
  padding: 0 1rem;
  height: 65%;
`;