import { createAsyncThunk, createSelector, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from "redux-tools/store";
import { sub } from 'date-fns';

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

const initialBookings: BookingProps[] = [
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
]

// Mock Server call functions
function mockServerAdapter(booking: BookingProps) {
    return new Promise<{ data: BookingProps }>((resolve) => setTimeout(
        () => resolve({data: booking}), 500
    ))
}
function mockGetBookingsData(): Promise<{data:BookingProps[]}> {
    return new Promise<{data:BookingProps[]}>((resolve) => {
        resolve({data:[]})
    })
}

export const fetchBookings = createAsyncThunk(
    'bookings/fetchBookings',
    async () => {
        const response = await mockGetBookingsData();
        return response.data
    })

export const addNewBooking = createAsyncThunk(
    'bookings/addBooking',
    async (initialBooking: BookingProps) => {
        const response = await mockServerAdapter(initialBooking);
        return response.data
    });

export const updateBooking = createAsyncThunk(
    'bookings/updateBooking',
    async (initialBooking: BookingProps) => {
        try {
            const response = await mockServerAdapter(initialBooking);
            return response.data;
        } catch (err) {
            throw new Error("Unable to update");
        }
    });

export const deleteBooking = createAsyncThunk(
    'bookings/deleteBooking',
    async (initialBooking: BookingProps) => {
        try {
            const response = await mockServerAdapter(initialBooking);
            return response.data;
        } catch (err) {
            throw new Error("Unable to delete");
        }
    });


const bookingsAdapter = createEntityAdapter<BookingProps>({
    sortComparer: (a,b) => a.postedDate.localeCompare(b.postedDate)
                                                          })    ;
const initialStateAdapter = bookingsAdapter.getInitialState({
                                                                status: 'idle',
                                                                count: 0
                                                            })

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: initialStateAdapter,
    reducers: {
        reactionAdded: (state, action) => {
            const {bookingId, reaction} = action.payload;
            const existingBooking = state.entities[bookingId];
            if (existingBooking) {
                existingBooking.reactions[reaction as keyof ReactionType]++;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                bookingsAdapter.upsertMany(state, initialBookings)
                
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(addNewBooking.fulfilled, (state, action) => {
            action.payload.postedDate = new Date().toISOString();
            action.payload.reactions = {
                thumbsUp: 0,
                thumbsDown: 0
            }
            bookingsAdapter.addOne(state, action.payload)
        }).addCase(updateBooking.fulfilled, (state, action) => {
            if (!action.payload.id) {
                console.log('Update could not complete')
                console.log(action.payload)
                return;
            }
            action.payload.postedDate = new Date().toISOString();
            bookingsAdapter.upsertOne(state, action.payload);
        }).addCase(deleteBooking.fulfilled, (state, action) => {
            if (!action.payload.id) {
                console.log('Delete could not complete')
                return;
            }
            const {id} = action.payload;
            bookingsAdapter.removeOne(state, id);
        })
    }
});

export const {
    selectAll: selectAllBookings,
    selectById: selectBookingById,
    selectIds: selectBookingIds
} = bookingsAdapter.getSelectors<RootState>(state => state.bookings);

export const getCount = (state: RootState) => state.bookings.count;
export const bookingsStatus = (state: RootState) => state.bookings.status;
export const {reactionAdded} = bookingsSlice.actions;

export const selectBookingsByLocation = createSelector(
    [selectAllBookings, (state, locationId: string | undefined) => locationId],
    (bookings, locationId) => bookings.filter(booking => booking.bookingLocationId === locationId)
);
export const getBookingsStatus = (state: RootState) => state.bookings.status;

export default bookingsSlice.reducer;
