import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import listReducer from 'features/bookings/bookingsSplice';
import locationReducer from 'features/locations/locationsSplice';
import priceReducer from 'features/price/priceSplice';

export const store = configureStore({
    reducer: {
        bookings: listReducer,
        locations: locationReducer,
        price: priceReducer
    },
});

export type AppDispatch = typeof store.dispatch;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
