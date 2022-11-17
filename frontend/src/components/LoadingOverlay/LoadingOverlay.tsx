import { Backdrop, CircularProgress } from "@mui/material";

type LoadingOverlayProps = {
  isOpen: boolean;
};

const LoadingOverlay = ({ isOpen }: LoadingOverlayProps) => {
  return (
    <Backdrop open={isOpen}>
      <CircularProgress />
    </Backdrop>
  );
};

export default LoadingOverlay;
