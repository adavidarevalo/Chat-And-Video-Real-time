/** @format */

import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Message from './message';
import { AppState } from '../../../redux/store';

export default function ChatMessages() {
  const { messages } = useSelector((state: AppState) => state.chat);
  const { user } = useSelector((state: AppState) => state.user);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`mb-[60px] bg-[url("https://cdn.wallpapersafari.com/54/0/HluF7g.jpg")] h-[86vh]`}>
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%] h-full">
        {messages &&
          messages.map((message: any) => (
            <Message key={message._id} message={message} isMe={user?._id === message.sender._id} />
          ))}
        <div className={'mt-2'} ref={endRef}></div>
      </div>
    </div>
  );
}
