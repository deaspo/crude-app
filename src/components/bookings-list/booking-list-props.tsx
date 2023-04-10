import { BookingProps } from "features";
import React from "react";

export interface BookingListProps {
    handleClickMore: (event: React.MouseEvent<HTMLButtonElement>, booking: BookingProps) => void;
    onItemClick: (bookId: string) => void;
}
