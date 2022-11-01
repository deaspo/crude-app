import DatePicker from "react-datepicker";
import { FieldRenderProps } from "react-final-form";
import "react-datepicker/dist/react-datepicker.css";

import { CalenderInfoContainer, formClasses } from "./dialog-forms-styles";
import React from "react";

export const DatePickerAdapter = ({input: {onChange, value}, ...rest}: FieldRenderProps<any>) => (
    <DatePicker
        selected={value}
        onChange={date => onChange(date)}
        minDate={new Date()}
        withPortal
        showWeekNumbers
        fixedHeight
        todayButton="Today"
        {...rest}
    >
        <CalenderInfoContainer className={formClasses.calenderInfo}
                               style={{color: "red", display: "flex", justifyContent: "center"}}>Don't forget to check
            the weather!</CalenderInfoContainer>
    </DatePicker>
);
