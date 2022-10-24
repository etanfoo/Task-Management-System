import { styled } from "@mui/system";
import { Palette } from "../Palette";

export const TaskCardContainer = styled('div')`
  display: flex;
  flex-direction: row;
  border-radius: 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  padding: 0 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;

  transition: transform .2s;
  &:hover {
    transform: scale(1.05);
  };

  > :first-of-type {
    width: 10%;
    color: ${Palette.thGray};
  };
  > :nth-of-type(2) {
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  };
  > :nth-of-type(3) {
    width: 20%
  };
  > :nth-of-type(4) {
    width: 20%;
  };
`;