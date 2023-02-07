import React, {useEffect} from 'react';
import { Router } from "components/router";
import { useAppDispatch, useAppSelector } from "redux-tools";
import { extendedApiSlice, fetchLocations, getLocationsStatus } from "features";

export const App = () => {
    const dispatch = useAppDispatch();
    const locationsStatus = useAppSelector(getLocationsStatus);
    useEffect(() => {
        dispatch(extendedApiSlice.endpoints.getBookings.initiate());
    }, [dispatch]);
    
    useEffect(() => {
        if (locationsStatus === 'idle') {
            dispatch(fetchLocations());
        }
    }, [locationsStatus, dispatch])
    
    
    return (
        <div className="min-h-full">
            <main>
                <Router key='router'/>
            </main>
        </div>
    );
}
