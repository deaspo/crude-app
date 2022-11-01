interface BookingPriceProps {
    value: number
}

export const BookingPrice = ({value}: BookingPriceProps) => {
    return (
        <span>&euro;{value <= 0 ? '0' : value.toString()}</span>
    );
}
