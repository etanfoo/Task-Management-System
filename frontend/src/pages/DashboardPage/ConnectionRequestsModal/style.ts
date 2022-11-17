import { Divider } from "@mui/material";
import { styled } from "@mui/system";
import { Palette } from "../../../components/Palette";

export const ModalBody = styled('div')`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 0.25rem;
  padding: 2rem;
  width: 75%;
  height: 75%;

  > h2 {
    font-weight: normal;
    margin: 0;
  };

  > p {
    color: ${Palette.thGray};
    margin: auto;
    font-size: 2rem;
  };
`;

export const StyledDivider = styled(Divider)`
  background-color: ${Palette.gray};
  height: 0.05rem;
  margin: 1rem 0;
`;

export const OverflowContainer = styled('div')`
  overflow-y: auto;
  height: 90%;
`;