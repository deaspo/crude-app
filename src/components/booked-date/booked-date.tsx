import { format, parseISO } from 'date-fns';

interface BookedDateProps {
    timeStamp: string | undefined
}

export const BookedDate = ({timeStamp}: BookedDateProps) => {
    let bookedDate = '';
    if (timeStamp) {
        bookedDate = format(parseISO(timeStamp), "dd-MM-yyyy");
    }
    return (
        <span title={timeStamp}>
          Date: {bookedDate.length === 0 ? 'Unknown' : bookedDate}
      </span>
    );
}
