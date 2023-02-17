import { allLocations } from "features/locations/locationsSplice";
import { useAppSelector } from "redux-tools/hooks";

interface BookingLocationsProps {
    locationId: string
}

export const BookingLocation = ({ locationId }: BookingLocationsProps) => {
    const locations = useAppSelector(allLocations);
    const location = locations.find(location => location.id === locationId);

    return <span> Location: {location ? `${location.city}, ${location.country}` : 'Unknown'} </span>
}
