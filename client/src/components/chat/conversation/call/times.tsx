import moment from 'moment';
import React, { useEffect } from 'react'

interface CallTimesProps {
  totalSecondsInCall: number;
  setTotalSecondsInCall: React.Dispatch<React.SetStateAction<number>>;
  callAccepted: boolean
}

export default function CallTimes({
  totalSecondsInCall,
  setTotalSecondsInCall,
  callAccepted,
}: CallTimesProps) {
  useEffect(() => {
    const setSecInCall = () => {
      setTotalSecondsInCall((prev) => prev++);
      setTimeout(setSecInCall, 1000);
    };
    if (callAccepted) {
      setSecInCall();
    }
    return () => {
      setTotalSecondsInCall(0);
    };
  }, [callAccepted]);

  return (
    <div
      className={`text-dark_text_2 ${
        totalSecondsInCall !== 0 ? 'block' : 'hidden'
      }`}
    >
      {moment(0).format('HH:mm:ss')}
    </div>
  );
}
