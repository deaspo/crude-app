import { createAsyncThunk, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "redux-tools/store";
import { sub } from 'date-fns';

// Mock Server call function
function fetchBooking(booking: BookingProps) {
    return new Promise<{ data: BookingProps }>((resolve) => setTimeout(
        () => resolve({data: booking}), 500
    ))
}

export const addNewBooking = createAsyncThunk(
    'bookings/addBooking',
    async (initialBooking: BookingProps) => {
        const response = await fetchBooking(initialBooking);
        return response.data
    });

export const updateBooking = createAsyncThunk(
    'bookings/updateBooking',
    async (initialBooking: BookingProps) => {
        //const {id} = initialBooking;
        try {
            const response = await fetchBooking(initialBooking);
            return response.data;
        } catch (err) {
            return initialBooking;
        }
    });

export const deleteBooking = createAsyncThunk(
    'bookings/deleteBooking',
    async (initialBooking: BookingProps) => {
        //const {id} = initialBooking;
        try {
            const response = await fetchBooking(initialBooking);
            return response.data;
        } catch (err) {
            return initialBooking;
        }
    });

export interface ReactionType {
    thumbsUp: number,
    thumbsDown: number
}

export interface BookingProps {
    id: string,
    bookedHours: number,
    bookingTitle: string,
    bookingDate: string,
    bookingPrice: number,
    bookingLocationId: string,
    postedDate: string,
    reactions: ReactionType
}

export interface BookingsState {
    bookings: BookingProps[],
    status: 'idle' | 'loading' | 'pending' | 'succeeded' | 'failed';
}

const initialState: BookingsState =
    {
        bookings: [
            {
                id: '0',
                bookedHours: 7,
                bookingTitle: 'Hotel Bratislava',
                bookingDate: sub(new Date(), {days: 10}).toISOString(),
                bookingPrice: 50,
                bookingLocationId: "0",
                postedDate: sub(new Date(), {minutes: 15}).toISOString(),
                reactions: {
                    thumbsUp: 0,
                    thumbsDown: 0
                },
            },
            {
                id: '1',
                bookedHours: 1,
                bookingTitle: 'Hotel Austria',
                bookingDate: sub(new Date(), {days: 20}).toISOString(),
                bookingPrice: 100,
                bookingLocationId: "1",
                postedDate: sub(new Date(), {minutes: 10}).toISOString(),
                reactions: {
                    thumbsUp: 0,
                    thumbsDown: 0
                },
            },
            {
                id: '2',
                bookedHours: 3,
                bookingTitle: 'Hotel Prague',
                bookingDate: sub(new Date(), {days: 1}).toISOString(),
                bookingPrice: 50,
                bookingLocationId: "2",
                postedDate: sub(new Date(), {minutes: 5}).toISOString(),
                reactions: {
                    thumbsUp: 0,
                    thumbsDown: 0
                },
            },
            {
                id: '3',
                bookedHours: 5,
                bookingTitle: 'Hotel Hungary',
                bookingDate: sub(new Date(), {days: 1}).toISOString(),
                bookingPrice: 5,
                bookingLocationId: "",
                postedDate: sub(new Date(), {minutes: 1}).toISOString(),
                reactions: {
                    thumbsUp: 0,
                    thumbsDown: 0
                },
            },
        ],
        status: 'idle'
    }


export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        bookingAdded: {
            reducer: (state, action: PayloadAction<BookingProps>) => {
                state.bookings.push(action.payload)
            },
            prepare: (bookedHours: number, bookingTitle: string, bookingDate: string, bookingPrice: number, bookingLocationId: string) => {
                return {
                    payload: {
                        id: nanoid(),
                        bookedHours: bookedHours,
                        bookingTitle: bookingTitle,
                        bookingDate: bookingDate,
                        bookingPrice: bookingPrice,
                        bookingLocationId: bookingLocationId,
                        postedDate: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            thumbsDown: 0
                        },
                    }
                }
            }
        },
        reactionAdded: (state, action) => {
            const {bookingId, reaction} = action.payload;
            const existingBooking = state.bookings.find(booking => booking.id === bookingId);
            if (existingBooking) {
                existingBooking.reactions[reaction as keyof ReactionType]++;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addNewBooking.fulfilled, (state, action) => {
            action.payload.postedDate = new Date().toISOString();
            action.payload.reactions = {
                thumbsUp: 0,
                thumbsDown: 0
            }
            console.log(action.payload);
            
            state.bookings.push(action.payload)
        }).addCase(updateBooking.fulfilled, (state, action) => {
            if (!action.payload.id) {
                console.log('Update could not complete')
                console.log(action.payload)
                return;
            }
            const {id} = action.payload;
            action.payload.postedDate = new Date().toISOString();
            const bookings = state.bookings.filter(booking => booking.id !== id);
            state.bookings = [...bookings, action.payload];
        }).addCase(deleteBooking.fulfilled, (state, action) => {
            if (!action.payload.id) {
                console.log('Delete could not complete')
                console.log(action.payload)
                return;
            }
            const {id} = action.payload;
            state.bookings = state.bookings.filter(booking => booking.id !== id);
        })
    }
});

export const bookings = (state: RootState) => state.bookings.bookings;
export const bookingsStatus = (state: RootState) => state.bookings.status;
export const {bookingAdded, reactionAdded} = bookingsSlice.actions;
export const selectBookingById = (state: RootState, bookingId: string | undefined) => state.bookings.bookings.find(booking => booking.id === bookingId);

export default bookingsSlice.reducer;
