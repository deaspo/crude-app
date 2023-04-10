import { List, ListItemText } from '@mui/material';
import { BookingsListItem } from "components/bookings-list/booking-list-item";
import { useGetBookingsQuery } from "features/bookings/bookingsSplice";
import React from "react";

import { BookingListProps } from "./booking-list-props";

export const BookingsList = ({ handleClickMore, onItemClick }: BookingListProps) => {
    //const bookingsList: BookingProps[] = useAppSelector(selectAllBookings);
    //const orderedBookings: BookingProps[] = bookingsList.slice().sort((a, b) =>
    // b.postedDate.localeCompare(a.postedDate));

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
        const { ids, entities } = data;
        renderedRowItem = ids.map(item => {
            const booking = entities[item];
            if (booking) {
                return (
                    <BookingsListItem
                        booking={booking}
                        handleClickMore={handleClickMore}
                        key={booking.id}
                        onItemClick={onItemClick}
                        itemButton={true}
                    />
                )
            }
            return <></>;
        })
        /*renderedRowItem = orderedBookings.map((booking) => {
         return (
         <BookingsListItem
         booking={booking}
         handleClickMore={handleClickMore}
         key={booking.id}
         onItemClick={onItemClick}
         itemButton={true}
         />
         )
         });*/
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
