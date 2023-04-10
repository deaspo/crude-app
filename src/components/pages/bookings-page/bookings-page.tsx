import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Fab, ListItemIcon, MenuItem, Paper, Popover } from "@mui/material";
import { BookingsList } from "components/bookings-list";
import { Button, NavBar, PageFooter } from "components/controls";

import { AddBookingForm, EditBookingForm, LocationAddForm } from "components/dialog-forms";
import { BookingProps, LocationProps, useDeleteBookingMutation } from "features";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogBody, DialogFooter, DialogHeader, DialogModal } from "../../dialog";

import { AddText, bookingsPageClasses, FabContainer } from "./bookings-page-styles";

export const BookingsPage = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [deleteBooking] = useDeleteBookingMutation();
  const formID: string = "addLocationForm";
  const navigate = useNavigate();

  const [pageTitle, setPageTitle] = useState<string>("Bookings");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationProps>();

  const handleOpenAddDialog = () => {
    setPageTitle("Add new booking");
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setPageTitle("Bookings");
    setOpenAddDialog(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const currentBooking = useRef<BookingProps | null>(null);

  const handleOpenEditDialog = () => {
    if (currentBooking.current) {
      setPageTitle("Edit booking");
      setOpenEditDialog(true);
    }
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setPageTitle("Bookings");
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

  const bookItemClick = (bookId: string) => {
    navigate('/bookings/' + bookId);
  }

  const BookingListPage: JSX.Element = (
      <>
        <BookingsList handleClickMore={handleClickMore} onItemClick={bookItemClick}/>
        <FabContainer
            className={bookingsPageClasses.fabContainer}
            data-testid="fab-container"
        >
          <Fab
              sx={{ bottom: "auto", position: "relative", right: "auto" }}
              component="span"
              variant="extended"
              size="large"
              color="info"
              onClick={handleOpenAddDialog}
          >
            <AddText
                className={bookingsPageClasses.addText}
                data-testid="fab-icon"
            >
              <AddIcon/>
            </AddText>
            Add booking
          </Fab>
        </FabContainer>
        {open && (
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                marginThreshold={0}
            >
              <Paper onClick={handleClose}>
                <MenuItem onClick={handleOpenEditDialog}>
                  <ListItemIcon>
                    <EditIcon/>
                  </ListItemIcon>
                  <div>Update</div>
                </MenuItem>
                <MenuItem onClick={handleDeleteBooking}>
                  <ListItemIcon>
                    <DeleteIcon/>
                  </ListItemIcon>
                  <div>Delete</div>
                </MenuItem>
              </Paper>
            </Popover>
        )}
      </>
  );

  const AddNewBookingPage: JSX.Element = (
    <>
      {openAddDialog && (
        <AddBookingForm
          handleClose={handleCloseAddDialog}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      )}
    </>
  );

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

  let renderedElement: JSX.Element = BookingListPage;

  if (openAddDialog) {
    renderedElement = AddNewBookingPage;
  } else if (openEditDialog) {
    renderedElement = EditBookingPage;
  }

  return (
    <div className="min-h-full">
      <NavBar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {pageTitle}
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl h-[500px]">
        {renderedElement}
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
