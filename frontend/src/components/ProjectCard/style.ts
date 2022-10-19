import { styled } from "@mui/system";

export const ProjectCardContainer = styled('div')`
  display: flex;
  flex-direction: row;
  border-radius: 1rem;
  justify-content: space-between;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;

  transition: transform .2s;
  &:hover {
    transform: scale(1.05);
  };

  > :first-of-type {
    width: 20%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  };
  > :nth-of-type(2) {
    width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  };
`;