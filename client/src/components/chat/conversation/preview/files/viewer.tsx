import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../redux/store';

interface FileViewerProps {
  activeIndex: number;
}

export default function FileViewer({ activeIndex }: FileViewerProps) {
  const { files } = useSelector((state: AppState) => state.chat);

  return (
    <div className="w-full max-w-[60%]">
      <div className="flex justify-center items-center">
        {files[activeIndex].type === 'IMAGE' ? (
          <img
            src={files[activeIndex].fileData}
            alt={files[activeIndex]?.files?.name}
            className="max-w-[80%] object-contain hview"
          />
        ) : files[activeIndex].type === 'VIDEO' ? (
          <video src={files[activeIndex].fileData} controls className="max-w-[80%] object-contain hview" />
        ) : (
          <div className="min-w-full hview flex flex-col items-center justify-center">
            <img src={`/images/file/${files[activeIndex].type}.png`} alt="Format document" />
            <h1 className="dark:text-dark_text_2 text-2xl">No preview available</h1>
            <span className="dark:text-dark_text_2">
              {files[activeIndex]?.file?.size} KB - {files[activeIndex]?.type}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
