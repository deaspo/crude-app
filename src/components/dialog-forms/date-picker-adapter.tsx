import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FieldRenderProps } from "react-final-form";
import { AdditionalProps } from "../utils";

import { CalenderInfoContainer, formClasses } from "./dialog-forms-styles";

export const DatePickerAdapter = ({ input: { onChange, value }, ...rest }: FieldRenderProps<any>) => (
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
                               style={{ color: "red", display: "flex", justifyContent: "center" }}>Don't forget to check
            the weather!</CalenderInfoContainer>
    </DatePicker>
);

export interface DatePickerProps extends AdditionalProps {
    value: Date | null;
    onChange: (value: Date | null) => void;
}

export const DatePickerCustom = ({ value, onChange, ...rest }: DatePickerProps) => {
    return (
        <DatePicker
            selected={value}
            onChange={date => onChange(date)}
            minDate={new Date()}
            withPortal
            showWeekNumbers
            fixedHeight
            todayButton="Today"
            dateFormat="dd-MM-yyyy"
            {...rest}
        >
            <CalenderInfoContainer className={formClasses.calenderInfo}
                                   style={{ color: "red", display: "flex", justifyContent: "center" }}>Don't forget to
                check
                the weather!</CalenderInfoContainer>
        </DatePicker>
    );
}