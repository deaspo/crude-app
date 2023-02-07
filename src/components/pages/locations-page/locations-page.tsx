import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Button, NavBar, PageFooter } from "components/controls";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogModal,
} from "components/dialog";
import {
  LocationAddForm,
  LocationData,
} from "components/dialog-forms/location-add-form";
import { LocationProps, useGetBookingsByLocationIdQuery } from "features";
import {
  allLocations,
  selectLocationById,
} from "features/locations/locationsSplice";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useAppSelector } from "redux-tools/hooks";

interface LocationType {
  value: string;
  label: string;
  locationId: string;
}

export const LocationsPage = () => {
  const locations = useAppSelector(allLocations);
  const navigate = useNavigate();
  const formID: string = "addLocationForm";
  const [isoCode, setIsoCode] = useState<string>();
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");

  const bookedCountries: LocationType[] = locations.map((location) => {
    return {
      value: location.country,
      isoCode: location.isoCode,
      locationId: location.id,
      label: location.country,
    };
  });
  const bookedCities: Partial<LocationType>[] = locations
    .filter((loc) => loc.isoCode === isoCode)
    .map((loc) => {
      return {
        value: loc.city,
        locationId: loc.id,
        label: loc.city,
      };
    });

  const currentLocation: LocationProps | undefined = useAppSelector((state) =>
    selectLocationById(state, selectedLocationId)
  );
  const {
    data: bookingsForLocation,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBookingsByLocationIdQuery(selectedLocationId);

  if (!currentLocation) {
  } else {
  }
  const locationInfoMessage: string = currentLocation
    ? `Bookings available in ${currentLocation.city}, ${currentLocation.country}`
    : "No available bookings";

  let renderedRowItems: JSX.Element[] = [
    <ListItemText key="empty-location">No location selected</ListItemText>,
  ];

  if (isLoading) {
    renderedRowItems = [
      <ListItemText key="loading-message">Loading location</ListItemText>,
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

  const onAddLocation = (data: LocationData) => {
    const { zipCode, isoCode, street, city } = data;
    if (city && isoCode) {
      //close the modal
      let modalForm: HTMLElement | null =
        document.getElementById("closeButton");
      if (modalForm) {
        console.log(
          "zip, street, city, country",
          zipCode,
          street,
          city,
          isoCode
        );
        modalForm.click();
      }
    }
  };

  return (
    <div className="min-h-full">
      <NavBar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Locations
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-xl py-6 border border-solid px-4 my-4">
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="mb-2 font-bold">Select Country</h2>
            <Select
              className="form-select appearance-none block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Select country location"
              isSearchable={true}
              options={bookedCountries}
              onChange={(value: any) => {
                setSelectedLocationId("");
                setIsoCode(value.isoCode);
              }}
            />
          </div>
          <div className="flex flex-row justify-between gap-8">
            <div className="w-1/3">
              <h2 className="mb-2 font-bold">Select City</h2>
              <Select
                className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="elect city example"
                isDisabled={bookedCities?.length === 0}
                options={bookedCities}
                value={null}
                onChange={(value: any) =>
                  setSelectedLocationId(value.locationId)
                }
              />
            </div>
            <div className="w-2/3">
              <h2 className="mb-2 font-bold text-right">
                {locationInfoMessage}
              </h2>
              <ul className=" border border-solid">{renderedRowItems}</ul>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              buttonClasses="bg-blue-600 active:bg-blue-800 active:shadow-lg"
              data-bs-toggle="modal"
              data-bs-target="#commonModal"
            >
              Add location
            </Button>
          </div>
        </div>
        <Dialog>
          <DialogModal>
            <DialogHeader>Add New Location</DialogHeader>
            <DialogBody>
              <LocationAddForm formID={formID} onSubmit={onAddLocation} />
            </DialogBody>
            <DialogFooter>
              <Button
                type="button"
                buttonClasses="bg-purple-600 hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                data-bs-dismiss="modal"
                id="closeButton"
              >
                Close
              </Button>
              <Button
                type="submit"
                buttonClasses="bg-blue-700 hover:bg-blue-600 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                //onClick={handleClickAddLocation}
                //data-bs-dismiss="modal"
                form={formID}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogModal>
        </Dialog>
      </main>
      <PageFooter />
    </div>
  );
};
