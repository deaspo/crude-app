import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ListItemIcon, MenuItem, Paper, Popover } from "@mui/material";
import { BookingsListItem } from "components/bookings-list";
import { Button, NavBar, PageFooter } from "components/controls";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogModal,
} from "components/dialog";
import { EditBookingForm, LocationAddForm } from "components/dialog-forms";
import {
  BookingProps,
  LocationProps,
  selectBookingById,
  useDeleteBookingMutation,
} from "features";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "redux-tools";

export const BookingPage = () => {
  const { bookingId } = useParams();
  const fetchedId = bookingId ? bookingId : "";
  const formID: string = "addLocationForm";
  const selectedBooking: BookingProps | undefined = useAppSelector((state) =>
    selectBookingById(state, fetchedId)
  );

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const currentBooking = useRef<BookingProps | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [deleteBooking] = useDeleteBookingMutation();
  const [selectedLocation, setSelectedLocation] = useState<LocationProps>();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenEditDialog = () => {
    if (currentBooking.current) {
      setOpenEditDialog(true);
    }
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    currentBooking.current = null;
  };
  const handleClickMore = (
    event: React.MouseEvent<HTMLButtonElement>,
    booking: BookingProps
  ) => {
    currentBooking.current = booking;
    setAnchorEl(event.currentTarget);
  };
  const handleDeleteBooking = async () => {
    if (currentBooking.current) {
      try {
        await deleteBooking({ id: currentBooking.current.id }).unwrap();
      } catch (err) {
        console.error("Failed to delete the booking", err);
      }
    }
  };

  const onAddNewLocation = (data: Partial<LocationProps>) => {
    const { isoCode, city, stateCode, country } = data;
    if (city && isoCode && country) {
      const locId: string = `${isoCode}_${stateCode}_${city}`
        .replaceAll(/\s/g, "_")
        .toLocaleLowerCase();
      const tmpLocation: LocationProps = {
        id: locId,
        city: city,
        isoCode: isoCode,
        country: country,
      };
      //close the modal
      let modalForm: HTMLElement | null =
        document.getElementById("closeButton");
      if (modalForm) {
        // set state
        setSelectedLocation((prevState) => {
          if (prevState?.id !== tmpLocation.id) {
            return tmpLocation;
          }
          return prevState;
        });
        modalForm.click();
      }
    }
  };

  let renderedItem: JSX.Element | null;

  const EditBookingPage: JSX.Element = (
    <>
      {openEditDialog && currentBooking.current && (
        <EditBookingForm
          handleClose={handleCloseEditDialog}
          bookingId={currentBooking.current.id}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      )}
    </>
  );

  if (!selectedBooking) {
    renderedItem = <h2>Booking not found!</h2>;
  } else if (openEditDialog) {
    renderedItem = EditBookingPage;
  } else {
    renderedItem = (
      <BookingsListItem
        booking={selectedBooking}
        handleClickMore={handleClickMore}
      />
    );
  }
  return (
    <div className="min-h-full">
      <NavBar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Bookings
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-8 py-6">
        {renderedItem}
        {open && (
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            marginThreshold={0}
          >
            <Paper onClick={handleClose}>
              <MenuItem onClick={handleOpenEditDialog}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <div>Update</div>
              </MenuItem>
              <MenuItem onClick={handleDeleteBooking}>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <div>Delete</div>
              </MenuItem>
            </Paper>
          </Popover>
        )}
        <Dialog>
          <DialogModal>
            <DialogHeader>Add New Location</DialogHeader>
            <DialogBody>
              <LocationAddForm formID={formID} onSubmit={onAddNewLocation} />
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
