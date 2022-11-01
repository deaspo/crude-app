import { BookingProps, reactionAdded, ReactionType } from "features/bookings/bookingsSplice";
import { useDispatch } from "react-redux";

const reactionEmoji = {
    thumbsUp: '👍',
    thumbsDown: '👎',
}

interface ReactionButtonProps {
    booking: BookingProps
}

export const ReactionButton = ({booking}: ReactionButtonProps) => {
    const dispatch = useDispatch();
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() =>
                    dispatch(reactionAdded({bookingId: booking.id, reaction: name}))
                }
            >
                {emoji} {booking.reactions[name as keyof ReactionType]}
            </button>
        )
    })
    
    return <div>{reactionButtons}</div>
}
