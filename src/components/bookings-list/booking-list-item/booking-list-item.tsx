import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, ListItem, ListItemButton, Typography } from "@mui/material";
import { BookedDate } from "components/booked-date";
import { BookingLocation } from "components/booking-locations";
import { BookingPrice } from "components/booking-price";
import { ReactionButton } from "components/booking-reactions";
import { TimeAgo } from "components/time-ago";

import { BookingsListItemProps } from "./booking-list-item-props";

import {
	ItemBody,
	ItemContent,
	ItemDateLocation,
	ItemMain,
	ItemMore,
	ItemRoot,
	listClasses
} from "./booking-list-item-styles";

export const BookingsListItem = ({ booking, handleClickMore, onItemClick, itemButton }: BookingsListItemProps) => {
	let RenderedItem = (
		<ItemRoot className={listClasses.root} data-testid="item-root">
			<ItemBody className={listClasses.body} data-testid="item-body">
				{/*<ItemPhoto className={listClasses.photo} data-testid="item-photo">
				 <img src={"logo192.png"} height={"80px"} width={"80px"} alt={"item-profile"}/>
				 </ItemPhoto>*/}
				<ItemMain className={listClasses.main} data-testid="item-main">
					<ItemContent className={listClasses.content} data-testid="item-contents">
						<div data-testid="item-title">
							<Typography variant="h4">
								{booking.bookingTitle}
							</Typography>
						</div>
						<ItemDateLocation className={listClasses.dateLocation} data-testid="item-date-location">
							<div data-testid="item-date">
								<BookedDate timeStamp={booking.bookingDate}/>
							</div>
							<div data-testid="item-location">
								<BookingLocation locationId={booking.bookingLocationId}/>
							</div>
							<div data-testid="item-location">
								<span> Hours Booked: {booking.bookedHours}</span>
							</div>
						</ItemDateLocation>
						<div data-testid="item-posted-duration">
							<TimeAgo timeStamp={booking.postedDate}/>
						</div>
						<ReactionButton booking={booking}/>
					</ItemContent>
					<div data-testid="item-price"><BookingPrice value={booking.bookingPrice}/></div>
				</ItemMain>
			</ItemBody>
			<ItemMore className={listClasses.more} data-testid="item-more-option">
				<IconButton
					size="small"
					edge="end"
					onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
						handleClickMore(event, booking);
					}}
				>
					<MoreVertIcon/>
				</IconButton>
			</ItemMore>
		</ItemRoot>
	);

	if (itemButton && onItemClick) {
		return (
			<ListItemButton onClick={() => onItemClick(booking.id)} sx={{ display: "flex" }} key={booking.id} divider
							disableGutters
			>
				{
					RenderedItem
				}
			</ListItemButton>
		);
	}
	return (
		<ListItem sx={{ display: "flex" }} key={booking.id} divider
				  disableGutters>

			{
				RenderedItem
			}
		</ListItem>
	);
}
