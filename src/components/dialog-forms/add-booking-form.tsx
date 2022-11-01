import React from "react";
import { bookingAdded } from "features/bookings/bookingsSplice";
import { allLocations } from "features/locations/locationsSplice";
import { useAppDispatch, useAppSelector } from "redux-tools/hooks";
import { Button, Grid } from "@mui/material";

import { Field, Form, FormProps, FormRenderProps } from "react-final-form";
import { CommonDialog } from "components/dialog";

import { FormButtonContainer, formClasses, GridItemContainer } from "./dialog-forms-styles";
import { DialogFormError } from "./dialog-form-error";
import { DatePickerAdapter } from "./date-picker-adapter";

const CreateForm = Form as React.FC<FormProps>;

export interface AddBookingFormProps {
    open: boolean,
    handleClose: () => void;
}

export const AddBookingForm = ({open, handleClose}: AddBookingFormProps) => {
    const dispatch = useAppDispatch();
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
                            placeholder="Booking Date"
                        />
                    </GridItemContainer>
                    <GridItemContainer className={formClasses.gridItem} item>
                        <label> Booked Hours</label>
                        <Field
                            name={keyBookingHours}
                            component="input"
                            placeholder="Hours Booked"
                            type="text"
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
                        >
                            <option value=""/>
                            {locationsOptions}
                        </Field>
                        <DialogFormError name={keyBookingLocation}/>
                    </GridItemContainer>
                    <Grid item>
                        <FormButtonContainer className={formClasses.buttonContainer} data-testid="submit-button">
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
        const title = values[keyBookingName];
        const hours = values[keyBookingHours];
        const date = values[keyBookingDate];
        const bookingPrice = values[keyBookingPrice];
        const locationId = values[keyBookingLocation];
        
        if (!hours || !title || !locationId) {
            return {}
        }
        
        dispatch(
            bookingAdded(hours, title, date.toISOString(), bookingPrice, locationId)
        )
        handleClose();
    }
    
    return (
        <CommonDialog
            open={open}
            handleClose={handleClose}
        >
            <CreateForm
                onSubmit={handleSubmitForm}
                render={renderForm}
            />
        </CommonDialog>
    );
}

/*export const AddBookingForm = ({open, handleClose}: AddBookingFormProps) => {
    const dispatch = useAppDispatch();
    const locations = useAppSelector(allLocations);
    
    const [hours, setHours] = useState(0);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [bookingPrice, setBookingPrice] = useState(0);
    const [locationId, setLocationId] = useState('');
    
    const onTitleChanged = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
    const onHoursChanged = (event: React.ChangeEvent<HTMLInputElement>) => setHours(Number(event.target.value));
    const onDateChanged = (event: React.ChangeEvent<HTMLInputElement>) => setDate(event.target.value);
    const onPriceChanged = (event: React.ChangeEvent<HTMLInputElement>) => setBookingPrice(Number(event.target.value));
    const onLocationChanged = (event: React.ChangeEvent<HTMLSelectElement>) => setLocationId(event.target.value);
    
    const canSave = Boolean(title) && Boolean(hours) && Boolean(locationId);
    
    const onSubmit = () => {
        if (canSave) {
            dispatch(
                bookingAdded(hours, title, date, bookingPrice, locationId)
            )
            setHours(0);
            setTitle('');
            setDate('');
            setBookingPrice(0);
            setLocationId('');
            handleClose();
        }
    }
    
    
    const locationsOptions = locations.map(location => (
        <option key={location.id} value={location.id}>{location.location}</option>
    ))
    
    return (
        <CommonDialog
            open={open}
            handleClose={handleClose}
        >
            <h2>Add New Booking</h2>
            <form>
                <label htmlFor="bookingContent"> Title</label>
                <input
                    type="text"
                    id="bookingContent"
                    name="bookingContent"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="party">Enter a date and time for your booking:</label>
                <input
                    id="bookingDate"
                    type="datetime-local"
                    name="bookingDate"
                    value={date}
                    onChange={onDateChanged}
                />
                <label htmlFor="bookingHours"> Hours Booked</label>
                <input
                    type="number"
                    id="bookingHours"
                    name="bookingHours"
                    value={hours}
                    onChange={onHoursChanged}
                />
                <label htmlFor="bookingHours"> Booking Price</label>
                <input
                    type="number"
                    id="bookingPrice"
                    name="bookingPrice"
                    value={bookingPrice}
                    onChange={onPriceChanged}
                />
                <label htmlFor="bookingLocation"> Booking Location</label>
                <select id="bookingLocation" value={locationId} onChange={onLocationChanged}>
                    <option value=""/>
                    {locationsOptions}
                </select>
                <button disabled={!canSave} onClick={onSubmit} type="button"> Save Booking</button>
            </form>
        </CommonDialog>
    );
}*/
