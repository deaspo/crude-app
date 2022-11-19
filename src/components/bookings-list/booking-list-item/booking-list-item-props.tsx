import React from "react";
import { BookingProps } from "features";

export interface BookingsListItemProps {
	booking: BookingProps;
	handleClickMore: (event: React.MouseEvent<HTMLButtonElement>, booking: BookingProps) => void;
}
