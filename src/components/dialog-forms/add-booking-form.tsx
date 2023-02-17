import { nanoid } from "@reduxjs/toolkit";

import { Button } from "components/controls";
import { useAddNewBookingMutation } from "features/bookings/bookingsSplice";
import { addNewLocation, allLocations, fetchLocations, LocationProps } from "features/locations/locationsSplice";
import React, { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch, useAppSelector } from "redux-tools/hooks";
import { DatePickerCustom } from "./date-picker-adapter";

export interface AddBookingFormProps {
    handleClose: () => void;
    selectedLocation?: LocationProps;
    setSelectedLocation?: (location: LocationProps | undefined) => void;
}

export const AddBookingForm = ({ handleClose, selectedLocation, setSelectedLocation }: AddBookingFormProps) => {
    const [addNewBooking, { isLoading }] = useAddNewBookingMutation();
    const locations = useAppSelector(allLocations);
    const dispatch = useAppDispatch();

    // Ref to store form data values
    const bookingName = useRef<string>();
    const bookingHours = useRef<number>();
    const bookingPrice = useRef<number>();

    const keyBookingName = "bookingName";
    const keyBookingDate = "bookingDate";
    const keyBookingHours = "bookingHours";
    const keyBookingPrice = "bookingPrice";
    const keyBookingLocation = "bookingLocation";

    const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isLoading) {
            const title = bookingName.current;
            const hours = bookingHours.current;
            const date = startDate ? startDate : new Date();
            const price = bookingPrice.current;
            const locationId = selectedLocation?.id;

            if (!hours || !title || !locationId) {
                return {
                    bookingName: "Required",
                    bookingHours: "Required",
                    bookingLocation: "Required"
                };
            }
            // if location already exists in db just add it's id to the booking db and not location db
            let setNewLocation: boolean = !locations.includes(selectedLocation);
            try {
                // add new location
                if (setNewLocation) {
                    await dispatch(
                        addNewLocation(
                            selectedLocation
                        )
                    ).unwrap();
                    if (setSelectedLocation) {
                        setSelectedLocation(undefined);
                    }
                    await dispatch(fetchLocations());
                }
            }
            catch (e) {
                console.warn("Failed to save the new location info")
            }

            // Add booking and location info - id
            try {
                await addNewBooking({
                                        bookedHours: hours,
                                        bookingDate: date.toISOString(),
                                        bookingLocationId: locationId,
                                        bookingTitle: title,
                                        id: nanoid(),
                                        bookingPrice: price
                                    }).unwrap();
                handleClose();
            }
            catch (e) {
                console.log("Failed to save the booking");
            }
        }
    };

    const [startDate, setStartDate] = useState<Date | null>(null);

    return (
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md mx-auto">
            <form autoComplete="on" id="addForm" onSubmit={handleSubmitForm}>
                <div className="form-group mb-6">
                    <input
                        type="text"
                        id={keyBookingName}
                        name={keyBookingName}
                        aria-describedby={"Booking name"}
                        className="form-control block
         w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        required={true}
                        placeholder="Booking name"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            (bookingName.current = event.target.value)
                        }
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="form-group mb-6">
                        <input
                            type="number"
                            id={keyBookingPrice}
                            name={keyBookingPrice}
                            className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-describedby="Price of booking"
                            placeholder="Price"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                (bookingPrice.current = Number(event.target.value))
                            }
                        />
                    </div>
                    <div className="form-group mb-6">
                        <input
                            type="number"
                            id={keyBookingHours}
                            name={keyBookingHours}
                            className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-describedby="Booked hours"
                            placeholder="Hours"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                (bookingHours.current = Number(event.target.value))
                            }
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="form-group mb-6">
                        <DatePickerCustom
                            onChange={setStartDate}
                            value={startDate}
                            id={keyBookingDate}
                            name={keyBookingDate}
                            placeholderText="Date"
                            className="w-full px-3 py-1.5 font-normal text-right border border-solid border-gray-300"
                        />
                    </div>
                    <div className="form-group mb-6">
                        <input
                            id={keyBookingLocation}
                            name={keyBookingLocation}
                            type="button"
                            value={
                                selectedLocation
                                    ? `${selectedLocation.city},${selectedLocation.country}`
                                    : "Location"
                            }
                            className="w-full px-3 py-1.5 bg-blue-600 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                            data-bs-toggle="modal"
                            data-bs-target="#commonModal"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="form-group mb-6">
                        <Button
                            type="button"
                            buttonClasses="w-full bg-red-600 hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </div>
                    <div className="form-group mb-6">
                        <Button
                            type="submit"
                            buttonClasses="w-full bg-green-600 hover:bg-greeb-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
