import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux-tools/store";

export interface LocationProps {
    id: string,
    location: string
}

const initialState: LocationProps[] = [
    {id: '0', location: 'Bratislava'},
    {id: '1', location: 'Vienna'},
    {id: '2', location: 'Prague'}
]

// Mock Server call functions
function mockGetLocationData(): Promise<{data:LocationProps[]}> {
    return new Promise<{data:LocationProps[]}>((resolve) => {
        resolve({data:[]})
    })
}

export const fetchLocations = createAsyncThunk(
    '/locations/fetchLocations',
    async () => {
        const response = await mockGetLocationData();
        return response.data
})

export const locationsSplice = createSlice({
    name: 'locations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLocations.fulfilled,(state, action) => {
            return action.payload;
        })
    }
});

export const allLocations = (state: RootState) => state.locations;

export const selectLocationsById = (state: RootState, locationId: string | undefined) => state.locations.find(location => location.id === locationId);

export default locationsSplice.reducer;
