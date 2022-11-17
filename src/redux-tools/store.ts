import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import locationReducer from 'features/locations/locationsSplice';
import priceReducer from 'features/price/priceSplice';
import { apiSlice } from "features";

export const store = configureStore({
                                        reducer: {
                                            [apiSlice.reducerPath]: apiSlice.reducer,
                                            locations: locationReducer,
                                            price: priceReducer
                                        },
                                        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
                                        devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
