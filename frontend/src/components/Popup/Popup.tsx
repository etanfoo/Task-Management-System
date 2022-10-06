import { Snackbar, Alert } from '@mui/material';

type PopupProps = {
  isOpen: boolean;
  popupMessage: string;
  type: "error" | "success";
  handleClose: () => void;
}

const Popup = ({ isOpen, handleClose, popupMessage, type }: PopupProps) => {
  return (
    <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type}>{popupMessage}</Alert>
    </Snackbar>
  );
};

export default Popup;
