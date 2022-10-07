import { styled } from "@mui/system";
import { Palette } from "../../../components/Palette";

export const InstructionCardContainer = styled('div')`
  display: flex;
  flex-direction: row;
  border-radius: 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 2rem;
  padding: 2rem 1rem;
  width: 75%;
  align-items: center;

  > img {
    height: 6.25rem;
    margin-right: 1rem;
  };

  transition: transform .2s;
  &:hover {
    transform: scale(1.05);
  }
`;

export const TextContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  > h3 {
    font-weight: normal;
    font-size: 1.75rem;
    margin-bottom: 0;
  };

  > p {
    color: ${Palette.thGray};
  }
`;