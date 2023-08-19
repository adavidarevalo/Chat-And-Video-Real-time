import React from 'react';
import { CloseIcon } from '../../../../../icons';
import { useSelector } from 'react-redux';
import { clearFiles as clearFilesFn } from './../../../../../redux/slices/chat.slice';
import { AppState } from '../../../../../redux/store';
import useAppDispatch from '../../../../../hooks/use_redux';

interface HeaderFilesPreviewProps {
  activeIndex: number;
}

export default function HeaderFilesPreview({
  activeIndex,
}: HeaderFilesPreviewProps) {
  const dispatch = useAppDispatch();

  const { files } = useSelector((state: AppState) => state.chat);

  const clearFiles = () => {
    dispatch(clearFilesFn());
  };
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <div className="translate-x-4 ml-4 cursor-pointer" onClick={clearFiles}>
          <CloseIcon className="dark:fill-dark_svg_1" />
        </div>
        <h1 className="dark:text-dark_text_1 text-[15px]">
          {files[activeIndex]?.files?.name}
        </h1>
        <div></div>
      </div>
    </div>
  );
}
