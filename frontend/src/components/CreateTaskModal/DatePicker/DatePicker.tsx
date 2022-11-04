import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { ChangeEventHandler, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';

interface DatePickerProps {
  deadlineDate: string;
  selectedDate: ChangeEventHandler<HTMLInputElement>;
}

const DatePicker = ({ deadlineDate, selectedDate }: DatePickerProps) => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const [value, setValue] = useState<Dayjs | null>(dayjs(todayDate));
  const [deadline, setDeadline] = useState<string>(todayDate);
  //  console.log()
  // console.log(todayDate)
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    if (newValue !== null) setDeadline(newValue.format('YYYY/MM/DD'));
  };

  return(
    <LocalizationProvider dateAdapter={AdapterDayjs} selectedDate={deadline}>
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