import React, { useRef } from 'react';
import { CloseIcon } from '../../../../../../icons';
import { validImageFormats } from '../../../../../../consts/upload_valid_formats';
import { useDispatch } from 'react-redux';
import { getFileType } from '../../../../../../utils/file';
import { addFiles } from '../../../../../../redux/slices/chat.slice';

export default function Add() {
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const filesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let files = Array.from(e.target.files!);

    files.forEach((file) => {
      if (
        !validImageFormats.includes(file.type) ||
        file.size > 1024 * 1024 * 5
      ) {
        files = files.filter((item) => item.name !== file.name);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: ProgressEvent<FileReader>) => {
        dispatch(
          addFiles({
            file: file,
            fileData: e.target?.result,
            type: getFileType(file.type),
          }),
        );
      };
    });
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="w-14 h-14 border mt-2 dark:border-white rounded-md flex items-center justify-center cursor-pointer"
    >
      <span className='rotate-45'>
        <CloseIcon className="dark:fill-dark_svg_1" />
      </span>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept={validImageFormats}
        onChange={filesHandler}
      />
    </div>
  );
}
