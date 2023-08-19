import React, { useEffect, useRef, useState } from 'react';
import CloseIcon from '../../../../icons/Close';
import { ValidIcon } from '../../../../icons';
import { ICall } from '../../../../pages/home';

interface RingingProps {
  call: ICall;
  setCall: React.Dispatch<React.SetStateAction<ICall>>;
  answerCall: () => void;
  endCall: () => void;
}

export default function Ringing({ call, setCall, answerCall, endCall }: RingingProps) {
  const { receivingCall, callEnded } = call;

  const [timer, setTimer] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handlerTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev++);
    }, 1000);
  };

  useEffect(() => {
    if (timer <= 5) {
      handlerTimer();
    } else {
      setCall({ ...call, receivingCall: false });
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer]);

  return (
    <div className="dark:bg-dark_bg_1 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg z-30">
      <div className="p-4 flex items-center justify-between gap-x-8">
        <div className="flex items-center gap-x-2">
          <img src={call.picture} alt="" className="w-28 h-28 rounded-full" />
          <div>
            <h1 className="dark:text-white">
              <b>{call.name}</b>
            </h1>
            <span className="dark:text-dark_text_2">Whatsapp video...</span>
          </div>
        </div>
        <ul className="flex items-center gap-x-2">
          <li onClick={endCall}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500">
              <CloseIcon className="dark:fill-white w-5" />
            </button>
          </li>
          <li onClick={answerCall}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500">
              <ValidIcon className="dark:fill-white w-6 mt-2" />
            </button>
          </li>
        </ul>
      </div>
      <audio src="/audio/ringtone.mp3" autoPlay loop />
    </div>
  );
}
