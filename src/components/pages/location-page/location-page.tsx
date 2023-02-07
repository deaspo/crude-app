import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { NavBar, PageFooter } from "components/controls";
import { CommonDialog } from "components/dialog";
import { selectLocationById, useGetBookingsByLocationIdQuery } from "features";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "redux-tools";

export const LocationPage = () => {
  const { locationId } = useParams();
  const id: string = locationId ? locationId : "";
  const navigate = useNavigate();
  const location = useAppSelector((state) => selectLocationById(state, id));

  let renderedRowItems: JSX.Element[] | null = null;

  const {
    data: bookingsForLocation,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBookingsByLocationIdQuery(locationId);

  if (!location) {
    return (
      <CommonDialog open={!location} title={"Error"}>
        <h2> Location not found!</h2>
      </CommonDialog>
    );
  }

  if (isLoading) {
    renderedRowItems = [
      <ListItemText key="loading-message">Loading List</ListItemText>,
    ];
  } else if (isSuccess) {
    const { ids, entities } = bookingsForLocation;
    renderedRowItems = ids.map((booking, index) => (
      <ListItem key={index}>
        <ListItemButton
          onClick={() => {
            navigate(`/bookings/${entities[booking]?.id}`);
          }}
        >
          {entities[booking]?.bookingTitle}
        </ListItemButton>
      </ListItem>
    ));
  } else if (isError) {
    renderedRowItems = [
      <ListItemText key="error-message">{JSON.stringify(error)}</ListItemText>,
    ];
  }

  return (
    <div className="min-h-full">
      <NavBar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {location.city}, {location.country}
          </h1>
        </div>
      </header>
      <main className="mx-auto w-96 px-8">
        <div className="py-6">
          <List>{renderedRowItems}</List>
        </div>
      </main>
      <PageFooter />
    </div>
  );
};
