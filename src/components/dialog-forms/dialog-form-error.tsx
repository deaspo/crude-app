import React from "react";
import { Field } from "react-final-form";

export interface FormErrorProps {
    name: string
}

export const DialogFormError = ({name}: FormErrorProps) => (
    <Field
        name={name}
        subscription={{touched: true, error: true}}
        render={({meta: {touched, error}}) =>
            touched && error ? <span>{error}</span> : null
        }
    />
);
