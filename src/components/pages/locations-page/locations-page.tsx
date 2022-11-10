import { useAppSelector } from "redux-tools/hooks";
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemButton } from "@mui/material";
import { allLocations } from "features/locations/locationsSplice";
import { NavBar, PageFooter } from "components/controls";

export const LocationsPage = () => {
	const locations = useAppSelector(allLocations);
	const navigate = useNavigate();
	
	const renderedRowItems = locations.map((location) => {
		return (
			<ListItem sx={{display: "flex"}} divider key={location.id} disableGutters disablePadding>
				<ListItemButton onClick={() => {
					navigate(`/locations/${location.id}`)
				}}>
					<div>
						{location.location}
					</div>
				</ListItemButton>
			</ListItem>
		);
	})
	
	
	return (
		<div className="min-h-full">
			<NavBar/>
			<header className="bg-white shadow">
				<div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold tracking-tight text-gray-900">Locations</h1>
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
