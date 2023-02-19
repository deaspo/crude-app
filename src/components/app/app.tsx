import { Router } from "components/router";
import { extendedApiSlice, extendedLocationApiSlice } from "features";
import React, { useEffect } from 'react';
import { useAppDispatch } from "redux-tools";

export const App = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(extendedApiSlice.endpoints.getBookings.initiate());
        dispatch(extendedLocationApiSlice.endpoints.getLocations.initiate());
    }, [dispatch]);

    return (
        <div className="min-h-full">
            <main>
                <Router key='router'/>
            </main>
        </div>
    );
}
