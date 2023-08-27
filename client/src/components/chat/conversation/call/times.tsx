import moment from 'moment';
import React, { useEffect } from 'react'

interface CallTimesProps {
  totalSecondsInCall: moment.Duration;
  setTotalSecondsInCall: React.Dispatch<React.SetStateAction<moment.Duration>>;
  callAccepted: boolean;
}

export default function CallTimes({
  totalSecondsInCall,
  setTotalSecondsInCall,
  callAccepted,
}: CallTimesProps) {
 
    useEffect(() => {
      if (callAccepted) {
        const interval = setInterval(() => {
          setTotalSecondsInCall((prevDuration) =>
            prevDuration.add(1, 'second'),
          );
        }, 1000);
        return () => {
          clearInterval(interval);
        };
      }
    }, [callAccepted, setTotalSecondsInCall]);

  const formattedTime = moment
    .utc(totalSecondsInCall.asMilliseconds())
    .format('HH:mm:ss');
  

  return (
    <div
      className={`text-dark_text_2 ${
        totalSecondsInCall.asMilliseconds() !== 0 ? 'block' : 'hidden'
      }`}
    >
      <p>{formattedTime}</p>
    </div>
  );
}
