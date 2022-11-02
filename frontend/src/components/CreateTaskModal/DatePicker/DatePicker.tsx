import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';

const DatePicker = () => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const [value, setValue] = useState<Dayjs | null>(dayjs(todayDate));

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        inputFormat="DD/MM/YYYY"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} sx={{ width: "100%" }}/>}
      />
    </LocalizationProvider>
  )
};

export default DatePicker;