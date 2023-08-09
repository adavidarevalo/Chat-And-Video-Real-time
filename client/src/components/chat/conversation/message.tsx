import moment from 'moment';
import React from 'react'
import { TriangleIcon } from '../../../icons';
import MessageType from './../../../types/message.type';

interface MessageProps {
  isMe: boolean;
  message: MessageType;
}

export default function Message({ message, isMe }: MessageProps) {
  return (
    <div className={`w-full flex mt-2 space-x-3 max-w-xs ${isMe && 'ml-auto justify-end'}`}>
      <div>
        <div
          className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg min-w-[54px] ${
            isMe ? 'bg-green_3' : 'dark:bg-dark_bg_2'
          }`}>
          <p className="float-left h-full text-sm pb-5">{message.message}</p>
          <span className="absolute right-1.5 text-xs pt-6 bottom-1 text-dark_text_5">
            {moment(message.createdAt).format('HH:mm')}
          </span>
          <span>
            {!isMe && <TriangleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[5px] -left-1.5" />}
          </span>
        </div>
      </div>
    </div>
  );
}
