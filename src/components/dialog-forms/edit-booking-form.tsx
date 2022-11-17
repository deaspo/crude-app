import { useAppSelector } from "redux-tools";
import { selectBookingById, useUpdateBookingMutation } from "features/bookings/bookingsSplice";
import { allLocations } from "features/locations/locationsSplice";
import React from "react";
import { CommonDialog } from "components/dialog";
import { DialogFormError } from "./dialog-form-error";
import { DatePickerAdapter } from "./date-picker-adapter";
import { Button, Grid } from '@mui/material';
import { parseISO } from 'date-fns';

import { Field, Form, FormProps, FormRenderProps } from "react-final-form";
import { FormButtonContainer, formClasses, GridItemContainer } from "./dialog-forms-styles";

export interface EditBookingFormProps {
    open: boolean,
    handleClose: () => void;
    bookingId: string,
}

const CreateForm = Form as React.FC<FormProps>;

export const EditBookingForm = ({open, handleClose, bookingId}: EditBookingFormProps) => {
    const [updateBooking, {isLoading}] = useUpdateBookingMutation();
    const booking = useAppSelector(state => selectBookingById(state, bookingId));
    const locations = useAppSelector(allLocations);
    
    const keyBookingName = "bookingName";
    const keyBookingDate = "bookingDate";
    const keyBookingHours = "bookingHours";
    const keyBookingPrice = "bookingPrice";
    const keyBookingLocation = "bookingLocation";
    
    if (!booking) {
        return (
            <CommonDialog
                open={open}
                handleClose={handleClose}
                title={"Error"}
            >
                <h2> Booking not found!</h2>
            </CommonDialog>
        );
    }
    
    const initialDate = parseISO(booking.bookingDate);
    
    const handleSubmitForm = async (values: any): Promise<any> => {
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
        
        const canSave = [title, hours, locationId].every(Boolean) && !isLoading;
        
        if (canSave) {
            try {
                await  updateBooking(
                        {
                            id: booking.id,
                            bookedHours: hours,
                            bookingTitle: title,
                            bookingDate: date.toISOString(),
                            bookingPrice: bookingPrice,
                            bookingLocationId: locationId,
                            reactions: booking.reactions
                        }
                    ).unwrap()
                handleClose();
            } catch (err) {
                console.error('Failed to save the booking', err);
            }
        }
    }
    
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
                            initialValue={booking.bookingTitle}
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
                            initialValue={initialDate}
                        />
                    </GridItemContainer>
                    <GridItemContainer className={formClasses.gridItem} item>
                        <label> Booked Hours</label>
                        <Field
                            name={keyBookingHours}
                            component="input"
                            placeholder="Hours Booked"
                            type="text"
                            initialValue={booking.bookedHours}
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
                            initialValue={booking.bookingPrice}
                        />
                    </GridItemContainer>
                    <GridItemContainer className={formClasses.gridItem} item>
                        <label> Booked Location</label>
                        <Field
                            name={keyBookingLocation}
                            component="select"
                            initialValue={booking.bookingLocationId}
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
    
    return (
        <CommonDialog
            open={open}
            title={"Edit Booking Info"}
        >
            <CreateForm
                onSubmit={handleSubmitForm}
                render={renderForm}
            />
        </CommonDialog>
    );
}
