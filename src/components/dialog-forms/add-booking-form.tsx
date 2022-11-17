import React from "react";
import { useAddNewBookingMutation } from "features/bookings/bookingsSplice";
import { allLocations } from "features/locations/locationsSplice";
import { useAppSelector } from "redux-tools/hooks";
import { Button, Grid } from "@mui/material";

import { Field, Form, FormProps, FormRenderProps } from "react-final-form";
import { CommonDialog } from "components/dialog";

import { FormButtonContainer, formClasses, GridItemContainer } from "./dialog-forms-styles";
import { DialogFormError } from "./dialog-form-error";
import { DatePickerAdapter } from "./date-picker-adapter";
import "react-datepicker/dist/react-datepicker.css";
import { nanoid } from "@reduxjs/toolkit";

const CreateForm = Form as React.FC<FormProps>;

export interface AddBookingFormProps {
    open: boolean,
    handleClose: () => void;
}

export const AddBookingForm = ({open, handleClose}: AddBookingFormProps) => {
    const [ addNewBooking, {isLoading} ] = useAddNewBookingMutation();
    const locations = useAppSelector(allLocations);
    
    const keyBookingName = "bookingName";
    const keyBookingDate = "bookingDate";
    const keyBookingHours = "bookingHours";
    const keyBookingPrice = "bookingPrice";
    const keyBookingLocation = "bookingLocation";
    
    const required = (value: string | number) => (value ? undefined : "Required");
    
    const locationsOptions = locations.map(location => (
        <option key={location.id} value={location.id}>{location.location}</option>
    ))
    
    const renderForm = ({handleSubmit}: FormRenderProps): JSX.Element => {
        return (
            <form
                autoComplete="off"
                id="addForm"
                onSubmit={handleSubmit}
            >
                <Grid container direction="column" rowSpacing="16px">
                    <GridItemContainer className={formClasses.gridItem} item>
                        <label> Booking Name</label>
                        <Field
                            name={keyBookingName}
                            component="input"
                            type="text"
                            placeholder="Booking Name"
                            validate={required}
                        />
                        <DialogFormError name={keyBookingName}/>
                    </GridItemContainer>
                    <GridItemContainer className={formClasses.gridItem} item>
                        <label> Booking Date</label>
                        <Field
                            name={keyBookingDate}
                            component={DatePickerAdapter}
                            dateFormat="dd-MM-yyyy"
                            placeholderText="Booking Date"
                        />
                    </GridItemContainer>
                    <GridItemContainer className={formClasses.gridItem} item>
                        <label> Booked Hours</label>
                        <Field
                            name={keyBookingHours}
                            component="input"
                            placeholder="Hours Booked"
                            type="text"
                            validate={required}
                        />
                        <DialogFormError name={keyBookingHours}/>
                    </GridItemContainer>
                    <GridItemContainer className={formClasses.gridItem} item>
                        <label> Booking Price</label>
                        <Field
                            name={keyBookingPrice}
                            component="input"
                            placeholder="Booking Price"
                            type="text"
                        />
                    </GridItemContainer>
                    <GridItemContainer className={formClasses.gridItem} item>
                        <label> Booked Location</label>
                        <Field
                            name={keyBookingLocation}
                            component="select"
                            validate={required}
                        >
                            <option value=""/>
                            {locationsOptions}
                        </Field>
                        <DialogFormError name={keyBookingLocation}/>
                    </GridItemContainer>
                    <Grid item>
                        <FormButtonContainer className={formClasses.buttonContainer} data-testid="submit-button">
                            <Button
                                onClick={handleClose}
                            >
                                Close
                            </Button>
                            <Button
                                type="submit"
                            >
                                Submit
                            </Button>
                        </FormButtonContainer>
                    </Grid>
                </Grid>
            </form>
        );
    }
    
    const handleSubmitForm = async (values: any): Promise<any> => {
        if (!isLoading) {
            const title = values[keyBookingName];
            const hours = values[keyBookingHours];
            const date = values[keyBookingDate];
            const bookingPrice = values[keyBookingPrice];
            const locationId = values[keyBookingLocation];
    
            if (!hours || !title || !locationId) {
                return {
                    bookingName: "Required",
                    bookingHours: "Required",
                    bookingLocation: "Required",
                }
            }
    
            try {
                await addNewBooking(
                    {
                        bookedHours: hours,
                        bookingDate: date.toISOString(),
                        bookingLocationId: locationId,
                        bookingTitle: title,
                        id: nanoid(),
                        bookingPrice: bookingPrice,
                    }).unwrap()
                handleClose();
            } catch (e) {
                console.log("Failed to save the booking")
            }
        }
        
    }
    
    return (
        <CommonDialog
            open={open}
            title={"Add a New Booking"}
        >
            <CreateForm
                onSubmit={handleSubmitForm}
                render={renderForm}
            />
        </CommonDialog>
    );
}
