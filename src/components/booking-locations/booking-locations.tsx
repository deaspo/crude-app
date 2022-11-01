import { useAppSelector } from "redux-tools/hooks";
import { allLocations } from "features/locations/locationsSplice";

interface BookingLocationsProps {
    locationId: string
}

export const BookingLocation = ({locationId}: BookingLocationsProps) => {
    const locations = useAppSelector(allLocations);
    const location = locations.find(location => location.id === locationId);
    
    return <span> Location: {location ? location.location : 'Unknown'} </span>
}
