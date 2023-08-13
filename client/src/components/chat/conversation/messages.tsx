import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Message from './message';
import { AppState } from '../../../redux/store';
import Typing from './typing';
import FileMessage from './files/file_message';

export default function ChatMessages() {
  const { messages, conversationTyping, activeConversation } = useSelector((state: AppState) => state.chat);
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
    <div className={`mb-[60px] bg-[url("https://cdn.wallpapersafari.com/54/0/HluF7g.jpg")] h-[88vh]`}>
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%] h-full">
        {messages.length > 0 &&
          messages.map((message: any) => (
            <>
              {message.files.length > 0 &&
                message.files.map((file: any) => (
                  <FileMessage
                    fileMessage={file}
                    message={message}
                    key={message._id}
                    isMe={user?._id === message.sender._id}
                  />
                ))}
              {message.files.length === 0 && message.message.length > 0 && (
                <Message key={message._id} message={message} isMe={user?._id === message.sender._id} />
              )}
            </>
          ))}
        {conversationTyping.includes(activeConversation?._id || '') && <Typing />}
        <div className={'mt-2'} ref={endRef}></div>
      </div>
    </div>
  );
}
