import React, { useState } from 'react';
import HeaderFilesPreview from './header';
import FileViewer from './viewer';
import InputFilePreview from './input';
import HandleAndSend from './handle_and_send';
import { uploadFiles } from '../../../../../utils/upload_files';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../../../redux/store';
import { useSocket } from '../../../../../context/socket.context';
import { sendMessage } from '../../../../../redux/actions/chat.actions';
import { clearFiles } from '../../../../../redux/slices/chat.slice';

export default function FilesPreview() {
  const [message, setMessage] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const { files, activeConversation } = useSelector(
    (state: AppState) => state.chat,
  );
  const { user } = useSelector((state: AppState) => state.user);

  const dispatch = useDispatch<AppDispatch>();
  const socket = useSocket();

  const sendMessageHandler = async () => {
    setLoading(true);
    const uploaded_files = await uploadFiles(files);
    const value = {
      message,
      conversation_id: activeConversation?._id,
      token: user?.token || '',
      files: uploaded_files,
    };

    const newMessage = await dispatch(sendMessage(value));
    socket?.socket.emit('send message', newMessage.payload);

    dispatch(clearFiles());
    setLoading(false);
  };

  return (
    <div className="relative py-2 w-full flex items-center justify-center">
      <div className="w-full flex flex-col items-center">
        <HeaderFilesPreview activeIndex={activeIndex} />
        <FileViewer activeIndex={activeIndex} />
        <form
          className="w-full flex flex-col items-center"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessageHandler();
          }}
        >
          <InputFilePreview message={message} setMessage={setMessage} />
          <HandleAndSend
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            loading={loading}
          />
        </form>
      </div>
    </div>
  );
}
