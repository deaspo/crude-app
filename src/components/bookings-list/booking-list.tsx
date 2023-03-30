import { List, ListItemText } from '@mui/material';
import { BookingProps, selectAllBookings, useGetBookingsQuery } from "features/bookings/bookingsSplice";
import React from "react";

import { useAppSelector } from "redux-tools/hooks";
import { BookingsListItem } from "./booking-list-item";

import { BookingListProps } from "./booking-list-props";

export const BookingsList = ({ handleClickMore }: BookingListProps) => {
    const bookingsList: BookingProps[] = useAppSelector(selectAllBookings);
    const orderedBookings: BookingProps[] = bookingsList.slice().sort((a, b) => b.postedDate.localeCompare(a.postedDate));

    let renderedRowItem: JSX.Element[] | null = null;

    const {
        isLoading,
        isSuccess,
        isError,
        error,
        data
    } = useGetBookingsQuery();
    
    if (isLoading) {
        renderedRowItem = [<ListItemText key="loading-message">Loading List</ListItemText>]
    } else if (isSuccess) {
        renderedRowItem = orderedBookings.map((booking) => {
            return (
                <BookingsListItem
                    booking={booking}
                    handleClickMore={handleClickMore}
                    key={booking.id}
                />
            )
        });
    } else if(isError) {
        renderedRowItem = [<ListItemText key="error-message">{JSON.stringify(error)}</ListItemText>]
    }
    
    return (
        <List sx={{
            width: '100%',
            overflow: 'auto',
            height: "100%",
            //maxHeight: "calc(100vh/2)",
            padding: "8px"
        }}>
            {renderedRowItem}
        </List>
    )
}
