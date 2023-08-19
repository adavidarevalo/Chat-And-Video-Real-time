import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../redux/store';

interface FileViewerProps {
  activeIndex: number;
}

const FileViewer: React.FC<FileViewerProps> = ({ activeIndex }) => {
  const { files } = useSelector((state: AppState) => state.chat);
  const file = files[activeIndex] || files[0];

  return (
    <div className="w-full max-w-[60%]">
      <div className="flex justify-center items-center">
        {file.type === 'IMAGE' && (
          <img
            src={file.fileData}
            alt={file?.files?.name}
            className="max-w-[80%] object-contain hview"
          />
        )}
        {file.type === 'VIDEO' && (
          <video
            src={file.fileData}
            controls
            className="max-w-[80%] object-contain hview"
          />
        )}
        {!['IMAGE', 'VIDEO'].includes(file.type) && (
          <div className="min-w-full hview flex flex-col items-center justify-center">
            <img src={`/images/file/${file.type}.png`} alt="Format document" />
            <h1 className="dark:text-dark_text_2 text-2xl">
              No preview available
            </h1>
            <span className="dark:text-dark_text_2">
              {file?.file?.size} KB - {file?.type}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileViewer;
