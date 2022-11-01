import { formatDistanceToNow, parseISO } from 'date-fns';

interface TimeAgoProps {
    timeStamp: string | undefined
}

export const TimeAgo = ({timeStamp}: TimeAgoProps) => {
    let timeAgo = '';
    if (timeStamp) {
        const date = parseISO(timeStamp);
        const timePeriod = formatDistanceToNow(date);
        //const timePeriod = format(date, "dd-MM-yyyy");
        timeAgo = `${timePeriod} ago`
    }
    return (
        <span title={timeStamp}>
          Added: <i>{timeAgo}</i>
      </span>
    )
}
