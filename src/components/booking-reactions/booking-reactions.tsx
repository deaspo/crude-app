import { BookingProps, useAddReactionMutation, ReactionType } from "features/bookings/bookingsSplice";

const reactionEmoji = {
    thumbsUp: '👍',
    thumbsDown: '👎',
}

interface ReactionButtonProps {
    booking: BookingProps
}

export const ReactionButton = ({booking}: ReactionButtonProps) => {
    const [addReaction] = useAddReactionMutation();
    
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() => {
                    const newValue = booking.reactions[name as keyof ReactionType] + 1;
                    addReaction({bookingId: booking.id, reactions: {...booking.reactions, [name]: newValue}})
                }
                }
            >
                {emoji} {booking.reactions[name as keyof ReactionType]}
            </button>
        )
    })
    
    return <div>{reactionButtons}</div>
}
