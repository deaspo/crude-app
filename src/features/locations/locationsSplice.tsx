import { createAsyncThunk, createEntityAdapter, createSelector, EntityState } from "@reduxjs/toolkit";
import { RootState } from "redux-tools/store";
import { apiSlice } from "../api";
import { mockGetData, mockServerAdapter } from "../utils";

export interface LocationProps {
    id: string;
    city: string;
    isoCode: string;
    stateCode?: string;
    country: string;
}

/*
 * bratislava sk - sk_bl_bratislava
 * prague cz - cz_10_prague
 * vienna at - at_9_vienna
 * budapest hu - hu_bu_budapest
 * warsaw pl - pl_mz_warsaw
 * minsk by - by_hm_minsk
 * */
const initialState: LocationProps[] = [
    { id: "sk_bl_bratislava", city: "Bratislava", isoCode: "SK", country: "Slovakia" },
    { id: "at_9_vienna", city: "Vienna", isoCode: "AT", country: "Austria" },
    { id: "cz_10_prague", city: "Prague", isoCode: "CZ", country: "Czech" },
    { id: "hu_bu_budapest", city: "Budapest", isoCode: "HU", country: "Hungary" },
    { id: "pl_mz_warsaw", city: "Warsaw", isoCode: "PL", country: "Poland" },
    { id: "by_hm_minsk", city: "Minsk", isoCode: "BY", country: "Belarus" }
];

export const fetchLocations = createAsyncThunk(
  "/locations/fetchLocations",
  async () => {
    const response = await mockGetData<LocationProps>();
      return response.data.concat(initialState);
  }
);

export const addNewLocation = createAsyncThunk(
  "/locations/addNewLocation",
  async (initialLocation: LocationProps) => {
    const response = await mockServerAdapter(initialLocation);
    return response.data;
  }
);

export const updateLocation = createAsyncThunk(
  "/locations/updateLocation",
  async (initialLocation: LocationProps) => {
    try {
      const response = await mockServerAdapter(initialLocation);
      return response.data;
    } catch (err) {
      throw new Error("Unable to update");
    }
  }
);

export const deleteLocation = createAsyncThunk(
  "/locations/deleteLocation",
  async (initialLocation: LocationProps) => {
    try {
      const response = await mockServerAdapter(initialLocation);
      return response.data;
    }
    catch (err) {
        throw new Error("Unable to delete");
    }
  }
);

const locationsAdapter = createEntityAdapter<LocationProps>({
                                                                sortComparer: (a, b) => a.country.localeCompare(b.country)
                                                            });
const initialStateAdapter = locationsAdapter.getInitialState();

export const extendedLocationApiSlice = apiSlice.injectEndpoints({
                                                                     endpoints: builder => ({
                                                                         getLocations: builder.query<EntityState<LocationProps>, void>({
                                                                                                                                           query: () => '/locations',
                                                                                                                                           transformResponse: (response: LocationProps[]) => {
                                                                                                                                               return locationsAdapter.setAll(initialStateAdapter, response)
                                                                                                                                           },
                                                                                                                                           providesTags: (result, error, arg, meta) => result ? [
                                                                                                                                               {
                                                                                                                                                   type: 'Locations',
                                                                                                                                                   if: 'LIST'
                                                                                                                                               },
                                                                                                                                               ...result.ids.map(id => ({
                                                                                                                                                   type: 'Locations' as const,
                                                                                                                                                   id
                                                                                                                                               }))
                                                                                                                                           ] : [{
                                                                                                                                               type: 'Bookings',
                                                                                                                                               id: 'LIST'
                                                                                                                                           }]
                                                                                                                                       }),
                                                                         getLocationById: builder.query<LocationProps | null | undefined, string | undefined>({
                                                                                                                                                                  query: id => `locations/?id=${id}`,
                                                                                                                                                                  transformResponse: (response: LocationProps[], meta, arg) => {
                                                                                                                                                                      return response.at(0);
                                                                                                                                                                  },
                                                                                                                                                                  providesTags: (result, error, id) => [{
                                                                                                                                                                      type: 'Locations',
                                                                                                                                                                      id
                                                                                                                                                                  }]
                                                                                                                                                              }),
                                                                         addNewLocation: builder.mutation({
                                                                                                              query: initialLocations => ({
                                                                                                                  url: '/locations',
                                                                                                                  method: 'POST',
                                                                                                                  body: {
                                                                                                                      ...initialLocations
                                                                                                                  }
                                                                                                              }),
                                                                                                              invalidatesTags: ['Locations']
                                                                                                          })
                                                                     })
                                                                 });
export const {
    useAddNewLocationMutation,
    useGetLocationByIdQuery,
    useGetLocationsQuery
} = extendedLocationApiSlice;
export const selectLocationResults = extendedLocationApiSlice.endpoints.getLocations.select();
// Memoized selector
const selectLocationsData = createSelector(selectLocationResults, locationsResult => locationsResult.data)

/*export const locationsSplice = createSlice({
 name: "locations",
 initialState: initialStateAdapter,
 reducers: {},
 extraReducers: (builder) => {
 builder
 .addCase(fetchLocations.pending, (state, action) => {
 state.status = "loading";
 })
 .addCase(fetchLocations.fulfilled, (state, action) => {
 state.status = "succeeded";
 locationsAdapter.upsertMany(state, action.payload);
 })
 .addCase(fetchLocations.rejected, (state, action) => {
 state.status = "failed";
 })
 .addCase(addNewLocation.fulfilled, (state, action) => {
 locationsAdapter.addOne(state, action.payload);
 })
 .addCase(updateLocation.fulfilled, (state, action) => {
 if (!action.payload.id) {
 console.log("Update did not complete", action.payload);
 return;
 }
 locationsAdapter.upsertOne(state, action.payload);
 })
 .addCase(deleteLocation.fulfilled, (state, action) => {
 if (!action.payload.id) {
 console.log("Delete did not complete");
 return;
 }
 const { id } = action.payload;
 locationsAdapter.removeOne(state, id);
 });
 },
 });*/

export const {
    selectAll: allLocations,
    selectById: selectLocationById,
    selectIds: locationIds
} = locationsAdapter.getSelectors<RootState>(state => selectLocationsData(state) ?? initialStateAdapter);

//export const getLocationsStatus = (state: RootState) => state.locations.status;
/*export const selectLocationsByCountry = createSelector(
 [allLocations, (state, countryInfo: string | undefined) => countryInfo],
 (locations, countryInfo) =>
 locations.filter((location) => location.country === countryInfo)
 );*/

//export default locationsSplice.reducer;
