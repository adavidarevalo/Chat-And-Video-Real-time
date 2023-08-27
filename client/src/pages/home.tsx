import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../components/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import Peer, { Instance } from 'simple-peer';
import { getConversations } from '../redux/actions/chat.actions';
import { WelcomeWhatsappHome } from './../components/chat/welcome';
import ConversationContainer from '../components/chat/conversation';
import { AppDispatch, AppState } from '../redux/store';
import { useSocket } from '../context/socket.context';
import Call from '../components/chat/conversation/call/index';
import {
  removeConversationTyping,
  addConversationTyping,
  setOnlineUsers,
  updateMessages,
} from '../redux/slices/chat.slice';
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from '../utils/get_conversation';
import { User } from '../types/user.type';
import _ from 'lodash';
import moment from 'moment';

const callData = {
  socketId: '',
  receivingCall: false,
  callEnded: false,
  name: '',
  picture: '',
  signal: '',
};

export interface ICall {
  socketId: string;
  receivingCall: boolean;
  callEnded: boolean;
  name: string;
  picture: string;
  signal: string;
}

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();

  const socket = useSocket();
  const [call, setCall] = useState<ICall>(callData);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
const connectionRef = useRef<Instance | null>(null);
  const { user } = useSelector((state: AppState) => state.user);
  const [show, setShow] = useState(false);
  const [totalSecondsInCall, setTotalSecondsInCall] = useState(
    moment.duration(0),
  );
  const { activeConversation } = useSelector(
    (state: AppState) => state.chat,
  );


  useEffect(() => {
    setupMedia();
    socket?.socket.on('setup socket', (socketId: string) => {
      setCall((prev) => ({
        ...prev,
        socketId,
      }));
    });
    socket?.socket.on('call user', (data) => {
      setCall((prev) => ({
        ...prev,
        socketId: data.from,
        name: data.name,
        picture: data.picture,
        signal: data.signal,
        receivingCall: true
      }));
    });
    socket?.socket.on('end call', () => {
      setShow(false);
      setCall((prev) => ({ ...prev, callEnded: true, receivingCall: false }));
      myVideo.current!.srcObject = null;
      if (callAccepted && !call.callEnded) {
        connectionRef?.current?.destroy();
      }
    });
  }, []);

  const setupMedia = () => {
    navigator?.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
      });
  };

  const callUser = () => {
    enableMedia();

    setCall((prev) => ({
      ...prev,
      name: getConversationName(
        user as User,
        activeConversation?.users as User[],
      ),
      picture: getConversationPicture(
        user as User,
        activeConversation?.users as User[],
      ),
    }));

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream as MediaStream,
    });

    peer.on('signal', (data) => {
      socket?.socket.emit('call user', {
        userToCall: getConversationId(
          user as User,
          activeConversation?.users as User[],
        ),
        signal: data,
        from: call.socketId,
        name: user?.name,
        picture: user?.picture,
      });
    });
    peer.on('stream', (stream) => {
      _.set(userVideo, 'current.srcObject', stream);
    });
    socket?.socket.on('call accepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const answerCall = () => {
    enableMedia();
    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream as MediaStream,
    });

    peer.on('signal', (data) => {
      socket?.socket.emit('answer call', {
        signal: data,
        to: call.socketId,
      });
    });
    peer.on('stream', (stream) => {
      _.set(userVideo, 'current.srcObject', stream);
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const enableMedia = () => {
    myVideo.current!.srcObject = stream;
    setShow(true);
  };

  useEffect(() => {
    socket?.socket.emit('join', user?._id);
    socket?.socket.on('get online users', (users) => {
      dispatch(setOnlineUsers(users));
    });
  }, []);

  useEffect(() => {
    socket?.socket.on('receive message', (message) => {
      dispatch(updateMessages(message));
    });
    socket?.socket.on('typing', (conversationId) => {
      dispatch(addConversationTyping(conversationId));
    });
    socket?.socket.on('stop typing', (conversationId) => {
      dispatch(removeConversationTyping(conversationId));
    });
  }, []);

  const endCall = () => {
    setShow(false);

    if (myVideo.current) myVideo.current.srcObject = null;

    setCall((prev) => ({ ...prev, callEnded: true, receivingCall: false }));

    socket?.socket.emit('end call', call.socketId);

    connectionRef?.current?.destroy();
  };

  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user?.token));
    }
  }, []);

  return (
    <>
      <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
        <div className="container h-screen flex">
          <Sidebar />
          {activeConversation?._id ? (
            <ConversationContainer callUser={callUser} />
          ) : (
            <WelcomeWhatsappHome />
          )}
        </div>
      </div>
      <div className={(show || call.signal) && !call.callEnded ? '' : 'hidden'}>
        <Call
          call={call}
          setCall={setCall}
          stream={stream}
          callAccepted={callAccepted}
          userVideo={userVideo}
          myVideo={myVideo}
          answerCall={answerCall}
          endCall={endCall}
          totalSecondsInCall={totalSecondsInCall}
          setTotalSecondsInCall={setTotalSecondsInCall}
          show={show}
        />
      </div>
    </>
  );
}
