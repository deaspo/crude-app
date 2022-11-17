import React, {useEffect} from 'react';
import { Router } from "components/router";
import { useAppDispatch } from "redux-tools";
import { extendedApiSlice } from "features";

export const App = () => {
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(extendedApiSlice.endpoints.getBookings.initiate());
    }, [dispatch]);
    
    
    return (
        <div className="min-h-full">
            <main>
                <Router key='router'/>
            </main>
        </div>
    );
}
