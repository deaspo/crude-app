import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { apiSlice } from "features";
import priceReducer from 'features/price/priceSplice';

export const store = configureStore({
                                        reducer: {
                                            [apiSlice.reducerPath]: apiSlice.reducer,
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
