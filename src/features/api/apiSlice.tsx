import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Start json-server
// json-server --watch data/db.json --port 4000
export const apiSlice = createApi({
	                                  reducerPath: 'api',
	                                  baseQuery: fetchBaseQuery({
		                                                            baseUrl: 'http://localhost:4000'
	                                                            }),
	                                  tagTypes: ['Bookings', 'Locations'],
	                                  endpoints: builder => ({})
                                  });
