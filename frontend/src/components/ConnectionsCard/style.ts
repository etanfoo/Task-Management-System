import { Avatar } from "@mui/material";
import { styled } from "@mui/system";
import { Palette } from "../Palette";

export const ConnectionCardContainer = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  > img {
    height: 3.125rem;
    margin-right: 1rem;
    border-radius: 5rem;
  }
`;

export const StyledAvatar = styled(Avatar)`
  margin-right: 1rem;
  background-color: ${Palette.mainTeal};
`;

export const DetailsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  text-align: left;

  > h3 {
    margin: 0;
    font-weight: normal;
  }

  > p {
    margin: 0;
    color: ${Palette.thGray};
  }
`;
