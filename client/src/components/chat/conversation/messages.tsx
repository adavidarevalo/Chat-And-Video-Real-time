import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Message from './message';
import { AppState } from '../../../redux/store';
import Typing from './typing';
import FileMessage from './files/file_message';

export default function ChatMessages() {
  const { messages, conversationTyping, activeConversation } = useSelector(
    (state: AppState) => state.chat,
    );

  const { user } = useSelector((state: AppState) => state.user);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(scrollToBottom, 500)
  }, [messages]);

  const scrollToBottom = () => {
    if (endRef.current?.scrollIntoView) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`mb-[60px] bg-[url("https://cdn.wallpapersafari.com/54/0/HluF7g.jpg")] h-[86.5vh]`}
    >
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%] h-full">
        {messages.length > 0 &&
          messages.map((message) => (
            <div key={message._id}>
              {message.files.length > 0 &&
                message.files.map((file) => (
                  <FileMessage
                    fileMessage={file}
                    message={message}
                    key={message._id}
                    isMe={user?._id === message.sender._id}
                  />
                ))}
              {message.files.length === 0 && message.message.length > 0 && (
                <Message
                  key={message._id}
                  message={message}
                  isMe={user?._id === message.sender._id}
                />
              )}
            </div>
          ))}
        {conversationTyping.includes(activeConversation?._id || '') && (
          <Typing />
        )}
        <div
          className={'mt-2 bg-red-800'}
          ref={endRef}
          data-testid="scroll-element"
        ></div>
      </div>
    </div>
  );
}
