import React from "react";
import { BookingProps } from "features";

export interface BookingListProps {
    handleClickMore: (event: React.MouseEvent<HTMLButtonElement>, booking: BookingProps) => void;
}
