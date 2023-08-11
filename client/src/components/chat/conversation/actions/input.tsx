import React, { useEffect, useState } from 'react'
import { useSocket } from '../../../../context/socket.context';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';

interface InputProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  textRef: React.RefObject<HTMLInputElement>;
}

export default function Input({ message, setMessage, textRef }: InputProps) {
  const [isTyping, setIsTyping] = useState(false)
  const { activeConversation} = useSelector((state: AppState) => state.chat);

    const socket = useSocket();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
      socket?.socket.emit('typing', activeConversation?._id);
    }

    const lastTypingTime = new Date().getTime()
    const timer = 2000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timer && isTyping) {
        socket?.socket.emit('stop typing', activeConversation?._id);
        setIsTyping(false)
      }
    }, timer);
  };

    useEffect(() => {
      if (textRef.current) {
        textRef.current.focus();
      }
    }, [activeConversation]);


  return (
    <div className="w-full">
      <input
        ref={textRef}
        type="text"
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pl-4"
        placeholder="Type a message"
        value={message}
        onChange={handleChange}
      />
    </div>
  );
}
