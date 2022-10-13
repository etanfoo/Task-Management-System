import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { Palette } from "../../components/Palette";

export const PageNotFoundContainer = styled('div')`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  align-items: center;

  > img {
    height: 12.5rem;
    width: 12.5rem;
    margin-bottom: 2rem;
  };

  > h1 {
    font-weight: normal;
    width: 100%;
  };
`;

export const RedirectLink = styled(Link)`
  text-decoration: none;
  color: ${Palette.mainTeal};
  transition: all 0.1s ease 0s;
  &:hover {
    font-weight: bold;
  }
`;