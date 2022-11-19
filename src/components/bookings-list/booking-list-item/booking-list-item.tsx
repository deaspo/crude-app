import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, ListItem, Typography } from "@mui/material";

import {
	ItemBody,
	ItemContent,
	ItemDateLocation,
	ItemMain, ItemMore,
	ItemPhoto,
	ItemRoot,
	listClasses
} from "./booking-list-item-styles";
import { BookingLocation } from "components/booking-locations";
import { TimeAgo } from "components/time-ago";
import { BookedDate } from "components/booked-date";
import { BookingPrice } from "components/booking-price";
import { ReactionButton } from "components/booking-reactions";

import { BookingsListItemProps } from "./booking-list-item-props";

export const BookingsListItem = ({booking, handleClickMore}: BookingsListItemProps) => {
  return (
	  <ListItem sx={{display: "flex"}} key={booking.id} divider disableGutters>
		  <ItemRoot className={listClasses.root} data-testid="item-root">
			  <ItemBody className={listClasses.body} data-testid="item-body">
				  <ItemPhoto className={listClasses.photo} data-testid="item-photo">
					  <img src={"logo192.png"} height={"80px"} width={"80px"} alt={"item-profile"}/>
				  </ItemPhoto>
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
					  edge='end'
					  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
						  handleClickMore(event, booking);
					  }}
				  >
					  <MoreVertIcon/>
				  </IconButton>
			  </ItemMore>
		  </ItemRoot>
	  </ListItem>
  );
}
