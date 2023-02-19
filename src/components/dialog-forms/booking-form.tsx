import { Button } from "components/controls";
import { DatePickerCustom } from "components/dialog-forms/date-picker-adapter";
import { parseISO } from "date-fns";
import { BookingProps, LocationProps, selectLocationById } from "features";
import React, { useCallback, useRef, useState } from "react";
import { useAppSelector } from "redux-tools";

export type BookingDataType = Partial<
  Pick<
    BookingProps,
    | "bookedHours"
    | "bookingPrice"
    | "bookingDate"
    | "bookingLocationId"
    | "bookingTitle"
  >
>;

export interface BookingFormProps {
  onSubmit: (data: BookingDataType) => void;
  handleClose: () => void;
  selectedLocation?: LocationProps;
  formData: BookingDataType;
}

export const BookingForm = ({
  handleClose,
  onSubmit,
  formData,
  selectedLocation,
}: BookingFormProps) => {
  const keyBookingName = "bookingName";
  const keyBookingDate = "bookingDate";
  const keyBookingHours = "bookingHours";
  const keyBookingPrice = "bookingPrice";
  const keyBookingLocation = "bookingLocation";

  const {
    bookingDate,
    bookingPrice,
    bookingLocationId,
    bookedHours,
    bookingTitle,
  } = formData;

  // Ref to store form data values
  const bTitleRef = useRef<HTMLInputElement | null>(null);
  const bookingNameRef = useCallback(
    (input: HTMLInputElement | null) => {
      if (input) {
        if (typeof bookingTitle === "string") {
          input.value = bookingTitle;
        }
        bTitleRef.current = input;
      }
    },
    [bookingTitle]
  );

  const [bookingHours, setBookingHours] = useState(bookedHours);
  const [bookedPrice, setBookingPrice] = useState(bookingPrice);

  const initialDate = bookingDate ? parseISO(bookingDate) : null;
  const [startDate, setStartDate] = useState<Date | null>(initialDate);

  const locationInfo = useAppSelector((state) =>
    selectLocationById(state, bookingLocationId ? bookingLocationId : "")
  );

  const setLocationMessage = () => {
    if (selectedLocation) {
      return `${selectedLocation.city}, ${selectedLocation.country}`;
    } else if (locationInfo) {
      return `${locationInfo.city}, ${locationInfo.country}`;
    } else {
      return "Location";
    }
  };

  const location: string = setLocationMessage();

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const date = startDate ? startDate : new Date();
    const formData: BookingDataType = {
      bookingTitle: bTitleRef.current?.value,
      bookedHours: bookingHours,
      bookingPrice: bookedPrice,
      bookingDate: date.toISOString(),
    };
    onSubmit(formData);
  };

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
            ref={bookingNameRef}
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
                setBookingPrice(Number(event.target.value))
              }
              value={bookedPrice}
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
                setBookingHours(Number(event.target.value))
              }
              value={bookingHours}
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
              value={location}
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
