import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { Palette } from "../../../../components/Palette";

export const RequestCardContainer = styled('div')`
  width: 100%;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  border: 2px solid ${Palette.gray};
  align-items: center;
  margin-bottom: 1rem;

  > img {
    margin-right: 1rem;
  }
`;

export const TextContainer = styled('div')`
  display: flex;
  flex-direction: column;
  text-align: left;

  > h3 {
    font-weight: normal;
    margin: 0;
  }

  > p {
    margin: 0;
    color: ${Palette.thGray};
  }
`;

export const ButtonContainer = styled('div')`
  margin-left: auto;
`;

export const IgnoreButton = styled(Button)`
  background-color: ${Palette.errorRed};
  text-transform: capitalize;
  margin-right: 1rem;
  &:hover {
    background-color: red;
  }
`;

export const AcceptButton = styled(Button)`
  background-color: ${Palette.mainTeal};
  text-transform: capitalize;

  &:hover {
    background-color: ${Palette.darkTeal};
  }
`;  