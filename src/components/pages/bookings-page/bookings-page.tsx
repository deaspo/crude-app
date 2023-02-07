import React, { useRef, useState } from "react";
import { Fab, ListItemIcon, MenuItem, Paper, Popover } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { AddBookingForm, EditBookingForm } from 'components/dialog-forms'
import { BookingsList } from "components/bookings-list";
import { BookingProps, useDeleteBookingMutation } from "features";

import { AddText, bookingsPageClasses, FabContainer } from "./bookings-page-styles";
import { NavBar, PageFooter } from "components/controls";

export const BookingsPage = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [deleteBooking] = useDeleteBookingMutation();
    
    const [openAddDialog, setOpenAddDialog] = useState(false)
    
    const handleOpenAddDialog = () => {
        setOpenAddDialog(true);
    };
    
    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const currentBooking = useRef<BookingProps | null>(null);
    
    const handleOpenEditDialog = () => {
        if (currentBooking.current) {
            setOpenEditDialog(true);
        }
    }
    
    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        currentBooking.current = null;
    };
    
    const handleClickMore = (event: React.MouseEvent<HTMLButtonElement>, booking: BookingProps) => {
        currentBooking.current = booking;
        setAnchorEl(event.currentTarget);
    };
    
    const handleDeleteBooking = async () => {
        if (currentBooking.current) {
            try {
                await deleteBooking({id: currentBooking.current.id}).unwrap()
            } catch (err) {
                console.error('Failed to delete the booking', err)
            }
        }
    }
    
    return (
        <div className="min-h-full">
            <NavBar/>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bookings</h1>
                </div>
            </header>
            <main className="mx-auto max-w-xl py-6 h-[500px]">
                    <BookingsList
                        handleClickMore={handleClickMore}
                    />
                    <FabContainer className={bookingsPageClasses.fabContainer} data-testid="fab-container">
                        <Fab
                            sx={{bottom: "auto", position: "relative", right: "auto"}}
                            component="span"
                            variant="extended"
                            size="large"
                            color="info"
                            onClick={handleOpenAddDialog}
                        >
                            <AddText className={bookingsPageClasses.addText} data-testid="fab-icon">
                                <AddIcon/>
                            </AddText>
                            Add booking
                        </Fab>
                    </FabContainer>
                    {openAddDialog &&
                    <AddBookingForm
                        open={openAddDialog}
                        handleClose={handleCloseAddDialog}
                    />
                    }
                    {openEditDialog && currentBooking.current &&
                    <EditBookingForm
                        open={openEditDialog}
                        handleClose={handleCloseEditDialog}
                        bookingId={currentBooking.current.id}
                    />
                    }
                    {open &&
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        marginThreshold={0}
                    >
                        <Paper
                            onClick={handleClose}
                        >
                            <MenuItem
                                onClick={handleOpenEditDialog}
                            >
                                <ListItemIcon>
                                    <EditIcon/>
                                </ListItemIcon>
                                <div>
                                    Update
                                </div>
                            </MenuItem>
                            <MenuItem
                                onClick={handleDeleteBooking}
                            >
                                <ListItemIcon>
                                    <DeleteIcon/>
                                </ListItemIcon>
                                <div>
                                    Delete
                                </div>
                            </MenuItem>
                        </Paper>
                    </Popover>
                    }
            </main>
            <PageFooter/>
        </div>
    );
}
