import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "redux-tools/store";
import { mockGetData, mockServerAdapter } from "../utils";

export interface LocationProps {
  id: string;
  city: string;
  street?: string;
  zipCode?: string;
  isoCode?: string;
  country: string;
}

const initialState: LocationProps[] = [
  { id: "0", city: "Bratislava", isoCode: "SK", country: "Slovakia" },
  { id: "1", city: "Vienna", isoCode: "AT", country: "Austria" },
  { id: "2", city: "Prague", isoCode: "CZ", country: "Czech" },
  { id: "3", city: "Budapest", isoCode: "HU", country: "Hungary" },
  { id: "4", city: "Warsaw", isoCode: "PL", country: "Poland" },
  { id: "5", city: "Minsk", isoCode: "BY", country: "Belarus" },
];

export const fetchLocations = createAsyncThunk(
  "/locations/fetchLocations",
  async () => {
    const response = await mockGetData<LocationProps>();
    return response.data;
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
    } catch (err) {
      throw new Error("Unable to delete");
    }
  }
);

const locationsAdapter = createEntityAdapter<LocationProps>({
  sortComparer: (a, b) => a.city.localeCompare(b.city),
});
const initialStateAdapter = locationsAdapter.getInitialState({
  status: "idle",
});

export const locationsSplice = createSlice({
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
        locationsAdapter.upsertMany(state, initialState);
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
});

export const {
  selectAll: allLocations,
  selectById: selectLocationById,
  selectIds: locationIds,
} = locationsAdapter.getSelectors<RootState>((state) => state.locations);

export const getLocationsStatus = (state: RootState) => state.locations.status;
export const selectLocationsByCountry = createSelector(
  [allLocations, (state, countryInfo: string | undefined) => countryInfo],
  (locations, countryInfo) =>
    locations.filter((location) => location.country === countryInfo)
);

export default locationsSplice.reducer;
