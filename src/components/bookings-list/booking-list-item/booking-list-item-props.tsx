import { BookingProps } from "features";
import React from "react";

export interface BookingsListItemProps {
	booking: BookingProps;
	handleClickMore: (event: React.MouseEvent<HTMLButtonElement>, booking: BookingProps) => void;
	onItemClick?: (bookId: string) => void;
	itemButton?: boolean
}
