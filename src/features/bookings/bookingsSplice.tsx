import { createEntityAdapter, createSelector, EntityState } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import { apiSlice } from "features/api/apiSlice";
import { RootState } from "redux-tools/store";

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

/*export interface BookingsState {
 bookings: BookingProps[],
 status: 'idle' | 'loading' | 'pending' | 'succeeded' | 'failed';
 }*/

/*const initialBookings: BookingProps[] = [
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
 ]*/

/*// Mock Server call functions
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
 });*/

const bookingsAdapter = createEntityAdapter<BookingProps>(
    {
        sortComparer: (a, b) => b.postedDate.localeCompare(a.postedDate)
    });
/*const initialStateAdapter = bookingsAdapter.getInitialState({
 status: 'idle',
 count: 0
 })*/

/*
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
 });*/
const initialStateAdapter = bookingsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints(
    {
        endpoints: builder => ({
            getBookings: builder.query<EntityState<BookingProps>, void>(
                {
                    query: () => '/bookings',
                    transformResponse: (response: BookingProps[]) => {
                        let min = 1;
                        const loadedBookings = response.map(booking => {
                            if (!booking.postedDate) {
                                booking.postedDate = sub(new Date(), { minutes: min }).toISOString()
                            }
                            if (!booking.reactions) {
                                booking.reactions = {
                                    thumbsUp: 0,
                                    thumbsDown: 0
                                }
                            }
                            if (booking.bookingLocationId.trim().length <= 0) {
                                booking.bookingLocationId = "0";
                            }
                            return booking;
                        }).sort((a, b) => a.postedDate.localeCompare(b.postedDate));
                        return bookingsAdapter.setAll(initialStateAdapter, loadedBookings);
                    },
                    providesTags: (result) => result ? [
                        {
                            type: 'Bookings',
                            if: "LIST"
                        },
                        ...result.ids.map(id => ({
                            type: 'Bookings' as const,
                            id
                        }))
                    ] : [{
                        type: 'Bookings',
                        id: 'LIST'
                    }]
                }),
            getBookingsByLocationId: builder.query<EntityState<BookingProps>, string | undefined>(
                {
                    query: id => `/bookings/?bookingLocationId=${id}`,
                    transformResponse: (responseData: BookingProps[]) => {
                        let min = 1;
                        const loadedBookings = responseData.map(booking => {
                            if (!booking.postedDate) {
                                booking.postedDate = sub(new Date(), { minutes: min }).toISOString()
                            }
                            if (!booking.reactions) {
                                booking.reactions = {
                                    thumbsUp: 0,
                                    thumbsDown: 0
                                }
                            }
                            if (booking.bookingLocationId.trim().length <= 0) {
                                booking.bookingLocationId = "0";
                            }
                            return booking;
                        });
                        return bookingsAdapter.setAll(initialStateAdapter, loadedBookings);
                    },
                    providesTags: (result) => result ? [
                        {
                            type: 'Bookings',
                            id: "LIST"
                        },
                        ...result.ids.map(id => ({
                            type: 'Bookings' as const,
                            id
                        }))
                    ] : [{
                        type: 'Bookings',
                        id: 'LIST'
                    }]
                }),
            getBookingById: builder.query<BookingProps | null, string | undefined>(
                {
                    query: id => `bookings/?id=${id}`,
                    transformResponse: (response: BookingProps[]) => {
                        if (response.length === 1) {
                            return response[0];
                        }
                        return null;
                    },
                    providesTags: (result, error, id) => [{
                        type: 'Bookings',
                        id
                    }]
                }),
            addNewBooking: builder.mutation({
                                                query: initialBooking => ({
                                                    url: '/bookings',
                                                    method: 'POST',
                                                    body: {
                                                        ...initialBooking,
                                                        locationId: initialBooking.bookingLocationId,
                                                        postedDate: new Date().toISOString(),
                                                        reactions: {
                                                            thumbsUp: 0,
                                                            thumbsDown: 0
                                                        }
                                                    }
                                                }),
                                                invalidatesTags: ['Bookings']
                                            }),
            updateBooking: builder.mutation({
                                                query: initialBooking => ({
                                                    url: `/bookings/${initialBooking.id}`,
                                                    method: 'PUT',
                                                    body: {
                                                        ...initialBooking,
                                                        postedDate: new Date().toISOString()
                                                    }
                                                }),
                                                invalidatesTags: (results, error, arg) => [{
                                                    type: 'Bookings',
                                                    id: arg.id
                                                }]
                                            }),
            deleteBooking: builder.mutation({
                                                query: ({ id }) => ({
                                                    url: `/bookings/${id}`,
                                                    method: 'DELETE',
                                                    body: { id }
                                                }),
                                                invalidatesTags: (result, error, arg) => [{
                                                    type: 'Bookings',
                                                    id: arg.id
                                                }]
                                            }),
            addReaction: builder.mutation(
                { // Optimistic update
                    query: ({
                                bookingId,
                                reactions
                            }) => ({
                        url: `bookings/${bookingId}`,
                        method: 'PATCH',
                        body: { reactions }
                    }),
                    async onQueryStarted(
                        {
                            bookingId,
                            reactions
                        }, {
                            dispatch,
                            queryFulfilled
                        }) {
                        // `updateQueryData`
                        // requires the
                        // endpoint name
                        // and cache key
                        // arguments, so
                        // it knows
                        // which piece
                        // of cache
                        // state to
                        // update
                        const patchResult = dispatch(
                            extendedApiSlice.util.updateQueryData('getBookings', undefined, data => {
                                // data
                                // is
                                // Immer-wrapped
                                // and
                                // can
                                // be
                                // "mutated"
                                // like
                                // in
                                // createSlice
                                const booking = data.entities[bookingId];
                                if (booking) {booking.reactions = reactions}
                            })
                        )
                        try {
                            await queryFulfilled;
                        }
                        catch {
                            patchResult.undo();
                        }
                    }
                })
        })
    });

export const {
    useGetBookingsQuery,
    useGetBookingsByLocationIdQuery,
    useGetBookingByIdQuery,
    useAddNewBookingMutation,
    useUpdateBookingMutation,
    useDeleteBookingMutation,
    useAddReactionMutation
} = extendedApiSlice;
// Query results
export const selectBookingsResults = extendedApiSlice.endpoints.getBookings.select();

// Memoized selector
const selectBookingsData = createSelector(
    selectBookingsResults,
    bookingsResult => bookingsResult.data // normalized state object
);

export const {
    selectAll: selectAllBookings,
    selectById: selectBookingById,
    selectIds: selectBookingIds
} = bookingsAdapter.getSelectors<RootState>(state => selectBookingsData(state) ?? initialStateAdapter);

/*
 export const getCount = (state: RootState) => state.bookings.count;
 export const bookingsStatus = (state: RootState) => state.bookings.status;
 export const {reactionAdded} = bookingsSlice.actions;

 export const selectBookingsByLocation = createSelector(
 [selectAllBookings, (state, locationId: string | undefined) => locationId],
 (bookings, locationId) => bookings.filter(booking => booking.bookingLocationId === locationId)
 );
 export const getBookingsStatus = (state: RootState) => state.bookings.status;

 export default bookingsSlice.reducer;*/
