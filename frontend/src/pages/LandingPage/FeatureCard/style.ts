import { styled } from "@mui/system";
import { Palette } from "../../../components/Palette";

export const FeatureCardContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 0.75rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  text-align: left;

  > p {
    color: ${Palette.thGray};
  };

  transition: transform .2s;
  
  &:hover {
    transform: scale(1.05);
  };
`;

export const ImageTitleContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;

  > img {
    height: 3.125rem;
    margin-right: 0.5rem;
  };

  > h3 {
    margin: 0;
    font-weight: normal;
    font-size: 2rem;
  };
`;