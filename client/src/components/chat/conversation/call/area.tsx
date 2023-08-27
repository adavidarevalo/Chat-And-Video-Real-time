import _ from 'lodash';
import React from 'react';
import CallTimes from './times';

interface CallAreaProps {
  name: string;
  callAccepted: boolean;
  totalSecondsInCall: moment.Duration;
  setTotalSecondsInCall: React.Dispatch<React.SetStateAction<moment.Duration>>;
}

export default function CallArea({
  name,
  totalSecondsInCall,
  setTotalSecondsInCall,
  callAccepted,
}: CallAreaProps) {
  return (
    <div className="absolute top-12 z-40 w-full p-1">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-y-1">
          <h1 className="text-white text-lg">
            <b>{name && _.capitalize(name)}</b>
          </h1>
          {totalSecondsInCall.asMilliseconds() === 0 && (
            <span className="text-dark_text_1">Ringing...</span>
          )}
          <CallTimes
            totalSecondsInCall={totalSecondsInCall}
            setTotalSecondsInCall={setTotalSecondsInCall}
            callAccepted={callAccepted}
          />
        </div>
      </div>
    </div>
  );
}
