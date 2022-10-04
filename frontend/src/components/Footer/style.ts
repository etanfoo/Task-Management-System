import { styled } from "@mui/system";
import { Palette } from "../Palette";

export const FooterContainer = styled('div')`
  display: flex;
  flex-direction: row;
  background-color: ${Palette.mainTeal};
  color: white;
  width: 100%;
  align-items: center;
  height: 3rem;
  padding: 0 1rem;
  font-size: 1rem;
  position: absolute;
  bottom: 0;
`;