import React, {useEffect} from 'react';
import { Router } from "components/router";
import { useAppDispatch, useAppSelector } from "redux-tools";
import { fetchBookings, getBookingsStatus } from "features";

export const App = () => {
    const dispatch = useAppDispatch();
    const bookingsStatus = useAppSelector(getBookingsStatus);
    
    useEffect(() => {
        if (bookingsStatus === 'idle') {
            dispatch(fetchBookings())
        }
    }, [bookingsStatus,dispatch]);
    
    return (
        <div className="min-h-full">
            <main>
                <Router key='router'/>
            </main>
        </div>
    );
}
