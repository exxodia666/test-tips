import React, { FC } from 'react';
import DatePicker from 'react-native-date-picker'
type TDatePickerComponentProps = {
    open: boolean,
    date: Date,
    setOpen: (val: boolean) => void,
    setDate: (date: Date) => void
}

const DatePickerComponent: FC<TDatePickerComponentProps> = ({
    open,
    date,
    setOpen,
    setDate
}) => {
    return (
        <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={(date) => {
                setOpen(false)
                setDate(date)
            }}
            onCancel={() => {
                setOpen(false)
            }}
        />
    );
};

export default DatePickerComponent;
