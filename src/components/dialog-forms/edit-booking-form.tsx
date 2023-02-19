import { CommonDialog } from "components/dialog";
import { BookingDataType, BookingForm } from "components/dialog-forms/booking-form";
import { allLocations, fetchLocations, LocationProps, useAddNewLocationMutation } from "features";
import { selectBookingById, useUpdateBookingMutation } from "features/bookings/bookingsSplice";
import React from "react";

import { useAppDispatch, useAppSelector } from "redux-tools";

export interface EditBookingFormProps {
  handleClose: () => void;
  bookingId: string;
  selectedLocation?: LocationProps;
  setSelectedLocation?: (location: LocationProps | undefined) => void;
}

export const EditBookingForm = ({
  handleClose,
  bookingId,
  selectedLocation,
  setSelectedLocation,
}: EditBookingFormProps) => {
  const [updateBooking, { isLoading }] = useUpdateBookingMutation();
  const [addNewLocation] = useAddNewLocationMutation();
  const booking = useAppSelector((state) =>
                                     selectBookingById(state, bookingId)
  );
  const locations = useAppSelector(allLocations);
  const dispatch = useAppDispatch();

  if (!booking) {
    return (
      <CommonDialog open={true} handleClose={handleClose} title={"Error"}>
        <h2> Booking not found!</h2>
      </CommonDialog>
    );
  }

  const handleSubmitForm = async (values: BookingDataType) => {
    const title = values.bookingTitle;
    const hours = values.bookedHours;
    const date = values.bookingDate;
    const bookingPrice = values.bookingPrice;

    const locationId = selectedLocation
      ? selectedLocation.id
      : booking.bookingLocationId;

    if (!hours || !title || !locationId) {
      return {
        bookingName: "Required",
        bookingHours: "Required",
        bookingLocation: "Required",
      };
    }

    const canSave = [title, hours, locationId].every(Boolean) && !isLoading;

    if (canSave) {
      if (selectedLocation) {
        // if location already exists in db just add it's id to the booking db and not location db
        let setNewLocation: boolean = !locations.includes(selectedLocation);
        try {
          // add new location
          if (setNewLocation) {
            //await dispatch(addNewLocation(selectedLocation)).unwrap();
            await addNewLocation(selectedLocation);
            if (setSelectedLocation) {
              setSelectedLocation(undefined);
            }
            await dispatch(fetchLocations());
          }
        } catch (e) {
          console.warn("Failed to save the new location info");
        }
      }

      try {
        await updateBooking({
          id: booking.id,
          bookedHours: hours,
          bookingTitle: title,
          bookingDate: date,
          bookingPrice: bookingPrice,
          bookingLocationId: locationId,
          reactions: booking.reactions,
        }).unwrap();
        handleClose();
      } catch (err) {
        console.error("Failed to save the booking", err);
      }
    }
  };

  return (
    <BookingForm
      onSubmit={handleSubmitForm}
      handleClose={handleClose}
      formData={booking}
      selectedLocation={selectedLocation}
    />
  );
};
