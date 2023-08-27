import React, { useState } from 'react';
import Ringing from './ringing';
import Header from './header';
import CallArea from './area';
import CallActions from './actions';
import { ICall } from '../../../../pages/home';

interface CallProps {
  call: ICall;
  setCall: React.Dispatch<React.SetStateAction<ICall>>;
  stream: MediaStream | null;
  callAccepted: boolean;
  myVideo: React.RefObject<HTMLVideoElement>;
  userVideo: React.RefObject<HTMLVideoElement>;
  answerCall: () => void;
  endCall: () => void;
  totalSecondsInCall: moment.Duration;
  setTotalSecondsInCall: React.Dispatch<React.SetStateAction<moment.Duration>>;
  show: boolean;
}

export default function Call({
  call,
  setCall,
  callAccepted,
  myVideo,
  userVideo,
  answerCall,
  stream,
  endCall,
  totalSecondsInCall,
  setTotalSecondsInCall,
  show,
}: CallProps) {
  const { receivingCall, callEnded, name } = call;

  const [showCallActions, setShowCallActions] = useState(false);
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callBg
    ${receivingCall && !callAccepted && 'hidden'}
      `}
        onMouseOver={() => setShowCallActions(true)}
        onMouseOut={() => setShowCallActions(false)}
      >
        <div>
          <div>
            <Header />
            <CallArea
              name={name}
              totalSecondsInCall={totalSecondsInCall}
              setTotalSecondsInCall={setTotalSecondsInCall}
              callAccepted={callAccepted}
            />
            {showCallActions && <CallActions endCall={endCall} />}
          </div>
          <div>
            <div>
              {callAccepted && !callEnded && (
                <video
                  ref={userVideo}
                  playsInline
                  muted
                  autoPlay
                  className={`${!toggle ? 'largeVideoCall' : 'SmallVideoCall'}`}
                  onClick={() => setToggle((prev) => !prev)}
                ></video>
              )}
            </div>
            <div>
              {stream && (
                <video
                  ref={myVideo}
                  playsInline
                  muted
                  autoPlay
                  className={`
                ${toggle ? 'largeVideoCall' : 'SmallVideoCall'}
                 ${showCallActions && 'moveVideoCall'}`}
                  onClick={() => setToggle((prev) => !prev)}
                ></video>
              )}
            </div>
          </div>
        </div>
      </div>
      {receivingCall && !callAccepted && (
        <Ringing
          call={call}
          setCall={setCall}
          answerCall={answerCall}
          endCall={endCall}
        />
      )}
      {!callAccepted && show ? (
        <audio src="/audio/ringing.mp3" autoPlay loop></audio>
      ) : null}
    </>
  );
}
