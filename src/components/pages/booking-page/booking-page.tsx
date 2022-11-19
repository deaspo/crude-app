import React, { useRef, useState } from "react";
import { BookingProps, selectBookingById, useDeleteBookingMutation } from "features";
import { useParams } from "react-router-dom";
import { BookingsListItem } from "components/bookings-list";
import { NavBar, PageFooter } from "components/controls";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ListItemIcon, MenuItem, Paper, Popover } from '@mui/material';
import { EditBookingForm } from 'components/dialog-forms'
import { useAppSelector } from "redux-tools";

export const BookingPage = () => {
	const {bookingId} = useParams();
	const  fetchedId = bookingId? bookingId: "";
	const selectedBooking: BookingProps | undefined = useAppSelector(state => selectBookingById(state, fetchedId));
	
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const currentBooking = useRef<BookingProps | null>(null);
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	const [deleteBooking] = useDeleteBookingMutation();
	
	const handleClose = () => {
		setAnchorEl(null);
	};
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
	
	let renderedItem: JSX.Element | null;
	
	if (!selectedBooking) {
		renderedItem = <h2>Booking not found!</h2>;
	} else {
		renderedItem = (
			<BookingsListItem
				booking={selectedBooking}
				handleClickMore={handleClickMore}
			/>
		)
	}
	return (
		<div className="min-h-full">
			<NavBar/>
			<header className="bg-white shadow">
				<div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold tracking-tight text-gray-900">Bookings</h1>
				</div>
			</header>
			<main>
				<div className="mx-auto max-w-7xl py-6">
					{renderedItem}
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
				</div>
			</main>
			<PageFooter/>
		</div>
	)
}
