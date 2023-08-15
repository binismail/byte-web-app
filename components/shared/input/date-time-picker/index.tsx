import moment from 'moment';
import { HTMLProps } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import style from './index.module.scss';

type Props = {
  onChange?: (value: string | moment.Moment) => void;
  dateFormat?: string | boolean;
  timeFormat?: string | boolean;
  inputProps?: HTMLProps<HTMLInputElement>;
  closeOnSelect?: boolean;
  value?: string | Date | moment.Moment;
};

const DateTimePicker = ({
  onChange,
  dateFormat,
  timeFormat,
  inputProps,
  closeOnSelect,
  value,
}: Props) => {
  return (
    <Datetime
      className={style.dat_time_picker_root}
      closeOnSelect={closeOnSelect}
      inputProps={inputProps}
      onChange={onChange}
      dateFormat={dateFormat}
      timeFormat={timeFormat}
      value={value}
    />
  );
};

export default DateTimePicker;
