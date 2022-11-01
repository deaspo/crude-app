import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux-tools/store";

interface PriceProps {
    value: number
}

const initialState: PriceProps = {
    value: 0
}

export const priceSplice = createSlice({
    name: 'price',
    initialState,
    reducers: {
        reset: (state) => {
            state.value = 0;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    }
});

export const {incrementByAmount, reset} = priceSplice.actions;
export const selectPrice = (state: RootState) => state.price.value;

export default priceSplice.reducer;
