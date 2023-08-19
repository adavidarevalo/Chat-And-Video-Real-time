import React from 'react';
import { AppState } from '../../../../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';

import Add from './add';
import { CloseIcon, SendIcon } from '../../../../../../icons';
import { ClipLoader } from 'react-spinners';
import { removeFileByIndex } from '../../../../../../redux/slices/chat.slice';

interface HandleAndSendProps {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}

export default function HandleAndSend({
  loading,
  activeIndex,
  setActiveIndex,
}: HandleAndSendProps) {
  const { files } = useSelector((state: AppState) => state.chat);

  const dispatch = useDispatch();

  const handleRemoveFile = (index: number) => {
    dispatch(removeFileByIndex(index));
  };

  return (
    <div className="w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2">
      <span></span>
      <div className="flex items-center gap-x-2">
        {files.map((file, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`fileThumbnail relative mt-2 w-14 h-14 border dark:border-white rounded-md overflow-hidden cursor-pointer ${
              activeIndex === index && 'border-[3px] !border-green_1'
            }`}
          >
            {file.type === 'IMAGE' ? (
              <img
                src={file.fileData}
                alt={files[0]?.files?.name}
                className="w-full h-full object-cover"
              />
            ) : file.type === 'VIDEO' ? (
              <video src={files[activeIndex].fileData} />
            ) : (
              <img
                src={`/images/file/${files[0].type}.png`}
                alt="Format document"
                className="w-8 h-10 mt-1.5 ml-2.5"
              />
            )}
            <div
              onClick={() => handleRemoveFile(index)}
              className="removeFileIcon hidden"
            >
              <CloseIcon className="dark:fill-white absolute right-0 top-0 w-4 h-4" />
            </div>
          </div>
        ))}
        <Add/>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer"
      >
        {loading ? (
          <ClipLoader color="#E9EDEF" size={25} />
        ) : (
          <SendIcon className="fill-white" />
        )}
      </button>
    </div>
  );
}
