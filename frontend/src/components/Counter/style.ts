import { styled } from "@mui/system";

export const CounterContainer = styled('div')`
  display: flex;
  flex-direction: column;
  text-align: left;
  border-left: 1px solid white;
  padding: 2rem;

  > h3 {
    font-size: 5rem;
    margin: 0;
  }

  > p {
    font-size: 1.25rem;
    margin-bottom: 0;
  }
`;