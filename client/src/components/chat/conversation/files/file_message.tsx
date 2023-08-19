import React from 'react';
import moment from 'moment';
import { TriangleIcon } from '../../../../icons';
import FileImageVideo from './file_image_video';
import Message, { File } from '../../../../types/message.type';
import FileOthers from './file_others';

interface FileMessageProps {
  isMe: boolean;
  message: Message;
  fileMessage: File;
}

const FileMessage: React.FC<FileMessageProps> = ({
  isMe,
  message,
  fileMessage,
}) => {
  const { file, type } = fileMessage;
  const isImageOrVideo = ['IMAGE', 'VIDEO'].includes(type);
  const fileContainerStyle = isMe
    ? 'border-[3px] border-green_3'
    : 'dark:bg-dark_bg_2 bg-green_3 p-1';
  const imageVideoBgStyle =
    isMe && file.public_id.split('.')[1] === 'png' ? 'bg-white' : '';

  return (
    <div
      className={`w-full flex mt-2 space-x-3 max-w-xs ${
        isMe && 'ml-auto justify-end'
      }`}
      data-testid="file-message-component"
    >
      <div>
        <div
          className={`bg-green_4 relative h-full dark:text-dark_text_1 rounded-lg min-w-[54px] ${fileContainerStyle} ${imageVideoBgStyle}`}
        >
          <div className={`h-full text-sm ${!isImageOrVideo && 'pb-5'}`}>
            <div className={`${isMe ? 'bg-green_4' : 'fill-dark_bg_2'}`}>
              <p>{message.message}</p>
              {isImageOrVideo ? (
                <FileImageVideo url={file.secure_url} type={type} />
              ) : (
                <FileOthers file={file} type={type} />
              )}
            </div>
          </div>
          <span className="absolute right-1.5 text-xs pt-6 bottom-1 text-dark_text_5">
            {moment(message.createdAt).format('HH:mm')}
          </span>
          {!isMe && (
            <TriangleIcon className="dark:fill-dark_bg_2 rotate-[32deg] absolute top-[0px] left-[-13px]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default FileMessage;
