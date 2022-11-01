import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux-tools/store";

interface LocationState {
    id: string,
    location: string
}

const initialState: LocationState[] = [
    {id: '0', location: 'Bratislava'},
    {id: '1', location: 'Vienna'},
    {id: '2', location: 'Prague'}
]

export const locationsSplice = createSlice({
    name: 'locations',
    initialState,
    reducers: {}
});

export const allLocations = (state: RootState) => state.locations;

export default locationsSplice.reducer;
