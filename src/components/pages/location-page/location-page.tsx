import {useNavigate, useParams} from "react-router-dom";
import { ListItemButton, ListItem, List, ListItemText } from "@mui/material";
import { useAppSelector } from "redux-tools";
import { useGetBookingsByLocationIdQuery, selectLocationsById } from "features";
import { NavBar, PageFooter } from "components/controls";

export const LocationPage = () => {
	const {locationId} = useParams();
	const navigate = useNavigate();
	const location = useAppSelector(state => selectLocationsById(state, locationId));
	
	let renderedRowItems: JSX.Element[] | null = null;
	
	const {
		data: bookingsForLocation,
		isLoading,
		isSuccess,
		isError,
		error
	} = useGetBookingsByLocationIdQuery(locationId);
	
	if (isLoading) {
		renderedRowItems = [<ListItemText key="loading-message">Loading List</ListItemText>]
	} else if (isSuccess) {
		const {ids, entities} = bookingsForLocation;
		renderedRowItems = ids.map((booking, index) => (
			<ListItem key={index}>
				<ListItemButton onClick={() => {
					navigate(`/bookings/${entities[booking]?.id}`)
				}}>
					{entities[booking]?.bookingTitle}
				</ListItemButton>
			</ListItem>
		));
	} else if(isError) {
		renderedRowItems = [<ListItemText key="error-message">{JSON.stringify(error)}</ListItemText>]
	}
	
	return (
		<div className="min-h-full">
			<NavBar/>
			<header className="bg-white shadow">
				<div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold tracking-tight text-gray-900">{location?.location}</h1>
				</div>
			</header>
			<main className="mx-auto w-96">
				<div className="py-6">
					<List>
						{renderedRowItems}
					</List>
				</div>
			</main>
			<PageFooter/>
		</div>
	);
}
