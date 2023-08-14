import React, { useState } from 'react';
import Ringing from './ringing';
import Header from './header';
import CallArea from './area';
import CallActions from './actions';

export default function Call({ call, setCall, callAccepted, myVideo, userVideo, stream }: any) {
  const { receivingCall, callEnded } = call;

  const [showCallActions, setShowCallActions] = useState(false);

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[55px] z-10 rounded-2xl overflow-hidden callBg`}
      onMouseOver={() => setShowCallActions(true)}
      onMouseOut={() => setShowCallActions(false)}
    >
      <div>
        <div>
          <Header />
          <CallArea name="" />
          {showCallActions && <CallActions />}
        </div>
        <div>
          <div>
            <video ref={userVideo} playsInline muted autoPlay className={`largeVideoCall`}></video>
          </div>
          <div>
            <video
              ref={myVideo}
              playsInline
              muted
              autoPlay
              className={`SmallVideoCall ${showCallActions && 'moveVideoCall'}`}
            ></video>
          </div>
        </div>
      </div>
      {receivingCall && !callAccepted && <Ringing call={call} setCall={setCall} />}
    </div>
  );
}
