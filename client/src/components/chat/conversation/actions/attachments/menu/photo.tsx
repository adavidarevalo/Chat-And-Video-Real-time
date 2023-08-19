import React, { useRef } from 'react';
import { PhotoIcon } from '../../../../../../icons';
import { useDispatch } from 'react-redux';
import { addFiles } from '../../../../../../redux/slices/chat.slice';
import { getFileType } from '../../../../../../utils/file';
import { validImageFormats } from '../../../../../../consts/upload_valid_formats';

export default function PhotoAttachment() {
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            fileData:
              getFileType(file.type) === 'IMAGE' ? e.target?.result : '',
            type: getFileType(file.type),
          }),
        );
      };
    });
  };

  return (
    <li>
      <button
        type={'button'}
        className="bg-[#BF59CF] rounded-full"
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        <PhotoIcon />
        <input
          type="file"
          hidden
          multiple
          ref={inputRef}
          accept={validImageFormats}
          onChange={imageHandler}
        />
      </button>
    </li>
  );
}
