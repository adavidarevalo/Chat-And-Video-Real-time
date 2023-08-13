import React, { useRef, useState } from 'react';
import EmojiPicker from './emoji_picker';
import Attachments from './attachments';
import Input from './input';
import { SendIcon } from '../../../../icons';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../../../redux/actions/chat.actions';
import { ClipLoader } from 'react-spinners';
import { AppState } from '../../../../redux/store';
import { useSocket } from '../../../../context/socket.context';

export default function ChatActions() {
  const [message, setMessage] = useState('');
  const [showAttachments, setShowAttachments] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [loading, setLoading] = useState(false);
  const { activeConversation, status } = useSelector((state: AppState) => state.chat);
  const { user } = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();
  const socket = useSocket();
  const textRef = useRef<HTMLInputElement>(null);

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const value = {
      message,
      conversation_id: activeConversation?._id,
      token: user?.token || '',
      files: [],
    };
    const newMessage = await dispatch(sendMessage(value) as any);
    socket?.socket.emit('send message', newMessage.payload);
    setMessage('');
    setLoading(false);
    setShowEmoji(false);
  };
  return (
    <form
      onSubmit={handlerSubmit}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
      <div className="w-full flex items-center gap-x-2">
        <ul className="flex gap-x-2">
          <EmojiPicker
            textRef={textRef}
            message={message}
            setMessage={setMessage}
            showEmoji={showEmoji}
            setShowEmoji={setShowEmoji}
            showAttachments={showAttachments}
            setShowAttachments={setShowAttachments}
          />
          <Attachments
            showEmoji={showEmoji}
            setShowEmoji={setShowEmoji}
            showAttachments={showAttachments}
            setShowAttachments={setShowAttachments}
          />
        </ul>
        <Input message={message} setMessage={setMessage} textRef={textRef} />
        <button className="btn" type="submit" disabled={status === 'loading'}>
          {status === 'loading' && loading ? (
            <ClipLoader color="#E9EDEF" size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        </button>
      </div>
    </form>
  );
}
